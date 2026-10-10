// Utility functions

const dns = require('dns')

/**
 * Check if a string is a valid IPv4/IPv6 address
 */
function isValidIPAddress(str) {
	// IPv4
	const ipv4 = /^(\d{1,3}\.){3}\d{1,3}$/
	if (ipv4.test(str)) {
		return str.split('.').every((n) => parseInt(n) <= 255)
	}
	// IPv6 (simplified check)
	const ipv6 = /^[\da-fA-F:]+$/
	return ipv6.test(str) && str.includes(':')
}

/**
 * Resolve a hostname to IP address
 */
async function resolveHostname(root, hostname) {
	return new Promise((resolve, reject) => {
		dns.lookup(hostname, (err, address) => {
			if (err) {
				reject(new Error(`DNS lookup failed for ${hostname}: ${err.message}`))
			} else {
				root.log('debug', `Resolved ${hostname} to ${address}`)
				resolve(address)
			}
		})
	})
}

/**
 * Parse a space-delimited OSC arguments string into typed argument objects.
 * Handles integers, floats, booleans, quoted strings, and unquoted strings.
 */
function parseArguments(str) {
	if (!str || str.trim() === '') return { args: [], error: null }

	// Normalize curly quotes to straight quotes
	str = str.replaceAll(/[\u201C\u201D\u201E\u201F]/g, '"')

	const regex = /(-?\d+(?:\.\d+)?)|true|false|"((?:[^"\\]|\\.)+)"|'((?:[^'\\]|\\.)+)'|\S+/g
	const args = []
	let match

	while ((match = regex.exec(str)) !== null) {
		if (match[1] !== undefined) {
			if (match[1].includes('.')) {
				args.push({ type: 'f', value: parseFloat(match[1]) })
			} else {
				args.push({ type: 'i', value: parseInt(match[1]) })
			}
		} else if (match[2] !== undefined) {
			args.push({ type: 's', value: match[2].replace(/\\"/g, '"') })
		} else if (match[3] !== undefined) {
			args.push({ type: 's', value: match[3].replace(/\\'/g, "'") })
		} else if (match[0] === 'true') {
			args.push({ type: 'T' })
		} else if (match[0] === 'false') {
			args.push({ type: 'F' })
		} else {
			args.push({ type: 's', value: match[0] })
		}
	}

	return { args, error: null }
}

/**
 * Evaluate a comparison between two values
 */
function evaluateComparison(actual, expected, comparison) {
	switch (comparison) {
		case 'equal':
			return actual == expected
		case 'notequal':
			return actual != expected
		case 'greaterthan':
			return actual > expected
		case 'lessthan':
			return actual < expected
		case 'greaterthanequal':
			return actual >= expected
		case 'lessthanequal':
			return actual <= expected
		default:
			return false
	}
}

/**
 * Set up OSC client/listener based on config protocol
 */

// Extract the OSC address string from a raw UDP packet buffer.
// OSC addresses start at byte 0 with '/', are ASCII, null-terminated.
function _extractOscAddress(buf) {
	try {
		if (!buf || buf.length < 4 || buf[0] !== 0x2F) return null
		const nullIdx = buf.indexOf(0x00)
		if (nullIdx < 1) return null
		return buf.slice(0, nullIdx).toString('ascii')
	} catch { return null }
}

// Returns true if this OSC address should be blocked from the relay.
// Filtered: clip transport/position (very high frequency — can cause backup jitter)
//           clip select/selected events (causes backup to react to UI focus changes)
function _shouldFilterFromRelay(address) {
	if (!address) return false
	if (address.includes('/transport/position')) return true
	if (address.endsWith('/selected')) return true
	if (address.endsWith('/select')) return true
	return false
}

function setupOSC(root) {
	const osc = require('osc')
	const TcpConnection = require('./tcp-connection')
	const { onDataHandler } = require('./data-handler')

	const config = root.config

	// Close existing client if any
	if (root.client && root.client.isConnected && root.client.isConnected()) {
		root.client.closeConnection().catch(() => {})
	}

	if (config.protocol === 'udp') {
		// UDP port
		const udpPort = new osc.UDPPort({
			localAddress: '0.0.0.0',
			localPort: config.listen ? parseInt(config.feedbackPort) : 0,
			remoteAddress: root.targetHost,
			remotePort: parseInt(config.targetPort),
		})

		udpPort.on('error', (err) => {
			root.log('error', `UDP error: ${err.message}`)
			root.updateStatus('connection_failure')
		})

		udpPort.on('ready', () => {
			root.log('info', `UDP OSC port ready`)
			root.updateStatus('ok')
		})

		if (config.listen) {
			udpPort.on('message', (oscMsg, timeTag, info) => {
				const address = oscMsg.address
				const args = (oscMsg.args || []).map((v) =>
					typeof v === 'object' && v !== null && 'type' in v ? v : { type: 's', value: v }
				)

				root.log('debug', `UDP OSC: ${address} ${args.map((a) => a.value).join(' ')}`)

				// Let the instance handle Arena-specific paths and generic storage
				let arenaHandled = false
				if (typeof root.handleArenaIncoming === 'function') {
					arenaHandled = root.handleArenaIncoming(address, args)
				} else {
					root.onDataReceived[address] = args
				}

				// Skip broad checkFeedbacks and latest_received_* for Arena-handled paths:
				// • handleArenaIncoming already calls targeted checkFeedbacks internally
				// • Arena pushes /transport/position at 5fps per layer — updating generic
				//   variables for every position tick wastes CPU and floods variable history
				if (!arenaHandled) {
					root.checkAllFeedbacks()
					const vals = args.map((a) => a.value)
					root.setVariableValues({
						latest_received_raw: `${address} ${vals.join(' ')}`,
						latest_received_path: address,
						latest_received_args: vals.length ? vals : undefined,
						latest_received_timestamp: Date.now(),
						latest_received_client: info ? info.address : undefined,
						latest_received_port: info ? info.port : undefined,
					})
				}
			})
		}

		// OSC Relay: attach raw socket listener AFTER udpPort.open()
		// We hook into the underlying dgram socket to forward bytes verbatim,
		// so secondary PCs receive exact copies of every incoming UDP packet.
		// Supports up to 5 relays; disabled ones don't create sockets at all.
		udpPort.on('ready', () => {
			const relayDefs = [
				{ enabled: 'relay_enabled',  host: 'relay_host',  port: 'relay_port',  filter: 'relay_filter_transport',  idx: 0 },
				{ enabled: 'relay2_enabled', host: 'relay2_host', port: 'relay2_port', filter: 'relay2_filter_transport', idx: 1 },
				{ enabled: 'relay3_enabled', host: 'relay3_host', port: 'relay3_port', filter: 'relay3_filter_transport', idx: 2 },
				{ enabled: 'relay4_enabled', host: 'relay4_host', port: 'relay4_port', filter: 'relay4_filter_transport', idx: 3 },
				{ enabled: 'relay5_enabled', host: 'relay5_host', port: 'relay5_port', filter: 'relay5_filter_transport', idx: 4 },
			]
			const dgram = require('dgram')
			const activeSockets = []
			for (const rd of relayDefs) {
				const enabled = !!config[rd.enabled]
				const host = (config[rd.host] || '').trim()
				const port = parseInt(config[rd.port]) || 0
				if (!enabled || !host || !port) continue
				const sock = dgram.createSocket('udp4')
				const filterIdx = rd.filter
				sock.bind(0, () => {
					root.log('info', `OSC Relay ${rd.idx + 1} active → ${host}:${port}`)
				})
				sock.on('error', (err) => {
					root.log('warn', `Relay ${rd.idx + 1} socket error: ${err.message}`)
				})
				root._relaySockets[rd.idx] = sock
				activeSockets.push({ sock, host, port, filterEnabled: config[filterIdx] !== false })
			}

			// Hook raw dgram socket once; fan-out to all active relay sockets
			if (activeSockets.length > 0 && udpPort.socket) {
				udpPort.socket.on('message', (rawBuf) => {
					for (const { sock, host, port, filterEnabled } of activeSockets) {
						if (filterEnabled) {
							const addr = _extractOscAddress(rawBuf)
							if (_shouldFilterFromRelay(addr)) continue
						}
						sock.send(rawBuf, 0, rawBuf.length, port, host,
							(err) => { if (err) root.log('debug', `Relay fwd error: ${err.message}`) })
					}
				})
			}
		})

		udpPort.open()
		root.oscSend = (host, port, path, args) => {
			udpPort.send({ address: path, args }, host, port)
		}
		root.udpPort = udpPort

		// Optional second Arena. It has its own receive socket and destination,
		// while the original transport remains untouched for backward compatibility.
		if (config.machine2_enabled && root.targetHost2) {
			const udpPort2 = new osc.UDPPort({
				localAddress: '0.0.0.0',
				localPort: config.listen ? parseInt(config.feedbackPort2) : 0,
				remoteAddress: root.targetHost2,
				remotePort: parseInt(config.targetPort2),
			})
			udpPort2.on('error', (err) => root.log('error', `Arena 2 UDP error: ${err.message}`))
			udpPort2.on('ready', () => root.log('info', 'Arena 2 UDP OSC port ready'))
			if (config.listen) {
				udpPort2.on('message', (oscMsg, timeTag, info) => {
					const args = (oscMsg.args || []).map((v) => typeof v === 'object' && v !== null && 'type' in v ? v : { type: 's', value: v })
					root.handleArenaIncoming(oscMsg.address, args, 2)
				})
			}
			udpPort2.open()
			root.udpPort2 = udpPort2
		}
	} else {
		// TCP or TCP-raw
		root.client = new TcpConnection(root, root.targetHost, parseInt(config.targetPort), config.listen)
		if (config.listen) {
			root.client.openConnection().catch((err) => {
				root.log('error', err.message)
			})
		}
	}
}

module.exports = { isValidIPAddress, resolveHostname, parseArguments, evaluateComparison, setupOSC }

// Incoming OSC data handler
const osc = require('osc')

function calcPacketLength(buffer) {
	try {
		const packet = osc.readPacket(buffer, {})
		return osc.writePacket(packet).length
	} catch {
		return buffer.length + 1
	}
}

async function parsePackets(root, buffer) {
	const packets = []
	while (buffer.length > 0) {
		const len = calcPacketLength(buffer)
		if (len > buffer.length) break
		const chunk = buffer.slice(0, len)
		buffer = buffer.slice(len)
		try {
			const packet = osc.readPacket(chunk, { metadata: true })
			packets.push(packet)
		} catch (err) {
			root.log('error', `Error parsing OSC message: ${err.message}. Data: ${chunk}`)
		}
	}
	return { remainingBuffer: buffer, packets }
}

async function onDataHandler(root, data) {
	try {
		let buffer = Buffer.alloc(0)
		buffer = Buffer.concat([buffer, data])
		root.log('trace', `Buffer length: ${buffer.length}`)

		const { remainingBuffer, packets } = await parsePackets(root, buffer)
		buffer = remainingBuffer

		root.log('debug', `Raw: ${JSON.stringify(data)}`)

		for (const packet of packets) {
			if (packet.address) {
				if (!packet.args || packet.args.length === 0) {
					root.onDataReceived[packet.address] = [{ type: 'i', value: null }]
					root.log('debug', `OSC message: ${packet.address}, args: Null`)
					await root.checkAllFeedbacks()
					root.setVariableValues({
						latest_received_raw: `${packet.address}`,
						latest_received_path: packet.address,
						latest_received_args: undefined,
						latest_received_timestamp: Date.now(),
					})
					continue
				}

				const argsStr = packet.args.map((a) => a.value).join(' ')
				root.log('debug', `OSC message: ${packet.address}, args: ${JSON.stringify(packet.args)}`)
				let arenaHandled = false
				if (typeof root.handleArenaIncoming === 'function') {
					arenaHandled = root.handleArenaIncoming(packet.address, packet.args)
				} else {
					root.onDataReceived[packet.address] = packet.args
				}
				if (!arenaHandled) await root.checkAllFeedbacks()
				root.setVariableValues({
					latest_received_raw: `${packet.address} ${argsStr}`,
					latest_received_path: packet.address,
					latest_received_args: packet.args.length ? packet.args.map((a) => a.value) : undefined,
					latest_received_timestamp: Date.now(),
				})
			} else if (packet.packets) {
				for (const bundlePacket of packet.packets) {
					if (bundlePacket.address) {
						root.log('debug', `Bundle element message: ${bundlePacket.address}, args: ${JSON.stringify(bundlePacket.args)}`)
						let bundleArenaHandled = false
						if (typeof root.handleArenaIncoming === 'function') {
							bundleArenaHandled = root.handleArenaIncoming(bundlePacket.address, bundlePacket.args)
						} else {
							root.onDataReceived[bundlePacket.address] = bundlePacket.args
						}
						if (!bundleArenaHandled) await root.checkAllFeedbacks()
						root.setVariableValues({
							latest_received_raw: `${bundlePacket.address} ${bundlePacket.args}`,
							latest_received_path: bundlePacket.address,
							latest_received_args: bundlePacket.args.length ? bundlePacket.args.map((a) => a.value) : undefined,
							latest_received_timestamp: Date.now(),
						})
					}
				}
			}
		}

		root.log('trace', `Remaining buffer length: ${buffer.length}`)
	} catch (err) {
		root.log('error', `Error handling incoming data: ${err.message}`)
	}
}

module.exports = { onDataHandler }

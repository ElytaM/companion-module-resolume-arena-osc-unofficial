// TCP connection handler for OSC
const osc = require('osc')
const { onDataHandler } = require('./data-handler')

class TcpConnection {
	constructor(root, host, port, listen) {
		this.root = root
		this.host = host
		this.port = port
		this.listen = listen
		this.tcpPort = null
		this.connected = false
	}

	openConnection() {
		if (!this.connected) {
			return new Promise((resolve, reject) => {
				this.root.updateStatus('connecting')
				this.tcpPort = new osc.TCPSocketPort({
					address: this.host,
					port: this.port,
				})

				this.tcpPort.on('error', (err) => {
					const msg = `Error with TCP port: ${err.message}`
					this.tcpPort.close()
					this.connected = false
					this.root.updateStatus('connection_failure')
					reject(new Error(msg))
				})

				this.tcpPort.on('ready', () => {
					this.root.log('info', `Connected to OSC Server ${this.host}:${this.port}`)
					this.connected = true
					this.root.updateStatus('ok')
					resolve()
				})

				this.tcpPort.on('data', async (data) => {
					if (this.listen) {
						onDataHandler(this.root, data)
					}
				})

				this.tcpPort.on('close', () => {
					this.root.log('info', 'Disconnected from OSC server')
					this.connected = false
				})

				this.tcpPort.open()
			})
		}
		this.root.log('info', 'TCP connection is already open')
	}

	closeConnection() {
		if (this.tcpPort && this.connected) {
			return new Promise((resolve, reject) => {
				this.tcpPort.close()
				this.connected = false
				if (this.listen) this.root.updateStatus('disconnected')
				this.root.log('info', 'TCP connection closed manually')
				resolve()
			})
		}
		this.root.log('debug', 'No TCP connection to close')
	}

	async sendCommand(path, args) {
		if (!this.connected) {
			this.root.log('info', 'No open TCP connection. Opening connection now...')
			await this.openConnection()
		}

		return new Promise((resolve, reject) => {
			try {
				this.tcpPort.send({ address: path, args }, this.host, this.port)
				const argsStr = args.map((a) => a.value).join(' ')
				this.root.setVariableValues({
					latest_sent_raw: `${path} ${argsStr}`,
					latest_sent_path: path,
					latest_sent_args: args.length ? args.map((a) => a.value) : undefined,
					latest_sent_timestamp: Date.now(),
				})
				this.root.log('debug', `Sent command: ${path} with args: ${JSON.stringify(args)}`)
				resolve()
			} catch (err) {
				this.root.log('warn', `Error sending OSC message: ${err.message}`)
				reject(new Error(err.message))
			}
		})
	}

	isConnected() {
		return this.connected
	}
}

module.exports = TcpConnection

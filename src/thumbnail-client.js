'use strict'

const http = require('http')

const MAX_THUMBNAIL_BYTES = 5 * 1024 * 1024

/** Read-only Resolume REST client. Deliberately exposes no generic request API. */
function fetchClipThumbnail(host, port, layer, clip, timeoutMs = 2500) {
	return new Promise((resolve, reject) => {
		const req = http.get({
			host,
			port: Number(port) || 8080,
			path: `/api/v1/composition/layers/${Number(layer)}/clips/${Number(clip)}/thumbnail`,
			headers: { Accept: 'image/png' },
			timeout: timeoutMs,
			agent: false,
		}, (res) => {
			if (res.statusCode < 200 || res.statusCode >= 300) {
				res.resume()
				reject(new Error(`REST thumbnail returned HTTP ${res.statusCode}`))
				return
			}
			const chunks = []
			let size = 0
			res.on('data', (chunk) => {
				size += chunk.length
				if (size > MAX_THUMBNAIL_BYTES) {
					req.destroy(new Error('REST thumbnail exceeds 5 MB limit'))
					return
				}
				chunks.push(chunk)
			})
			res.on('end', () => resolve(Buffer.concat(chunks).toString('base64')))
		})
		req.on('timeout', () => req.destroy(new Error('REST thumbnail request timed out')))
		req.on('error', reject)
	})
}

module.exports = { fetchClipThumbnail, MAX_THUMBNAIL_BYTES }

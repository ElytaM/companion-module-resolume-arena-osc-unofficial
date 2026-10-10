'use strict'

const test = require('node:test')
const assert = require('node:assert/strict')
const http = require('node:http')
const { fetchClipThumbnail } = require('../src/thumbnail-client')

test('thumbnail client performs only the expected read-only GET', async (t) => {
	let request
	const server = http.createServer((req, res) => {
		request = { method: req.method, url: req.url }
		res.writeHead(200, { 'Content-Type': 'image/png' })
		res.end(Buffer.from([1, 2, 3, 4]))
	})
	await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve))
	t.after(() => server.close())
	const result = await fetchClipThumbnail('127.0.0.1', server.address().port, 3, 7)
	assert.deepEqual(request, { method: 'GET', url: '/api/v1/composition/layers/3/clips/7/thumbnail' })
	assert.equal(result, Buffer.from([1, 2, 3, 4]).toString('base64'))
})

test('thumbnail client rejects non-success responses', async (t) => {
	const server = http.createServer((req, res) => { res.writeHead(404); res.end() })
	await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve))
	t.after(() => server.close())
	await assert.rejects(
		fetchClipThumbnail('127.0.0.1', server.address().port, 1, 1),
		/HTTP 404/,
	)
})

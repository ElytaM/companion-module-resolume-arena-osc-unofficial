'use strict'

const test = require('node:test')
const assert = require('node:assert/strict')
const { OscState } = require('../src/osc-state')

function harness() {
	const sent = []
	const listener = { send(message, host, port) { sent.push({ address: message.address, host, port }) } }
	const instance = {
		getOscListener: () => listener,
		getConfig: () => ({ host: '127.0.0.1', port: 7000 }),
		log: () => {},
	}
	return { state: new OscState(instance), sent }
}

test('column refresh queries only the active column, never every clip', () => {
	const { state, sent } = harness()
	state.activeColumn = 17
	state.queryClipInfoWildcard()
	assert.deepEqual(sent.map((item) => item.address), ['/composition/layers/*/clips/17/connected'])
	assert.equal(sent.some((item) => item.address.includes('/clips/*/')), false)
})

test('initial refresh contains no all-layers/all-clips query', () => {
	const { state, sent } = harness()
	state._queryInitialState()
	assert.equal(sent.some((item) => item.address.includes('/layers/*/clips/*')), false)
	assert.equal(sent.some((item) => item.address.includes('/groups/*/columns/*')), false)
})

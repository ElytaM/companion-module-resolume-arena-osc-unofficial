'use strict'

const test = require('node:test')
const assert = require('node:assert/strict')
const ArenaOscInstance = require('../src/index')
const { PNG } = require('pngjs')

function bareInstance() {
	const instance = Object.create(ArenaOscInstance.prototype)
	instance.presetSlots = {}
	instance._machineSelections = {
		1: { type: null, clip: {}, column: {}, groupColumn: {}, lastColumnSelectTime: 0 },
		2: { type: null, clip: {}, column: {}, groupColumn: {}, lastColumnSelectTime: 0 },
	}
	instance._lastSelectedMachine = 1
	instance.log = () => {}
	instance.config = { machine2_enabled: true }
	instance.oscState = null
	instance.oscState2 = null
	instance._pendingNameQueries = {}
	instance._pendingFloatQueries = {}
	instance.arenaGroups = new Set([2])
	instance.groupConnectedColumns = new Map()
	instance.setVariableValues = () => {}
	instance.checkFeedbacks = () => {}
	instance._remapSlot = null
	instance._verifyMode = false
	instance._verifyScanning = false
	instance._autoVerifyRunning = false
	return instance
}

test('verify menu keeps existing tools in place and adds auto verify as slot four', () => {
	assert.deepEqual(ArenaOscInstance.CONTROL_PAGES[0].map((tool) => tool.id), ['paint', 'action_manager', 'edit_mode', 'delete_mode'])
	assert.deepEqual(ArenaOscInstance.CONTROL_PAGES[1].map((tool) => tool.id), ['master', 'volume', 'speed_ctrl', 'move'])
	assert.deepEqual(ArenaOscInstance.CONTROL_PAGES[2].map((tool) => tool.id), ['ping', 'poll_toggle', 'reconnect', 'mass_delete'])
	assert.deepEqual(ArenaOscInstance.CONTROL_PAGES[3].map((tool) => tool.id), [
		'verify', 'user_var_1', 'user_var_2', 'auto_verify',
	])
	assert.deepEqual(ArenaOscInstance.CONTROL_PAGES[4].map((tool) => tool.id), ['thumb_toggle'])
})

test('column selection is not overwritten by clip events from the same Arena burst', () => {
	const instance = bareInstance()
	instance.handleArenaIncoming('/composition/columns/8/selected', [{ value: 1 }], 1)
	instance.handleArenaIncoming('/composition/layers/2/clips/8/selected', [{ value: 1 }], 1)
	assert.equal(instance._machineSelections[1].type, 'column')
	assert.deepEqual(instance._machineSelections[1].column, { column: 8 })
	assert.equal(instance.arenaLastSelectType, 'column')
})

test('connected column and group column become assignable selections', () => {
	const instance = bareInstance()
	instance.handleArenaIncoming('/composition/columns/5/connected', [{ value: 3 }], 1)
	assert.equal(instance._machineSelections[1].type, 'column')
	assert.deepEqual(instance._machineSelections[1].column, { column: 5 })

	instance.handleArenaIncoming('/composition/groups/2/columns/9/connected', [{ value: 3 }], 1)
	assert.equal(instance._machineSelections[1].type, 'group_column')
	assert.deepEqual(instance._machineSelections[1].groupColumn, { group: 2, column: 9 })
	assert.equal(instance.arenaLastSelectType, 'group_column')

	instance.handleArenaIncoming('/composition/groups/3/columns/4/connected', [{ value: 3 }], 2)
	assert.equal(instance._machineSelections[2].type, 'group_column')
	assert.deepEqual(instance._machineSelections[2].groupColumn, { group: 3, column: 4 })
	assert.equal(instance._lastSelectedMachine, 2)
})

test('slot trigger routes primary and extra actions to their stored machines', async () => {
	const instance = bareInstance()
	instance.presetSlots[4] = {
		type: 'clip', layer: 2, clip: 5, name: 'Main', machine: 2,
		extraActions: [{ address: '/composition/columns/3/connect', args: [{ type: 'i', value: 1 }], machine: 1 }],
	}
	const sent = []
	instance._sendOSC = async (address, args, machine) => sent.push({ address, machine })
	await instance._triggerSlot(4)
	assert.deepEqual(sent, [
		{ address: '/composition/layers/2/clips/5/connect', machine: 2 },
		{ address: '/composition/columns/3/connect', machine: 1 },
	])
})

test('Action Manager captures the machine that produced the selection', () => {
	const instance = bareInstance()
	instance._lastSelectedMachine = 2
	instance._machineSelections[2] = { type: 'column', clip: {}, column: { column: 8 }, groupColumn: {} }
	assert.deepEqual(instance._captureCurrentSelectionAsAction(), {
		address: '/composition/columns/8/connect',
		args: [{ type: 'i', value: 1 }],
		label: 'Col8',
		machine: 2,
	})
})

test('thumbnail renderer returns an exact ARGB buffer for the button size', async () => {
	const instance = bareInstance()
	const png = new PNG({ width: 2, height: 1 })
	png.data.set([255, 0, 0, 255, 0, 0, 255, 128])
	const encoded = PNG.sync.write(png).toString('base64')
	const rendered = Buffer.from(await instance._thumbnailForButton(encoded, 4, 4), 'base64')
	assert.equal(rendered.length, 4 * Math.round(4 * 9 / 16) * 4)
	assert.equal(rendered[0], 255) // alpha first: ARGB
})

test('thumbnail cache key follows clip identity instead of slot number', () => {
	const instance = bareInstance()
	assert.equal(instance._thumbnailKey({ type: 'clip', layer: 3, clip: 4, machine: 2 }), '2:3:4')
	assert.equal(instance._thumbnailKey({ type: 'column', column: 4, machine: 2 }), null)
})

test('cached thumbnail is reused without another REST request', async () => {
	const instance = bareInstance()
	instance._thumbnailBuffers = new Map([['1:3:4', 'cached']])
	instance._thumbnailLoads = new Map()
	instance.presetSlots[2] = { type: 'clip', layer: 3, clip: 4, machine: 1, thumbnailHidden: true }
	instance._savePresetSlots = () => {}
	assert.equal(await instance._loadSlotThumbnail(2), true)
	assert.equal(instance.presetSlots[2].thumbnailHidden, undefined)
})

test('forced thumbnail refresh replaces a cached image at the same clip position', async () => {
	const instance = bareInstance()
	instance._thumbnailBuffers = new Map([['1:3:4', 'old-image']])
	instance._thumbnailRenderCache = new Map([['1:3:4:72x72', 'old-render']])
	instance._thumbnailLoads = new Map()
	instance.targetHost = '127.0.0.1'
	instance.config.restPort = '8080'
	instance.presetSlots[2] = { type: 'clip', layer: 3, clip: 4, machine: 1 }
	let requests = 0
	instance._fetchClipThumbnail = async () => { requests++; return 'new-image' }
	assert.equal(await instance._loadSlotThumbnail(2, null, true, true), true)
	assert.equal(requests, 1)
	assert.equal(instance._thumbnailBuffers.get('1:3:4'), 'new-image')
	assert.equal(instance._thumbnailRenderCache.size, 0)
})

test('fresh clip-name lookup bypasses stale active-clip cache', async () => {
	const instance = bareInstance()
	instance.oscState = { getActiveClip: () => ({ activeClip: 4, name: 'Old name' }) }
	instance._queryName = async () => 'New name'
	assert.equal(await instance._getClipName(2, 4, 1, false), 'Old name')
	assert.equal(await instance._getClipName(2, 4, 1, true), 'New name')
})

test('all simple presets default to no Companion decoration', () => {
	const instance = bareInstance()
	const presets = {
		a: { type: 'simple', style: { text: 'A' } },
		b: { type: 'layered', canvas: {} },
	}
	instance._applyPresetDefaults(presets)
	assert.equal(presets.a.style.show_topbar, false)
	assert.equal(presets.b.canvas.decoration, undefined)
})

test('column verification rebuilds the automatic label with the longest clip logic', async () => {
	const instance = bareInstance()
	instance._getColumnName = async () => 'Column 8'
	instance._getLongestClipNameInColumn = async () => 'Star Sky'
	assert.equal(await instance._slotNameAtStoredPosition({ type: 'column', column: 8, machine: 2 }), 'C8\n(Star Sky)')
})

test('automatic verify checks clip slots only and respects machine routing', async () => {
	const instance = bareInstance()
	instance.presetSlots = {
		1: { type: 'clip', layer: 2, clip: 3, name: 'Expected', machine: 2 },
		2: { type: 'column', column: 3, name: 'Column', machine: 1 },
	}
	const calls = []
	instance._getClipName = async (layer, clip, machine) => { calls.push({ layer, clip, machine }); return 'Expected' }
	instance._startVerifyBlink = () => {}
	await instance._runAutoVerify()
	assert.deepEqual(calls, [{ layer: 2, clip: 3, machine: 2 }])
	assert.equal(instance._verifyMode, false)
})

test('machine badge is rendered into the top-right ARGB pixels', () => {
	const instance = bareInstance()
	const width = 24, height = 24
	const badge = Buffer.from(instance._machineBadge(null, width, height, 2), 'base64')
	assert.equal(badge.length, width * height * 4)
	let opaquePixels = 0
	for (let y = 0; y < 12; y++) for (let x = 12; x < width; x++) {
		if (badge[(y * width + x) * 4] > 0) opaquePixels++
	}
	assert.ok(opaquePixels > 0)
})

test('thumbnail buffer contains only the positioned 16:9 frame', async () => {
	const instance = bareInstance()
	const png = new PNG({ width: 16, height: 9 })
	for (let i = 0; i < png.data.length; i += 4) png.data.set([255, 0, 0, 255], i)
	const encoded = PNG.sync.write(png).toString('base64')
	const rendered = Buffer.from(await instance._thumbnailForButton(encoded, 16, 16), 'base64')
	assert.equal(rendered.length, 16 * 9 * 4)
	assert.deepEqual([...rendered.subarray(0, 4)], [255, 255, 0, 0])
})

test('thumbnail feature defaults on but can be disabled globally', () => {
	const instance = bareInstance()
	assert.equal(instance._thumbnailsEnabled(), true)
	instance.config.thumbnails_enabled = false
	assert.equal(instance._thumbnailsEnabled(), false)
})

test('thumbnail label stays one visible line and is lifted above the button edge', () => {
	const instance = bareInstance()
	assert.equal(instance._thumbnailLabel('Line one\nLine two'), 'Line one Line two')
})

test('thumbnail text uses one centered row or at most two truncated rows', () => {
	const instance = bareInstance()
	assert.equal(instance._thumbnailButtonText({}, 'Short', 72), 'Short')
	assert.equal(instance._positionThumbnailText('Short'), 'Short\n\u2800')
	assert.equal(instance._positionThumbnailText('Two\nrows'), 'Two\nrows')
	const longText = instance._thumbnailButtonText({}, 'A very long clip title that cannot fit below the thumbnail', 72)
	const lines = longText.split('\n')
	assert.equal(lines.length, 2)
	assert.ok(lines[0].length <= 15)
	assert.ok(lines[1].length <= 15)
	assert.ok(lines[1].endsWith('...'))
})

test('thumbnail with an extra action shows one-line name and compact second coordinates', () => {
	const instance = bareInstance()
	const slot = { extraActions: [{ address: '/composition/layers/3/clips/12/connect' }] }
	assert.equal(instance._thumbnailButtonText(slot, 'Primary clip', 72), 'Primary clip\nclip3:12')
	assert.equal(instance._extraActionThumbnailLabel({ address: '/composition/columns/7/connect' }), 'col:7')
})

test('solid black thumbnails are detected without classifying visible images as empty', () => {
	const instance = bareInstance()
	const black = new PNG({ width: 2, height: 2 })
	for (let i = 0; i < black.data.length; i += 4) black.data.set([0, 0, 0, 255], i)
	assert.equal(instance._isBlackThumbnail(PNG.sync.write(black).toString('base64')), true)
	black.data.set([20, 0, 0, 255], 0)
	assert.equal(instance._isBlackThumbnail(PNG.sync.write(black).toString('base64')), false)
})

test('painting a slot hides its thumbnail immediately', () => {
	const instance = bareInstance()
	instance.presetSlots[3] = { type: 'clip', layer: 1, clip: 1, name: 'Clip' }
	instance._paintMode = true
	instance._paintColorIndex = 0
	instance._paintPaletteCache = null
	instance._savePresetSlots = () => {}
	instance._rgb = (r, g, b) => (r << 16) | (g << 8) | b
	// Mirror the paint application invariant without invoking Companion's action wrapper.
	const slot = instance.presetSlots[3]
	const [r, g, b] = instance._paintPalette()[instance._paintColorIndex]
	slot.color = instance._rgb(r, g, b)
	slot.thumbnailHidden = true
	assert.equal(slot.thumbnailHidden, true)
})

test('clear appearance removes custom color and hides thumbnail without deleting action', () => {
	const instance = bareInstance()
	instance.presetSlots[9] = { type: 'clip', layer: 1, clip: 2, name: 'Keep me', color: 123 }
	instance._savePresetSlots = () => {}
	instance.checkFeedbacks = () => {}
	assert.equal(instance._clearSlotAppearance(9), true)
	assert.equal(instance.presetSlots[9].color, undefined)
	assert.equal(instance.presetSlots[9].thumbnailHidden, true)
	assert.equal(instance.presetSlots[9].name, 'Keep me')
})

test('paint clear and thumbnail tools scroll together with colors', () => {
	const instance = bareInstance()
	instance._paintPaletteCache = null
	instance._paintPickerPage = 0
	assert.equal(instance._paintPickerItem(1, 5).type, 'clear')
	assert.equal(instance._paintPickerItem(2, 5).type, 'thumbnail')
	assert.equal(instance._paintPickerItem(3, 5).colorIndex, 0)

	instance._paintPickerPage = 1
	assert.equal(instance._paintPickerItem(1, 5).type, 'color')
	assert.equal(instance._paintPickerItem(1, 5).colorIndex, 2)
	assert.equal(instance._paintPickerItem(2, 5).colorIndex, 3)
})

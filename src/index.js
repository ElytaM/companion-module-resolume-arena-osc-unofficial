// Arena OSC - Bitfocus Companion Module
// Based on generic-osc with Resolume Arena specific functionality

const { InstanceBase, Regex } = require('@companion-module/base')
const { isValidIPAddress, resolveHostname, parseArguments, evaluateComparison, setupOSC } = require('./utils')
const { OscState, OSC_DEFAULT_LAYERS, MAX_RANGE } = require('./osc-state')
const { graphics } = require('companion-module-utils')
const { PNG } = require('pngjs')
const { fetchClipThumbnail } = require('./thumbnail-client')

// How long (ms) to wait for a name response after requesting it
const NAME_QUERY_TIMEOUT = 2000

// Blink interval for edit mode and delete mode (ms)
const BLINK_INTERVAL = 600

// How long quick-assign highlight stays active (ms)
const QUICK_ASSIGN_TTL = 3000

// How long to keep non-tracked OSC paths in memory (ms)
const GENERIC_OSC_CLEANUP_TTL = 5000

/**
 * Truncate a string to fit within maxVisWidth visual units.
 * Accounts for character width: non-ASCII (Cyrillic etc) ≈ 1.2, wide (MW) ≈ 1.3,
 * narrow (il1) ≈ 0.55, default = 1.0.
 * Appends '…' only when the string is actually too wide.
 */
function visWidth(s) {
	let w = 0
	for (const c of s) {
		const code = c.charCodeAt(0)
		w += code > 127 ? 1.2 : 'MWmw@%#'.includes(c) ? 1.3 : "iIlf|j1!;:.,\"'".includes(c) ? 0.55 : 1.0
	}
	return w
}

function truncLabel(s, maxVisWidth) {
	const w = visWidth(s)
	if (w <= maxVisWidth) return s
	// Build truncated version
	let out = '', ow = 0
	for (const c of s) {
		const code = c.charCodeAt(0)
		const cw = code > 127 ? 1.2 : 'MWmw@%#'.includes(c) ? 1.3 : "iIlf|j1!;:.,\"'".includes(c) ? 0.55 : 1.0
		if (ow + cw > maxVisWidth - 1.0) break
		out += c
		ow += cw
	}
	return out + '…'
}

// ---------------------------------------------------------------------------
// Resolume Arena keyboard shortcuts XML template
// Written to disk by the arena_install_resolume_shortcuts action.
// Import in Arena: Preferences → Shortcuts → Load Preset
// ---------------------------------------------------------------------------
const _RESOLUME_SHORTCUTS_XML = `<?xml version="1.0" encoding="utf-8"?>
<OSCShortcutPreset presetId="-469653393" name="ARENA-OSC">
	<versionInfo name="Resolume Arena" majorVersion="7" minorVersion="25" microVersion="4" revision="3572"/>
	<ShortcutManager name="OSCShortcutManagerShortcuts">
		<Shortcut name="Shortcut" uniqueId="1777360183297" paramNodeName="ParamTrigger" behaviour="26" hasCustomOutputPath="0">
			<ShortcutPath name="InputPath" path="/composition/layers/2/clips/6/select" translationType="1" allowedTranslationTypes="11"/>
			<ShortcutPath name="OutputPath" path="/composition/layers/*/clips/*/select" translationType="1" allowedTranslationTypes="11"/>
			<ShortcutPath name="InputSiblingPath" path="/composition/layers/2/clips/6/selected" translationType="1" allowedTranslationTypes="-1"/>
			<ShortcutPath name="OutputSiblingPath" path="/composition/layers/*/clips/*/selected" translationType="1" allowedTranslationTypes="-1"/>
			<RawInputMessage key="432345564227567616" value="0"/>
		</Shortcut>
		<Shortcut name="Shortcut" uniqueId="1777360183861" paramNodeName="RangedParam[bool]" behaviour="26" hasCustomOutputPath="0">
			<ShortcutPath name="InputPath" path="/composition/layers/1/bypassed" translationType="1" allowedTranslationTypes="11"/>
			<ShortcutPath name="OutputPath" path="/composition/layers/*/bypassed" translationType="1" allowedTranslationTypes="11"/>
			<RawInputMessage key="432345564227567616" value="0"/>
		</Shortcut>
		<Shortcut name="Shortcut" uniqueId="1777646791963" paramNodeName="ParamRange" behaviour="26" hasCustomOutputPath="1">
			<ShortcutPath name="InputPath" path="/composition/audio/volume" translationType="1" allowedTranslationTypes="1"/>
			<ShortcutPath name="OutputPath" path="/composition/audio/volume" translationType="1" allowedTranslationTypes="-1"/>
			<Subtarget type="5" optionIndex="-1"/>
			<RawInputMessage key="432345564227567616" value="0"/>
		</Shortcut>
		<Shortcut name="Shortcut" uniqueId="1777360184024" paramNodeName="ParamRange" behaviour="26" hasCustomOutputPath="1">
			<ShortcutPath name="InputPath" path="/composition/speed" translationType="1" allowedTranslationTypes="1"/>
			<ShortcutPath name="OutputPath" path="/composition/speed" translationType="1" allowedTranslationTypes="-1"/>
			<Subtarget type="5" optionIndex="-1"/>
			<RawInputMessage key="432345564227567616" value="0"/>
		</Shortcut>
		<Shortcut name="Shortcut" uniqueId="1777646791956" paramNodeName="ParamTrigger" behaviour="26" hasCustomOutputPath="0">
			<ShortcutPath name="InputPath" path="/composition/groups/1/columns/78/select" translationType="1" allowedTranslationTypes="51"/>
			<ShortcutPath name="OutputPath" path="/composition/groups/*/columns/*/select" translationType="1" allowedTranslationTypes="51"/>
			<ShortcutPath name="InputSiblingPath" path="/composition/groups/1/columns/78/selected" translationType="1" allowedTranslationTypes="-1"/>
			<ShortcutPath name="OutputSiblingPath" path="/composition/groups/*/columns/*/selected" translationType="1" allowedTranslationTypes="-1"/>
			<RawInputMessage key="432345564227567616" value="0"/>
		</Shortcut>
		<Shortcut name="Shortcut" uniqueId="1777360184012" paramNodeName="ParamEvent" behaviour="1050" hasCustomOutputPath="0">
			<ShortcutPath name="InputPath" path="/composition/columns/6/connect" translationType="1" allowedTranslationTypes="35"/>
			<ShortcutPath name="OutputPath" path="/composition/columns/*/connect" translationType="1" allowedTranslationTypes="35"/>
			<ShortcutPath name="InputSiblingPath" path="/composition/columns/6/connected" translationType="1" allowedTranslationTypes="-1"/>
			<ShortcutPath name="OutputSiblingPath" path="/composition/columns/*/connected" translationType="1" allowedTranslationTypes="-1"/>
			<RawInputMessage key="432345564227567616" value="0"/>
		</Shortcut>
		<Shortcut name="Shortcut" uniqueId="1777360184018" paramNodeName="ParamRange" behaviour="26" hasCustomOutputPath="0">
			<ShortcutPath name="InputPath" path="/composition/layers/1/master" translationType="1" allowedTranslationTypes="11"/>
			<ShortcutPath name="OutputPath" path="/composition/layers/*/master" translationType="1" allowedTranslationTypes="11"/>
			<Subtarget type="5" optionIndex="-1"/>
			<RawInputMessage key="432345564227567616" value="0"/>
		</Shortcut>
		<Shortcut name="Shortcut" uniqueId="1777360183924" paramNodeName="ParamRange" behaviour="26" hasCustomOutputPath="1">
			<ShortcutPath name="InputPath" path="/composition/tempocontroller/tempo" translationType="1" allowedTranslationTypes="1"/>
			<ShortcutPath name="OutputPath" path="/composition/tempocontroller/tempo" translationType="1" allowedTranslationTypes="-1"/>
			<Subtarget type="5" optionIndex="-1"/>
			<RawInputMessage key="432345564227567616" value="0"/>
		</Shortcut>
		<Shortcut name="Shortcut" uniqueId="1777360184023" paramNodeName="ParamRange" behaviour="26" hasCustomOutputPath="1">
			<ShortcutPath name="InputPath" path="/composition/master" translationType="1" allowedTranslationTypes="1"/>
			<ShortcutPath name="OutputPath" path="/composition/master" translationType="1" allowedTranslationTypes="-1"/>
			<Subtarget type="5" optionIndex="-1"/>
			<RawInputMessage key="432345564227567616" value="0"/>
		</Shortcut>
		<Shortcut name="Shortcut" uniqueId="1777360183926" paramNodeName="ParamRange" behaviour="26" hasCustomOutputPath="1">
			<ShortcutPath name="InputPath" path="/composition/video/opacity" translationType="1" allowedTranslationTypes="1"/>
			<ShortcutPath name="OutputPath" path="/composition/video/opacity" translationType="1" allowedTranslationTypes="-1"/>
			<Subtarget type="5" optionIndex="-1"/>
			<RawInputMessage key="432345564227567616" value="0"/>
		</Shortcut>
		<Shortcut name="Shortcut" uniqueId="1777360183928" paramNodeName="ParamRange" behaviour="26" hasCustomOutputPath="0">
			<ShortcutPath name="InputPath" path="/composition/layers/4/video/opacity" translationType="1" allowedTranslationTypes="11"/>
			<ShortcutPath name="OutputPath" path="/composition/layers/*/video/opacity" translationType="1" allowedTranslationTypes="11"/>
			<Subtarget type="5" optionIndex="-1"/>
			<RawInputMessage key="432345564227567616" value="0"/>
		</Shortcut>
		<Shortcut name="Shortcut" uniqueId="1777360184016" paramNodeName="ParamEvent" behaviour="1050" hasCustomOutputPath="0">
			<ShortcutPath name="InputPath" path="/composition/layers/1/clips/1/connect" translationType="1" allowedTranslationTypes="11"/>
			<ShortcutPath name="OutputPath" path="/composition/layers/*/clips/*/connect" translationType="1" allowedTranslationTypes="11"/>
			<ShortcutPath name="InputSiblingPath" path="/composition/layers/1/clips/1/connected" translationType="1" allowedTranslationTypes="-1"/>
			<ShortcutPath name="OutputSiblingPath" path="/composition/layers/*/clips/*/connected" translationType="1" allowedTranslationTypes="-1"/>
			<RawInputMessage key="432345564227567616" value="0"/>
		</Shortcut>
		<Shortcut name="Shortcut" uniqueId="1777360183299" paramNodeName="ParamTrigger" behaviour="26" hasCustomOutputPath="0">
			<ShortcutPath name="InputPath" path="/composition/columns/6/select" translationType="1" allowedTranslationTypes="35"/>
			<ShortcutPath name="OutputPath" path="/composition/columns/*/select" translationType="1" allowedTranslationTypes="35"/>
			<ShortcutPath name="InputSiblingPath" path="/composition/columns/6/selected" translationType="1" allowedTranslationTypes="-1"/>
			<ShortcutPath name="OutputSiblingPath" path="/composition/columns/*/selected" translationType="1" allowedTranslationTypes="-1"/>
			<RawInputMessage key="432345564227567616" value="0"/>
		</Shortcut>
	</ShortcutManager>
</OSCShortcutPreset>
`

class ArenaOscInstance extends InstanceBase {
	constructor(internal) {
		super(internal)
		this.config = {}
		this.targetHost = null
		this.client = null
		this.udpPort = null
		this.oscSend = null
		this.targetHost2 = null
		this.udpPort2 = null
		this._machineSelections = {
			1: { type: null, clip: {}, column: {}, groupColumn: {}, lastColumnSelectTime: 0 },
			2: { type: null, clip: {}, column: {}, groupColumn: {}, lastColumnSelectTime: 0 },
		}
		this._lastSelectedMachine = 1
		this._thumbnailMode = false
		this._clearAppearanceMode = false
		this._thumbnailBuffers = new Map()
		this._thumbnailBlack = new Map()
		this._thumbnailRenderCache = new Map()
		this._thumbnailLoads = new Map()
		this.onDataReceived = {}
		this._onDataReceivedSize = 0
		this._cleanupTimers = {}

		// OSC transport state (clip playback tracking per layer)
		this.oscState = null
		this.oscState2 = null
		this._thumbnailWarmTimer = null

		// --- Arena state ---
		this.arenaSelectedClip = { layer: null, clip: null }
		this.arenaSelectedColumn = { column: null }
		this.arenaLastSelectType = null // 'clip' | 'column' | 'group_column' | null

		// --- Preset slots ---
		// Map: slotId (number) -> { type:'clip'|'column', layer?, clip?, column?, name }
		this.presetSlots = {}

		// Edit mode
		this.editMode = false
		this._editBlinkTimer = null
		this._editBlinkState = false

		// Delete mode — red blink, next slot press clears it
		this.deleteMode = false
		this._deleteBlinkTimer = null
		this._deleteBlinkState = false

		// Clip end-warning blink (250ms, bgcolor only) — for preset_slot buttons ≤5s remaining
		this._clipBlinkTimer = null
		this._clipBlinkState = false

		// Quick-assign: Set<slotId> — slots currently highlighted for 3s assignment
		this._quickAssignSlots = new Set()
		this._quickAssignTimers = {}

		// Pending name queries: replyPath -> { resolve, timer }
		this._pendingNameQueries = {}

		// Timestamp of last column/selected event — used to suppress
		// spurious clip/selected events that Arena sends in the same burst
		this._lastColumnSelectTime = 0

		// UDP relay sockets (raw dgram for pass-through forwarding) — up to 5
		this._relaySockets = [null, null, null, null, null]

		// --- Arena live state ---
		this.arenaBpm = null
		this.arenaMasterOpacity = null
		// per-layer: { bypass: bool, opacity: float }  keyed by layer number
		this.arenaLayerState = {}
		this.arenaAudioVolume = null
		this.arenaSpeed = null

		// Generic float-nudge cache: path → last-known value (0-1)
		this._floatNudgeValues = {}

		// --- Group column selection ---
		this.arenaSelectedGroupColumn = { group: null, column: null }

		// Discovered Arena groups (populated from incoming OSC group paths)
		this.arenaGroups = new Set()
		// Per-group active (connected) column: Map<groupNum, colNum>
		this.groupConnectedColumns = new Map()

		// Velocity encoder step tracking: key -> last press timestamp
		this._velocityLastPress = {}

		// Pending float queries: path -> { resolve, timer }
		this._pendingFloatQueries = {}

		// Active smooth-fade timers: path -> intervalId
		this._fadeTimers = {}

		// Autopilot last-set cache: "layer:clip" -> { autopilotSec, transitionSec, durationSec }
		this._autopilotCache = {}

		// Layer transition durations (seconds, normalized ×10 from Arena OSC, rounded to 0.1s)
		this.arenaLayerTransition = {}

		// Pending autopilot preview (first press): null or { layer, clip, durationSec, transitionSec, transitionSource, autopilotSec, offset, timer }
		this._autopilotPending = null

		// Loop-hold: Map<layer, { timer, lastBumpCycle }>  — increments autopilot/loops 1s before end
		this._loopHoldWatchers = {}

		// Debounce timer for updatePresets() on group/layer discovery
		this._presetsUpdateTimer = null

		// Runtime override for progress polling (toggled via action). null = follow config.
		this._progressPollingOverride = null

		// Ping/jitter samples (ms), most recent last
		this._pingHistory = []

		// Quick Control Panel: N buttons idle/"bypass" until activated, then cycle
		// through quick tools (paint / mass-delete / delete-mode / edit-mode / add-action /
		// volume-menu / master-menu / ping / poll-toggle / lock / reconnect / next page)
		this._controlPanelActive = false
		this._controlPanelPage = 0
		this._paintMode = false
		this._paintColorIndex = 0
		this._paintPickerActive = false
		this._paintPickerPage = 0
		this._paintPaletteCache = null
		this._massDeleteArmed = false
		this._massDeleteArmTimer = null

		// "Action Manager" tool blink (reviewed slot highlights)
		this._actionMgrBlinkTimer = null
		this._actionMgrBlinkState = false

		// "Add action" tool: capture up to 3 extra OSC triggers into one preset slot.
		// _addActionArmed = user pressed ACTION MANAGER, waiting for a slot pick.
		// _addActionReviewSlot = slot currently being reviewed/edited (not null = review mode).
		this._addActionArmed = false
		this._addActionReviewSlot = null

		// Staleness tracking for nudge helpers: path → last-used timestamp
		this._nudgeLastUsed = {}

		// Rotary-redirect target while the Control Panel volume/master tool is armed:
		// null | 'volume' | 'master'. Consumed by the velocity-nudge actions' "menu
		// active" guard so a shared physical encoder can control whichever the panel wants.
		this._controlPanelRotaryTarget = null

		// Move mode: pick source slot then destination slot to relocate all actions
		// _moveMode         — armed
		// _moveSourceSlot   — null = picking source, N = source chosen, picking dest
		// _moveConflict     — { src, dest } while conflict resolution panel is shown
		this._moveMode = false
		this._moveSourceSlot = null
		this._moveConflict = null
		this._moveBlinkTimer = null
		this._moveBlinkState = false

		// Verify mode: scan slots and highlight broken ones in red for re-mapping
		// _verifyMode     — true while results are shown
		// _verifyScanning — true while async scan is running
		// _verifyResults  — slotId → { status:'ok'|'broken', expected, actual }
		// _remapSlot      — slot currently being remapped (null = none)
		// _remapOffset    — last-calculated offset ({ type, deltas })
		this._verifyMode = false
		this._verifyScanning = false
		this._verifyResults = {}
		this._remapSlot = null
		this._remapOffset = null
		this._verifyBlinkTimer = null
		this._verifyBlinkState = false
		this._autoVerifyTimer = null
		this._autoVerifyRunning = false

		// User-defined boolean toggle variables (set via Quick Control Panel Tab 4)
		this._userVar1 = false
		this._userVar2 = false

	}

	// ---------------------------------------------------------------------------
	// Lifecycle
	// ---------------------------------------------------------------------------

	async init(config, isFirstInit, secrets) {
		this.config = config
		this.onDataReceived = {}
		this._onDataReceivedSize = 0

		// Restore persisted preset slots
		if (this.config._presetSlots && typeof this.config._presetSlots === 'object') {
			this.presetSlots = this.config._presetSlots
		}
		let resolved = false

		if (this.config.host) {
			if (isValidIPAddress(this.config.host)) {
				this.targetHost = this.config.host
				resolved = true
			} else {
				await resolveHostname(this, this.config.host)
					.then((ip) => { this.targetHost = ip; resolved = true })
					.catch((err) => {
						this.log('error', `Unable to resolve hostname for ${this.config.host}: ${err.message}`)
						this.updateStatus('bad_config')
					})
			}
		}

		if (this.targetHost && this.config.targetPort) {
			await this._resolveMachine2()
			// Always set up OSC transport, regardless of listen mode
			// (send-only also needs oscSend to be initialised)
			setupOSC(this)
			// Warn when 127.0.0.1 is used with listen=true — queries stay on loopback
			// so Arena on another machine will never respond, giving the impression of no feedback
			if (this.config.listen && this.targetHost === '127.0.0.1') {
				this.log('warn', '[arena-osc] Host is 127.0.0.1 (loopback). Feedback queries will be sent to this PC only. If Resolume Arena is on a different machine, enter its actual network IP in the settings.')
			}
			// (Re-)create OscState so it can start querying once the port is ready
			if (this.oscState) { this.oscState.destroy(); this.oscState = null }
			this.oscState = new OscState(this)
			if (this.config.listen) this.oscState.startPeriodicRefresh()
			this._setupSecondOscState()
			if (resolved && this.config.listen) this.setupListeners()
		}
		if (!this.config.listen) this.updateStatus('ok')

		this.updateActions()
		this.updateFeedbacks()
		this.updateVariables()
		this.updatePresets()
		this._scheduleThumbnailWarmup()
		this._syncAutoVerifyTimer()
	}

	async destroy() {
		this.log('debug', 'destroy')
		this._stopEditBlink()
		this._stopDeleteBlink()
		this._stopClipBlink()
		if (this.oscState) { this.oscState.destroy(); this.oscState = null }
		if (this.oscState2) { this.oscState2.destroy(); this.oscState2 = null }
		if (this._thumbnailWarmTimer) { clearTimeout(this._thumbnailWarmTimer); this._thumbnailWarmTimer = null }
		if (this._autoVerifyTimer) { clearInterval(this._autoVerifyTimer); this._autoVerifyTimer = null }
		this._autoVerifyRunning = false
		// Clear quick-assign timers
		for (const t of Object.values(this._quickAssignTimers)) clearTimeout(t)
		this._quickAssignTimers = {}
		this._quickAssignSlots.clear()
		// Clear all cleanup timers
		for (const t of Object.values(this._cleanupTimers)) clearTimeout(t)
		this._cleanupTimers = {}
		// Clear pending float queries
		for (const q of Object.values(this._pendingFloatQueries)) { clearTimeout(q.timer); q.resolve(null) }
		this._pendingFloatQueries = {}
		// Clear active smooth-fade timers
		for (const t of Object.values(this._fadeTimers)) clearInterval(t)
		this._fadeTimers = {}
		// Clear cached transition values
		this.arenaLayerTransition = {}
		// Clear pending autopilot
		if (this._autopilotPending?.timer) clearTimeout(this._autopilotPending.timer)
		this._autopilotPending = null
		// Clear loop-hold watchers
		for (const w of Object.values(this._loopHoldWatchers)) clearInterval(w.timer)
		this._loopHoldWatchers = {}
		// Clear mass-delete confirmation timer
		if (this._massDeleteArmTimer) { clearTimeout(this._massDeleteArmTimer); this._massDeleteArmTimer = null }
		// Clear control-panel and verify blink timers; reset async-task guard flags
		this._verifyMode = false
		this._verifyScanning = false
		this._moveMode = false
		this._stopActionMgrBlink()
		this._stopMoveBlink()
		this._stopVerifyBlink()
		// Clear pending name queries
		for (const q of Object.values(this._pendingNameQueries)) { clearTimeout(q.timer); q.resolve('') }
		this._pendingNameQueries = {}
		if (this.udpPort) {
			try { this.udpPort.close() } catch {}
			this.udpPort = null
		}
		if (this.udpPort2) { try { this.udpPort2.close() } catch {} this.udpPort2 = null }
		for (let _ri = 0; _ri < this._relaySockets.length; _ri++) {
			if (this._relaySockets[_ri]) { try { this._relaySockets[_ri].close() } catch {} this._relaySockets[_ri] = null }
		}
		if (this.client && this.client.isConnected && this.client.isConnected()) {
			await this.client.closeConnection().catch(() => {})
			this.client = null
		}
	}

	async configUpdated(config, secrets) {
		const prevConfig = this.config
		this.config = config
		const thumbnailsChanged = prevConfig.thumbnails_enabled !== config.thumbnails_enabled
		const autoVerifyChanged = prevConfig.auto_verify_enabled !== config.auto_verify_enabled

		if (this.config._presetSlots && typeof this.config._presetSlots === 'object') {
			this.presetSlots = this.config._presetSlots
		}
		if (autoVerifyChanged) this._syncAutoVerifyTimer()

		// If only _presetSlots changed (slot save), skip connection teardown.
		// saveConfig() always triggers configUpdated, so without this guard
		// every slot assignment would drop and re-open the OSC port.
		const connectionFields = ['host', 'targetPort', 'feedbackPort', 'protocol', 'listen',
			'machine2_enabled', 'host2', 'targetPort2', 'feedbackPort2', 'restPort', 'restPort2',
			'relay_enabled', 'relay_host', 'relay_port',
			'relay2_enabled', 'relay2_host', 'relay2_port',
			'relay3_enabled', 'relay3_host', 'relay3_port',
			'relay4_enabled', 'relay4_host', 'relay4_port',
			'relay5_enabled', 'relay5_host', 'relay5_port',
			'remote_enabled', 'remote_prefix']
		if (!connectionFields.some((k) => prevConfig[k] !== config[k])) {
			if (thumbnailsChanged) {
				if (this._thumbnailsEnabled()) this._scheduleThumbnailWarmup()
				else if (this._thumbnailWarmTimer) { clearTimeout(this._thumbnailWarmTimer); this._thumbnailWarmTimer = null }
				this.checkFeedbacks('preset_slot', 'arena_control_slot')
			}
			// Preset count fields changed: regenerate presets without connection reset
			if (prevConfig.osc_num_layers !== config.osc_num_layers ||
				prevConfig.osc_num_groups !== config.osc_num_groups ||
				prevConfig.control_slot_count !== config.control_slot_count) {
				this.updatePresets()
			}
			if (prevConfig.user_var_1_name !== config.user_var_1_name ||
				prevConfig.user_var_2_name !== config.user_var_2_name) {
				this.checkFeedbacks('arena_control_slot')
			}
			return
		}

		await this._doReconnect()
	}

	// Tears down and re-opens the OSC transport using the current config.
	// Factored out of configUpdated() so [Arena] OSC reconnect (Control Panel
	// tool) can force a reconnect without needing a config diff to trigger it.
	async _doReconnect() {
		// Clear discovered state so reconnect starts fresh
		this.arenaGroups.clear()
		this.groupConnectedColumns.clear()
		if (this.udpPort) {
			try { this.udpPort.close() } catch {}
			this.udpPort = null
		}
		if (this.udpPort2) { try { this.udpPort2.close() } catch {} this.udpPort2 = null }
		for (let _ri = 0; _ri < this._relaySockets.length; _ri++) {
			if (this._relaySockets[_ri]) { try { this._relaySockets[_ri].close() } catch {} this._relaySockets[_ri] = null }
		}
		// Cancel any in-flight name/float queries so timers don't fire against new connection
		for (const q of Object.values(this._pendingNameQueries)) { clearTimeout(q.timer); q.resolve('') }
		this._pendingNameQueries = {}
		for (const q of Object.values(this._pendingFloatQueries)) { clearTimeout(q.timer); q.resolve(null) }
		this._pendingFloatQueries = {}
		for (const t of Object.values(this._fadeTimers)) clearInterval(t)
		this._fadeTimers = {}
		this.arenaLayerTransition = {}
		if (this._autopilotPending?.timer) clearTimeout(this._autopilotPending.timer)
		this._autopilotPending = null
		// Clear loop-hold watchers so stale intervals don't keep firing after a
		// reconnect with different host/port settings
		for (const w of Object.values(this._loopHoldWatchers)) clearInterval(w.timer)
		this._loopHoldWatchers = {}
		// Cancel any pending preset debounce
		if (this._presetsUpdateTimer) { clearTimeout(this._presetsUpdateTimer); this._presetsUpdateTimer = null }
		if (this.client && this.client.isConnected && this.client.isConnected()) {
			await this.client.closeConnection().catch((err) => {
				this.log('error', `${this.config.protocol} close error: ${err.message}`)
			})
			this.client = null
		}

		let resolved = false

		if (!this.config.host) { this.updateStatus('bad_config'); this.log('warn', 'No host'); return }
		if (!this.config.targetPort) { this.updateStatus('bad_config'); this.log('warn', 'No targetPort'); return }

		if (isValidIPAddress(this.config.host)) {
			this.targetHost = this.config.host
			resolved = true
		} else {
			await resolveHostname(this, this.config.host)
				.then((ip) => { this.targetHost = ip; resolved = true })
				.catch((err) => {
					this.log('error', `Unable to resolve hostname for ${this.config.host}: ${err.message}`)
					this.updateStatus('bad_config')
				})
		}

		if (resolved) {
			await this._resolveMachine2()
			setupOSC(this)
			if (this.config.listen && this.targetHost === '127.0.0.1') {
				this.log('warn', '[arena-osc] Host is 127.0.0.1 (loopback). Feedback queries will be sent to this PC only. If Resolume Arena is on a different machine, enter its actual network IP in the settings.')
			}
			if (this.oscState) { this.oscState.destroy(); this.oscState = null }
			this.oscState = new OscState(this)
			if (this.config.listen) this.oscState.startPeriodicRefresh()
			this._setupSecondOscState()
			this.setupListeners()
		}
	}

	async _resolveMachine2() {
		this.targetHost2 = null
		if (!this.config.machine2_enabled || !this.config.host2) return
		try {
			this.targetHost2 = isValidIPAddress(this.config.host2)
				? this.config.host2
				: await resolveHostname(this, this.config.host2)
		} catch (err) {
			this.log('error', `Unable to resolve Arena 2 hostname ${this.config.host2}: ${err.message}`)
		}
	}

	_setupSecondOscState() {
		if (this.oscState2) { this.oscState2.destroy(); this.oscState2 = null }
		if (!this.config.machine2_enabled || !this.udpPort2 || !this.targetHost2) return
		const owner = this
		const adapter = {
			getOscListener: () => owner.udpPort2,
			getConfig: () => ({ host: owner.targetHost2, port: parseInt(owner.config.targetPort2 || '7000') }),
			getProgressPollingEnabled: () => owner.getProgressPollingEnabled(),
			checkFeedbacks: (...ids) => owner.checkFeedbacks(...ids),
			setVariableValues: () => {}, // machine 2 must not overwrite machine 1 variables
			updateVariables: () => {},
			updatePresets: () => {},
			log: (...args) => owner.log(...args),
		}
		this.oscState2 = new OscState(adapter)
		if (this.config.listen) this.oscState2.startPeriodicRefresh()
	}

	_scheduleThumbnailWarmup() {
		if (this._thumbnailWarmTimer) clearTimeout(this._thumbnailWarmTimer)
		if (!this._thumbnailsEnabled()) return
		this._thumbnailWarmTimer = setTimeout(async () => {
			this._thumbnailWarmTimer = null
			const unique = new Map()
			for (const slot of Object.values(this.presetSlots)) {
				const key = this._thumbnailKey(slot)
				if (key && !slot.thumbnailHidden && !unique.has(key)) unique.set(key, slot)
			}
			// Bound automatic REST work: one request at a time, at most 24 unique clips.
			for (const slot of [...unique.values()].slice(0, 24)) {
				await this._loadSlotThumbnail(null, slot, false)
				await new Promise((resolve) => setTimeout(resolve, 100))
			}
		}, 1000)
	}

	async setupListeners() {
		this.log('info', 'Resetting Listeners..')
		if (this.config.listen) {
			if (this.config.protocol && this.client && !this.client.isConnected()) {
				await this.client.openConnection().catch((err) => this.log('error', err.message))
			}
		} else {
			this.updateStatus('ok')
		}
	}

	// ---------------------------------------------------------------------------
	// Config fields
	// ---------------------------------------------------------------------------

	getConfigFields() {
		return [
			// ── Main connection ────────────────────────────────────────────────────────
			{ type: 'textinput', id: 'host', label: 'Arena IP or Hostname', width: 8, regex: Regex.HOSTNAME, required: true },
			{ type: 'textinput', id: 'targetPort', label: 'Target Port', width: 4, regex: Regex.PORT, default: '7000' },
			{
				type: 'static-text', id: 'host_hint', label: '',
				value: 'Use <code>127.0.0.1</code> if Companion and Arena are on the same PC, otherwise enter Arena\'s network IP.',
				width: 12,
			},
			{
				type: 'dropdown', id: 'protocol', label: 'Protocol', width: 4, default: 'udp',
				choices: [{ id: 'udp', label: 'UDP (Default)' }, { id: 'tcp', label: 'TCP' }, { id: 'tcp-raw', label: 'TCP (Raw)' }],
			},
			{ type: 'checkbox', id: 'listen', label: 'Listen for Feedback', width: 4, default: false },
			{
				type: 'textinput', id: 'feedbackPort', label: 'Feedback Port', width: 4, regex: Regex.PORT, default: '7001',
				isVisibleExpression: "$(options:listen) === true && $(options:protocol) === 'udp'",
			},
			{ type: 'textinput', id: 'restPort', label: 'REST thumbnail port', width: 4, regex: Regex.PORT, default: '8080' },
			{ type: 'checkbox', id: 'thumbnails_enabled', label: 'Enable thumbnails by default', width: 8, default: true },
			{ type: 'checkbox', id: 'machine2_enabled', label: 'Enable Arena 2 (UDP)', width: 12, default: false },
			{ type: 'textinput', id: 'host2', label: 'Arena 2 IP or Hostname', width: 4, regex: Regex.HOSTNAME, default: '', isVisibleExpression: '$(options:machine2_enabled) === true' },
			{ type: 'textinput', id: 'targetPort2', label: 'Arena 2 Target Port', width: 3, regex: Regex.PORT, default: '7000', isVisibleExpression: '$(options:machine2_enabled) === true' },
			{ type: 'textinput', id: 'feedbackPort2', label: 'Arena 2 Feedback Port', width: 3, regex: Regex.PORT, default: '7002', isVisibleExpression: '$(options:machine2_enabled) === true && $(options:listen) === true' },
			{ type: 'textinput', id: 'restPort2', label: 'Arena 2 REST thumbnail port', width: 2, regex: Regex.PORT, default: '8080', isVisibleExpression: '$(options:machine2_enabled) === true' },

			// ── OSC Relay / Passthrough ───────────────────────────────────────────
			{
				type: 'static-text', id: 'relay_header', label: 'OSC Relay / Passthrough',
				value: 'Forwards incoming UDP messages to additional Resolume instances.',
				width: 12,
			},
			{ type: 'checkbox', id: 'relay_enabled', label: 'Enable Relay 1', width: 3, default: false },
			{
				type: 'textinput', id: 'relay_host', label: 'Relay 1 Host / IP', width: 6, regex: Regex.HOSTNAME, default: '',
				isVisibleExpression: '$(options:relay_enabled) === true',
			},
			{
				type: 'textinput', id: 'relay_port', label: 'Relay 1 Port', width: 3, regex: Regex.PORT, default: '7001',
				isVisibleExpression: '$(options:relay_enabled) === true',
			},
			{
				type: 'checkbox', id: 'relay_filter_transport',
				label: 'Filter transport/position and clip-select messages (Relay 1)',
				width: 12, default: true,
				isVisibleExpression: '$(options:relay_enabled) === true',
			},

			// ── Relay 2 ─────────────────────────────────────────────────────────
			{ type: 'checkbox', id: 'relay2_enabled', label: 'Enable Relay 2', width: 3, default: false },
			{
				type: 'textinput', id: 'relay2_host', label: 'Relay 2 Host / IP', width: 6, regex: Regex.HOSTNAME, default: '',
				isVisibleExpression: '$(options:relay2_enabled) === true',
			},
			{
				type: 'textinput', id: 'relay2_port', label: 'Relay 2 Port', width: 3, regex: Regex.PORT, default: '7001',
				isVisibleExpression: '$(options:relay2_enabled) === true',
			},
			{
				type: 'checkbox', id: 'relay2_filter_transport',
				label: 'Filter transport/position and clip-select messages (Relay 2)',
				width: 12, default: true,
				isVisibleExpression: '$(options:relay2_enabled) === true',
			},

			// ── Relay 3 ─────────────────────────────────────────────────────────
			{ type: 'checkbox', id: 'relay3_enabled', label: 'Enable Relay 3', width: 3, default: false },
			{
				type: 'textinput', id: 'relay3_host', label: 'Relay 3 Host / IP', width: 6, regex: Regex.HOSTNAME, default: '',
				isVisibleExpression: '$(options:relay3_enabled) === true',
			},
			{
				type: 'textinput', id: 'relay3_port', label: 'Relay 3 Port', width: 3, regex: Regex.PORT, default: '7001',
				isVisibleExpression: '$(options:relay3_enabled) === true',
			},
			{
				type: 'checkbox', id: 'relay3_filter_transport',
				label: 'Filter transport/position and clip-select messages (Relay 3)',
				width: 12, default: true,
				isVisibleExpression: '$(options:relay3_enabled) === true',
			},

			// ── Relay 4 ─────────────────────────────────────────────────────────
			{ type: 'checkbox', id: 'relay4_enabled', label: 'Enable Relay 4', width: 3, default: false },
			{
				type: 'textinput', id: 'relay4_host', label: 'Relay 4 Host / IP', width: 6, regex: Regex.HOSTNAME, default: '',
				isVisibleExpression: '$(options:relay4_enabled) === true',
			},
			{
				type: 'textinput', id: 'relay4_port', label: 'Relay 4 Port', width: 3, regex: Regex.PORT, default: '7001',
				isVisibleExpression: '$(options:relay4_enabled) === true',
			},
			{
				type: 'checkbox', id: 'relay4_filter_transport',
				label: 'Filter transport/position and clip-select messages (Relay 4)',
				width: 12, default: true,
				isVisibleExpression: '$(options:relay4_enabled) === true',
			},

			// ── Relay 5 ─────────────────────────────────────────────────────────
			{ type: 'checkbox', id: 'relay5_enabled', label: 'Enable Relay 5', width: 3, default: false },
			{
				type: 'textinput', id: 'relay5_host', label: 'Relay 5 Host / IP', width: 6, regex: Regex.HOSTNAME, default: '',
				isVisibleExpression: '$(options:relay5_enabled) === true',
			},
			{
				type: 'textinput', id: 'relay5_port', label: 'Relay 5 Port', width: 3, regex: Regex.PORT, default: '7001',
				isVisibleExpression: '$(options:relay5_enabled) === true',
			},
			{
				type: 'checkbox', id: 'relay5_filter_transport',
				label: 'Filter transport/position and clip-select messages (Relay 5)',
				width: 12, default: true,
				isVisibleExpression: '$(options:relay5_enabled) === true',
			},
			{
				type: 'static-text', id: 'relay_filter_help',
				label: '',
				value: 'Filter: blocks playback position and clip-selection messages from forwarding.',
				width: 12,
			},

			// ── Resolume shortcuts install hint ──────────────────────────────────────
			{
				type: 'static-text', id: 'resolume_shortcuts_hint', label: 'Resolume Arena — OSC shortcuts',
				value: 'Use the <strong>[Arena] Install Resolume Arena shortcuts</strong> action to configure what Arena outputs as feedback (needed for variables and feedbacks).',
				width: 12,
				isVisibleExpression: '$(options:listen) === true',
			},

			// ── Remote control via OSC ──────────────────────────────────────────
			{
				type: 'static-text', id: 'remote_header', label: 'Remote Control via OSC',
				value: 'Resolume (or any OSC source) can trigger preset slots and modes by sending OSC commands to the listen port. Requires “Listen for Feedback” to be enabled.',
				width: 12,
			},
			{ type: 'checkbox', id: 'remote_enabled', label: 'Enable Remote Control', width: 3, default: false },
			{
				type: 'textinput', id: 'remote_prefix', label: 'OSC path prefix', width: 4, default: '/companion',
				isVisibleExpression: '$(options:remote_enabled) === true',
			},
			{
				type: 'static-text', id: 'remote_help', label: 'Available commands',
				value: '{prefix}/slot/{n} i:1 → trigger slot n\n{prefix}/slot/{n}/assign i:1 → assign\n{prefix}/slot/{n}/clear i:1 → clear\n{prefix}/edit i:1/0 → set edit mode\n{prefix}/delete i:1/0 → set delete mode\n{prefix}/bpm_tap → tap tempo',
				width: 12,
				isVisibleExpression: '$(options:remote_enabled) === true',
			},

			// ── OSC Clip Transport ─────────────────────────────────────────────────────
			{
				type: 'static-text', id: 'osc_transport_header', label: 'OSC Clip Transport',
				value: 'Sets the number of layers/groups to pre-generate progress bar presets for. Expands automatically when “Listen for Feedback” is active and Arena sends data.',
				width: 12,
			},
			{ type: 'number', id: 'osc_num_layers', label: 'Layers (preset count)', width: 6, default: 10, min: 1, max: 64 },
			{ type: 'number', id: 'osc_num_groups', label: 'Groups (preset count)', width: 6, default: 0, min: 0, max: 20 },
			{
				type: 'checkbox', id: 'progress_polling_enabled',
				label: 'Enable real-time clip progress polling', width: 12, default: false,
			},

			// ── Tempo / BPM ──────────────────────────────────────────────────────────
			{
				type: 'static-text', id: 'bpm_header', label: 'Tempo / BPM',
				value: 'Arena sends tempo as a normalized value (0–1) mapped over this BPM range. Enable override if Arena sends actual BPM directly.',
				width: 12,
			},
			{ type: 'number', id: 'bpm_range_min', label: 'BPM range min', width: 4, default: 20, min: 1, max: 9999 },
			{ type: 'number', id: 'bpm_range_max', label: 'BPM range max', width: 4, default: 500, min: 1, max: 9999 },
			{ type: 'checkbox', id: 'bpm_actual_value', label: 'Tempo uses actual BPM value (not normalized)', width: 4, default: false },

			// ── Quick Control Panel ────────────────────────────────────────────────────
			{
				type: 'static-text', id: 'control_panel_header', label: 'Quick Control Panel',
				value: 'Drag "Control Panel — Activate" and "Control Panel — Slot N" presets onto buttons to use the quick tool palette.',
				width: 12,
			},
			{ type: 'number', id: 'control_slot_count', label: 'Number of control slots', width: 4, default: 4, min: 2, max: 8 },

			// User variable buttons (Tab 4 of the Quick Control Panel)
			{ type: 'textinput', id: 'user_var_1_name', label: 'User var 1 label', width: 4, default: 'v=1' },
			{ type: 'textinput', id: 'user_var_2_name', label: 'User var 2 label', width: 4, default: 'v=2' },


			{
				type: 'static-text', id: 'dev_info', label: '',
				value: 'tg: <strong>roma_srp</strong>&ensp;|&ensp;Support development: <code>2202205300179097</code>',
				width: 12,
			},
		]
	}

	// ---------------------------------------------------------------------------
	// OSC send helper
	// ---------------------------------------------------------------------------

	async _sendOSC(path, args, machine = 1) {
		const argsJson = JSON.stringify(args)
		const argsStr = args.map((a) => (a.value !== undefined ? a.value : '')).join(' ')
		this.log('debug', `OSC M${machine} [${this.config.protocol}] -> ${path} ${argsStr}`)
		if (machine === 2) {
			if (!this.config.machine2_enabled || !this.oscSend || !this.targetHost2) return
			this.oscSend(this.targetHost2, this.config.targetPort2, path, args)
			return
		}

		if (this.config.protocol === 'udp') {
			this.setVariableValues({
				latest_sent_raw: `${path} ${argsStr}`,
				latest_sent_path: path,
				latest_sent_args: args.length > 0 ? args.map((a) => a.value) : undefined,
				latest_sent_timestamp: Date.now(),
			})
			if (this.oscSend) this.oscSend(this.targetHost, this.config.targetPort, path, args)
		} else {
			if (!this.client) return
			// Also update sent variables for TCP
			this.setVariableValues({
				latest_sent_raw: `${path} ${argsStr}`,
				latest_sent_path: path,
				latest_sent_args: args.length > 0 ? args.map((a) => a.value) : undefined,
				latest_sent_timestamp: Date.now(),
			})
			await this.client.sendCommand(path, args).catch((err) => {
				this.log('error', `Failed to send command: ${err.message}`)
			})
		}
	}

	// ---------------------------------------------------------------------------
	// BPM range conversion
	// Arena's tempo OSC parameter is a ranged float: by default it accepts/reports
	// 0.0-1.0 normalized over the composition's configured BPM range (Composition →
	// Tempo Controller). Sending a raw BPM (e.g. 120) as that float clamps to 1.0,
	// which Arena then displays as its range MAX (commonly reported as "500").
	// Enable "Tempo uses actual BPM value" in Connection settings if your Arena
	// setup reports/accepts real BPM values directly instead.
	// ---------------------------------------------------------------------------

	_bpmRange() {
		const min = Number(this.config.bpm_range_min ?? 20) || 20
		const max = Number(this.config.bpm_range_max ?? 500) || 500
		return max > min ? [min, max] : [min, min + 1]
	}

	_bpmToOsc(bpm) {
		if (this.config.bpm_actual_value) return bpm
		const [min, max] = this._bpmRange()
		return Math.max(0, Math.min(1, (bpm - min) / (max - min)))
	}

	_bpmFromOsc(raw) {
		if (this.config.bpm_actual_value) return raw
		// Heuristic: values ≤1 are normalized (the expected case); values >1 are
		// treated as an already-actual BPM (defensive fallback for mixed setups)
		if (raw > 1) return raw
		const [min, max] = this._bpmRange()
		return min + raw * (max - min)
	}

	// ---------------------------------------------------------------------------
	// Quick Control Panel
	// N buttons (default 4) that stay in "bypass" — idle, no action, free to show
	// any other feedback — until [Arena] Control Panel — Activate is pressed. Then
	// they page through quick tools; the last slot is always "Next".
	// ---------------------------------------------------------------------------

	// 24-color wheel (HSV, S=1 V=1) plus white/warm-white/gray/black — computed
	// lazily by _paintPalette(). Widen PAINT_WHEEL_STEPS for more hues.
	static PAINT_WHEEL_STEPS = 24

	// Three fixed tabs — each tab is displayed on one page.
	// Slot count determines how many tools are visible (count-1 visible + "Next"):
	//   4-slot panel → 3 tools visible per tab
	//   5-slot panel → all 4 tools visible per tab
	// Rotate left/right scrolls between tabs when no param is armed.
	static CONTROL_PAGES = [
		// Tab 1 — Modes
		[
			{ id: 'paint',          label: 'PAINT' },
			{ id: 'action_manager', label: 'ACT\nMGR' },
			{ id: 'edit_mode',      label: 'EDIT\nMODE' },
			{ id: 'delete_mode',    label: 'DEL\nMODE' },
		],
		// Tab 2 — Parameters
		[
			{ id: 'master',     label: 'MASTER\nMENU' },
			{ id: 'volume',     label: 'VOL\nMENU' },
			{ id: 'speed_ctrl', label: 'SPEED\nMENU' },
			{ id: 'move',       label: 'MOVE\nSLOT' },
		],
		// Tab 3 — Utilities
		[
			{ id: 'ping',        label: 'PING' },
			{ id: 'poll_toggle', label: 'POLL\nTOGGLE' },
			{ id: 'reconnect',   label: 'OSC\nRECONNECT' },
			{ id: 'mass_delete', label: 'DEL\nALL' },
		],
		// Tab 4 — Verify / Repair + User Vars
		[
			{ id: 'verify',     label: 'VERIFY\nSLOTS' },
			{ id: 'user_var_1', label: 'VAR 1' },
			{ id: 'user_var_2', label: 'VAR 2' },
			{ id: 'auto_verify', label: 'AUTO VERIFY\nOFF' },
		],
		[
			{ id: 'thumb_toggle', label: 'THUMB\nON/OFF' },
		],
	]

	_controlSlotCount() {
		return Math.max(2, Math.min(8, parseInt(this.config.control_slot_count ?? 4) || 4))
	}

	// Returns the tool assigned to a 1-based slot on the current tab-page, or null.
	// Last slot is always "Next ▶".
	_controlToolForSlot(slot) {
		const count = this._controlSlotCount()
		if (slot >= count) return null // last slot = Next ▶
		const pages = ArenaOscInstance.CONTROL_PAGES
		const page = pages[this._controlPanelPage % pages.length]
		return page[slot - 1] ?? null
	}

	// HSV → RGB (h: 0-360, s/v: 0-1) → [r,g,b] 0-255
	static _hsv(h, s, v) {
		const c = v * s, x = c * (1 - Math.abs(((h / 60) % 2) - 1)), m = v - c
		let [r, g, b] = h < 60 ? [c, x, 0] : h < 120 ? [x, c, 0] : h < 180 ? [0, c, x]
			: h < 240 ? [0, x, c] : h < 300 ? [x, 0, c] : [c, 0, x]
		return [Math.round((r + m) * 255), Math.round((g + m) * 255), Math.round((b + m) * 255)]
	}

	// Full color wheel: N hue steps + white/warm-white/gray/black for a proper "wheel"
	_paintPalette() {
		if (this._paintPaletteCache) return this._paintPaletteCache
		const steps = ArenaOscInstance.PAINT_WHEEL_STEPS
		const wheel = Array.from({ length: steps }, (_, i) => ArenaOscInstance._hsv((360 / steps) * i, 1, 1))
		this._paintPaletteCache = [...wheel, [255, 255, 255], [255, 210, 150], [128, 128, 128], [0, 0, 0]]
		return this._paintPaletteCache
	}

	_paintPickerItems() {
		return [
			{ type: 'clear' },
			{ type: 'thumbnail' },
			...this._paintPalette().map((color, colorIndex) => ({ type: 'color', color, colorIndex })),
		]
	}

	_paintPickerPageSize(controlSlotCount = this._controlSlotCount()) {
		return Math.max(1, controlSlotCount - 1)
	}

	_paintPickerItem(slot, controlSlotCount = this._controlSlotCount()) {
		const items = this._paintPickerItems()
		const pageSize = this._paintPickerPageSize(controlSlotCount)
		const index = (this._paintPickerPage * pageSize + (slot - 1)) % items.length
		return items[index]
	}

	_paintPickerPageCount(controlSlotCount = this._controlSlotCount()) {
		return Math.ceil(this._paintPickerItems().length / this._paintPickerPageSize(controlSlotCount))
	}

	async _runControlTool(tool) {
		switch (tool.id) {
			case 'paint': {
				if (this._moveMode) this._cancelMoveMode()
				// Enter the color picker: remaining control slots become swatches,
				// "Next" scrolls the color wheel instead of paging tools.
				this._paintPickerActive = true
				this._paintPickerPage = 0
				this.log('info', '[control-panel] Paint picker open — pick a color, then press a filled preset slot to apply it')
				this.checkFeedbacks('arena_control_slot')
				break
			}
			case 'mass_delete': {
				if (this._verifyMode || this._verifyScanning) this._cancelVerifyMode()
				if (this._massDeleteArmed) {
					const n = Object.keys(this.presetSlots).length
					this.presetSlots = {}
					this._savePresetSlots()
					this._massDeleteArmed = false
					if (this._massDeleteArmTimer) { clearTimeout(this._massDeleteArmTimer); this._massDeleteArmTimer = null }
					this.checkFeedbacks('preset_slot', 'arena_control_slot')
					this.log('info', `[control-panel] Mass delete: cleared ${n} preset slot(s)`)
				} else {
					this._massDeleteArmed = true
					this.checkFeedbacks('arena_control_slot')
					this.log('warn', '[control-panel] Mass delete armed — press again within 5s to clear ALL preset slots')
					this._massDeleteArmTimer = setTimeout(() => {
						this._massDeleteArmed = false
						this._massDeleteArmTimer = null
						this.checkFeedbacks('arena_control_slot')
					}, 5000)
				}
				break
			}
			case 'delete_mode': {
				if (this._moveMode) this._cancelMoveMode()
				if (this._verifyMode || this._verifyScanning) this._cancelVerifyMode()
				this.deleteMode = !this.deleteMode
				if (this.deleteMode) {
					if (this.editMode) { this.editMode = false; this._stopEditBlink(); this.setVariableValues({ arena_edit_mode: '0' }) }
					this._startDeleteBlink()
				} else {
					this._stopDeleteBlink()
				}
				this.setVariableValues({ arena_delete_mode: this.deleteMode ? '1' : '0' })
				this.checkFeedbacks('preset_slot', 'preset_slot_delete', 'arena_control_slot')
				this.log('info', `[control-panel] Delete mode ${this.deleteMode ? 'enabled' : 'disabled'}`)
				break
			}
			case 'action_manager': {
				if (this._verifyMode || this._verifyScanning) this._cancelVerifyMode()
				// In review mode: pressing ACTION MANAGER again exits review
				if (this._addActionReviewSlot != null) {
					this._addActionReviewSlot = null
					this._stopActionMgrBlink()
					this.checkFeedbacks('arena_control_slot')
					this.log('info', '[action-mgr] Review exited via ACT MGR')
					break
				}
				// Normal mode: arm/disarm
				this._addActionArmed = !this._addActionArmed
				this.checkFeedbacks('arena_control_slot')
				this.log('info', this._addActionArmed
					? '[action-mgr] Armed — press a filled preset slot to review its actions'
					: '[action-mgr] Disarmed')
				break
			}
			case 'speed_ctrl': {
				if (this._controlPanelRotaryTarget === 'speed') {
					this._controlPanelRotaryTarget = null
				} else {
					this._controlPanelRotaryTarget = 'speed'
					this._smoothFadeTo('/composition/speed', 0.25)
					this.log('info', '[control-panel] Speed menu armed — fading to default (0.25)')
				}
				this._syncControlPanelVars()
				this.checkFeedbacks('arena_control_slot')
				break
			}
			case 'move': {
				if (this._verifyMode || this._verifyScanning) this._cancelVerifyMode()
				if (this._moveMode) {
					this._cancelMoveMode()
				} else {
					this._moveMode = true
					this._moveSourceSlot = null
					this._moveConflict = null
					this._startMoveBlink()
					this.log('info', '[move] Armed — press a filled slot to pick source')
				}
				break
			}
			case 'volume': {
				if (this._controlPanelRotaryTarget === 'volume') {
					this._controlPanelRotaryTarget = null
				} else {
					this._controlPanelRotaryTarget = 'volume'
					this._smoothFadeTo('/composition/audio/volume', 1.0)
					this.log('info', '[control-panel] Volume menu armed — fading to 100%')
				}
				this._syncControlPanelVars()
				this.checkFeedbacks('arena_control_slot')
				break
			}
			case 'master': {
				if (this._controlPanelRotaryTarget === 'master') {
					this._controlPanelRotaryTarget = null
				} else {
					this._controlPanelRotaryTarget = 'master'
					this._smoothFadeTo('/composition/video/opacity', 1.0)
					this.log('info', '[control-panel] Master menu armed — fading to 100%')
				}
				this._syncControlPanelVars()
				this.checkFeedbacks('arena_control_slot')
				break
			}
			case 'ping': {
				await this._doPing()
				this.checkFeedbacks('arena_control_slot')
				break
			}
			case 'poll_toggle': {
				const next = !this.getProgressPollingEnabled()
				this._progressPollingOverride = next
				this.setVariableValues({ arena_progress_polling: next ? '1' : '0' })
				this.checkFeedbacks('arena_progress_polling_status', 'arena_control_slot')
				this.log('info', `[control-panel] Progress polling ${next ? 'enabled' : 'disabled'}`)
				break
			}
			case 'thumb_toggle': {
				const next = !this._thumbnailsEnabled()
				this.config.thumbnails_enabled = next
				this.saveConfig({ ...this.config })
				if (next) this._scheduleThumbnailWarmup()
				this.checkFeedbacks('preset_slot', 'arena_control_slot')
				this.log('info', `[control-panel] Thumbnails ${next ? 'enabled' : 'disabled'}`)
				break
			}
			case 'edit_mode': {
				if (this._moveMode) this._cancelMoveMode()
				if (this._verifyMode || this._verifyScanning) this._cancelVerifyMode()
				this.editMode = !this.editMode
				if (this.editMode) {
					if (this.deleteMode) { this.deleteMode = false; this._stopDeleteBlink(); this.setVariableValues({ arena_delete_mode: '0' }) }
					this._startEditBlink()
				} else {
					this._stopEditBlink()
				}
				this.setVariableValues({ arena_edit_mode: this.editMode ? '1' : '0' })
				this.checkFeedbacks('preset_slot', 'preset_slot_edit', 'arena_control_slot')
				this.log('info', `[control-panel] Edit mode ${this.editMode ? 'enabled' : 'disabled'}`)
				break
			}
			case 'reconnect': {
				this.log('info', '[control-panel] Forcing OSC reconnect...')
				await this._doReconnect()
				break
			}
			case 'user_var_1': {
				this._userVar1 = !this._userVar1
				this.setVariableValues({ user_var_1: this._userVar1 ? '1' : '0' })
				this.checkFeedbacks('arena_control_slot', 'user_var')
				this.log('info', `[user-var] var1 = ${this._userVar1}`)
				break
			}
			case 'user_var_2': {
				this._userVar2 = !this._userVar2
				this.setVariableValues({ user_var_2: this._userVar2 ? '1' : '0' })
				this.checkFeedbacks('arena_control_slot', 'user_var')
				this.log('info', `[user-var] var2 = ${this._userVar2}`)
				break
			}
			case 'verify': {
				if (this._moveMode) this._cancelMoveMode()
				if (this._addActionArmed || this._addActionReviewSlot != null) {
					this._addActionArmed = false
					this._addActionReviewSlot = null
					this._stopActionMgrBlink()
				}
				if (this._verifyMode || this._verifyScanning) {
					this._cancelVerifyMode()
				} else {
					this._verifyMode = true
					this._runVerify()  // async
					this.checkFeedbacks('arena_control_slot')
					this.log('info', '[verify] Scan started')
				}
				break
			}
			case 'auto_verify': {
				const enabled = this.config.auto_verify_enabled === true
				this.config.auto_verify_enabled = !enabled
				this._syncAutoVerifyTimer()
				this.saveConfig({ ...this.config })
				this.checkFeedbacks('arena_control_slot')
				this.log('info', `[verify] Automatic clip verification ${!enabled ? 'enabled' : 'disabled'}`)
				break
			}
		}
	}

	async _doPing() {
		const t0 = Date.now()
		const val = await this._queryFloat('/composition/speed')
		const rtt = Date.now() - t0
		if (val === null) {
			this.setVariableValues({ arena_ping_ms: 'timeout', arena_ping_jitter_ms: '—' })
			this.checkFeedbacks('arena_ping_status')
			this.log('warn', '[ping] No response from Arena (timeout)')
			return
		}
		this._pingHistory.push(rtt)
		if (this._pingHistory.length > 10) this._pingHistory.shift()
		const avg = this._pingHistory.reduce((a, b) => a + b, 0) / this._pingHistory.length
		const variance = this._pingHistory.reduce((a, b) => a + (b - avg) ** 2, 0) / this._pingHistory.length
		const jitter = Math.sqrt(variance)
		this.setVariableValues({ arena_ping_ms: rtt.toString(), arena_ping_jitter_ms: jitter.toFixed(1) })
		this.checkFeedbacks('arena_ping_status')
		this.log('info', `[ping] ${rtt}ms (jitter ${jitter.toFixed(1)}ms)`)
	}

	// Builds a one-shot "connect" trigger from the currently-selected Arena
	// clip/column/group-column, for the "add_action" Control Panel tool.
	_captureCurrentSelectionAsAction() {
		const machine = this._lastSelectedMachine || 1
		const selection = this._machineSelections[machine]
		if (selection.type === 'clip') {
			const { layer, clip } = selection.clip
			if (layer == null || clip == null) return null
			return { address: `/composition/layers/${layer}/clips/${clip}/connect`, args: [{ type: 'i', value: 1 }], label: `L${layer}C${clip}`, machine }
		}
		if (selection.type === 'column') {
			const { column } = selection.column
			if (column == null) return null
			return { address: `/composition/columns/${column}/connect`, args: [{ type: 'i', value: 1 }], label: `Col${column}`, machine }
		}
		if (selection.type === 'group_column') {
			const { group, column } = selection.groupColumn
			if (group == null || column == null) return null
			return { address: `/composition/groups/${group}/columns/${column}/connect`, args: [{ type: 'i', value: 1 }], label: `G${group}C${column}`, machine }
		}
		return null
	}

	// Shared velocity-nudge with smooth interpolation for VOL/MASTER/SPEED.
	// Used by both control panel rotary and direct encoder actions.
	// All nudges use velocity-aware smooth interpolation via _smoothNudge.
	// staleness: if param was unused for >3s, re-query from Arena to correct drift.
	async _nudgeAudioVolume(dir, minStep, maxStep) {
		const velKey = `audio_vol_${dir}`
		const step = this._calcVelocityStep(velKey, minStep, maxStep)
		const now = Date.now()
		const stale = this._nudgeLastUsed['vol'] && (now - this._nudgeLastUsed['vol'] > 3000)
		if (this.arenaAudioVolume === null || stale) {
			const q = await this._queryFloat('/composition/audio/volume')
			if (q !== null) this.arenaAudioVolume = q
		}
		this._nudgeLastUsed['vol'] = now
		if (this.arenaAudioVolume === null) { this.log('warn', 'Audio volume unknown'); return }
		const fromVal = this.arenaAudioVolume
		const newVal = Math.max(0, Math.min(1, fromVal + (dir === 'up' ? step : -step)))
		this.arenaAudioVolume = newVal  // pre-commit so next event accumulates from here
		this.setVariableValues({ arena_audio_volume: newVal.toFixed(3) })
		if (this._controlPanelActive) this.checkFeedbacks('arena_control_slot')
		this._smoothNudge('/composition/audio/volume', fromVal, newVal, velKey)
	}

	async _nudgeMasterOpacity(dir, minStep, maxStep) {
		const velKey = `master_op_${dir}`
		const step = this._calcVelocityStep(velKey, minStep, maxStep)
		const now = Date.now()
		const stale = this._nudgeLastUsed['master'] && (now - this._nudgeLastUsed['master'] > 3000)
		if (this.arenaMasterOpacity === null || stale) {
			const q = await this._queryFloat('/composition/video/opacity')
			if (q !== null) this.arenaMasterOpacity = q
		}
		this._nudgeLastUsed['master'] = now
		if (this.arenaMasterOpacity === null) { this.log('warn', 'Master opacity unknown'); return }
		const fromVal = this.arenaMasterOpacity
		const newVal = Math.max(0, Math.min(1, fromVal + (dir === 'up' ? step : -step)))
		this.arenaMasterOpacity = newVal
		this.setVariableValues({ arena_master_opacity: newVal.toFixed(3) })
		if (this._controlPanelActive) this.checkFeedbacks('arena_control_slot')
		this._smoothNudge('/composition/video/opacity', fromVal, newVal, velKey)
	}

	async _nudgeSpeed(dir, minStep, maxStep) {
		const velKey = `speed_${dir}`
		const step = this._calcVelocityStep(velKey, minStep, maxStep)
		const now = Date.now()
		const stale = this._nudgeLastUsed['speed'] && (now - this._nudgeLastUsed['speed'] > 3000)
		if (this.arenaSpeed === null || stale) {
			const q = await this._queryFloat('/composition/speed')
			if (q !== null) this.arenaSpeed = q
		}
		this._nudgeLastUsed['speed'] = now
		if (this.arenaSpeed === null) { this.log('warn', 'Composition speed unknown'); return }
		const fromVal = this.arenaSpeed
		const newVal = Math.max(0, Math.min(1, fromVal + (dir === 'up' ? step : -step)))
		this.arenaSpeed = newVal
		this.setVariableValues({ arena_speed: newVal.toFixed(3) })
		if (this._controlPanelActive) this.checkFeedbacks('arena_control_slot')
		this._smoothNudge('/composition/speed', fromVal, newVal, velKey)
	}

	// Velocity-aware smooth nudge: sends intermediate OSC values between encoder events.
	// velKey: the same velocity key used by _calcVelocityStep — provides interval data.
	// Faster rotation (smaller interval) → more intermediate steps to fill the gap.
	// This makes parameter changes visually smooth and continuous in Arena.
	//   - Slow rotation (>400ms):  1 direct send (no interpolation needed)
	//   - Medium (150–400ms):      2–4 steps over the expected interval
	//   - Fast  (50–150ms):        4–6 steps, 14ms each
	//   - Very fast (<50ms):       6–8 steps, 14ms each
	// The interval-based timing ensures each fade completes just before the next event.
	_smoothNudge(path, fromVal, toVal, velKey) {
		// Cancel any in-progress fade for this path
		if (this._fadeTimers[path]) {
			clearInterval(this._fadeTimers[path])
			delete this._fadeTimers[path]
		}
		const delta = toVal - fromVal
		if (Math.abs(delta) < 1e-7) return  // nothing to do

		// Read velocity state (set by _calcVelocityStep right before this call)
		const velState = this._velocityLastPress[velKey]
		const interval = velState?.smoothedInterval ?? Infinity  // ms between encoder events

		// Scale interpolation steps with rotation speed
		let numSteps
		if (!isFinite(interval) || interval > 400) {
			numSteps = 1   // slow rotation: direct send, no interpolation
		} else if (interval > 150) {
			numSteps = Math.max(2, Math.round((400 - interval) / 62.5))  // 2–4 steps
		} else if (interval > 50) {
			numSteps = Math.max(4, Math.round(6 - (interval - 50) / 50))  // 4–6 steps
		} else {
			numSteps = Math.min(8, Math.max(6, Math.round(50 / Math.max(14, interval))))
		}

		if (numSteps <= 1) {
			// Direct send — no timer overhead for slow rotation
			this._sendOSC(path, [{ type: 'f', value: toVal }])
			return
		}

		// Spread sends over 85% of expected interval so the fade completes
		// just before the next encoder event arrives
		const totalMs = isFinite(interval) ? interval * 0.85 : 60
		const stepInterval = Math.max(14, Math.round(totalMs / numSteps))

		let s = 0
		this._fadeTimers[path] = setInterval(() => {
			s++
			// Linear interpolation — cleanest for continuous parameter control
			const t = s / numSteps
			const val = Math.max(0, Math.min(1, fromVal + delta * t))
			this._sendOSC(path, [{ type: 'f', value: val }])
			if (s >= numSteps) {
				clearInterval(this._fadeTimers[path])
				delete this._fadeTimers[path]
			}
		}, stepInterval)
	}


		// Keeps arena_control_panel_active and arena_rotary_target variables
	// in sync with the corresponding state fields — call after any change.
	_syncControlPanelVars() {
		this.setVariableValues({
			arena_control_panel_active: this._controlPanelActive ? '1' : '0',
			arena_rotary_target: this._controlPanelRotaryTarget ?? '',
		})
	}

	// ---------------------------------------------------------------------------
	// Arena incoming OSC processing
	// Called by setupOSC / data-handler for EVERY incoming message
	// ---------------------------------------------------------------------------

	handleArenaIncoming(address, args, machine = 1) {
		// Route to OscState for transport position / duration / name / playmode / column tracking.
		// If OscState fully handles the path, return true immediately so the message
		// is not stored in the generic onDataReceived dict.
		const machineState = machine === 2 ? this.oscState2 : this.oscState
		if (machineState && machineState.handleMessage(address, args)) return true
		const selection = this._machineSelections[machine] || this._machineSelections[1]

		// Arena can report a column click as /connected rather than /selected.
		// Treat only the active state as a selection; disconnects must not replace it.
		const columnConnectedMatch = address.match(/^\/composition\/columns\/(\d+)\/connected$/)
		if (columnConnectedMatch) {
			const column = parseInt(columnConnectedMatch[1])
			const value = args && args.length > 0 ? Number(args[0].value) : 0
			if (Number.isFinite(value) && value >= 2) {
				selection.type = 'column'
				selection.column = { column }
				selection.lastColumnSelectTime = Date.now()
				this._lastSelectedMachine = machine
				this._lastColumnSelectTime = selection.lastColumnSelectTime
				this.arenaSelectedColumn = { column }
				this.arenaLastSelectType = 'column'
				this.setVariableValues({ arena_selected_column: column, arena_last_select_type: 'column' })
				if (this._remapSlot != null) this.checkFeedbacks('arena_control_slot')
				this.checkFeedbacks('arena_last_select_type', 'preset_slot')
			}
			return true
		}

		// Discover groups from any /composition/groups/N/ path
		const _grpDiscover = address.match(/^\/composition\/groups\/(\d+)\//)
		if (machine === 1 && _grpDiscover) {
			const gn = parseInt(_grpDiscover[1])
			if (!this.arenaGroups.has(gn)) {
				this.arenaGroups.add(gn)
				this._schedulePresetsUpdate()
			}
		}

		// Track which column is currently connected (active) per group
		const _grpConnMatch = address.match(/^\/composition\/groups\/(\d+)\/columns\/(\d+)\/connected$/)
		if (_grpConnMatch) {
			const gn = parseInt(_grpConnMatch[1])
			const col = parseInt(_grpConnMatch[2])
			const connVal = args && args.length > 0 ? +args[0].value : 0
			if (isFinite(connVal) && connVal >= 2) {
				if (machine === 1) this.groupConnectedColumns.set(gn, col)
				selection.type = 'group_column'
				selection.groupColumn = { group: gn, column: col }
				selection.lastColumnSelectTime = Date.now()
				this._lastSelectedMachine = machine
				this._lastColumnSelectTime = selection.lastColumnSelectTime
				this.arenaSelectedGroupColumn = { group: gn, column: col }
				this.arenaLastSelectType = 'group_column'
				this.setVariableValues({
					arena_selected_group: gn,
					arena_selected_group_column: col,
					arena_last_select_type: 'group_column',
				})
				if (this._remapSlot != null) this.checkFeedbacks('arena_control_slot')
				this.checkFeedbacks('arena_last_select_type', 'preset_slot')
			} else if (machine === 1 && connVal === 0 && this.groupConnectedColumns.get(gn) === col) {
				this.groupConnectedColumns.delete(gn)
			}
			if (machine === 1) this.checkFeedbacks('oscGroupColumnConnected')
			return true
		}

		// ── 0) Remote control commands ───────────────────────────────────────────────
		if (machine === 1 && this.config.remote_enabled && this.config.remote_prefix) {
			const prefix = String(this.config.remote_prefix).replace(/\/+$/, '')
			if (address.startsWith(prefix + '/') || address === prefix) {
				const sub = address.slice(prefix.length) // e.g. '/slot/3' or '/edit'
				const firstArg = args && args.length > 0 ? args[0].value : undefined

				// {prefix}/slot/{n}  → trigger (or assign if in edit/quick-assign mode)
				const slotTriggerMatch = sub.match(/^\/slot\/(\d+)$/)
				if (slotTriggerMatch) {
					if (firstArg === 0 || firstArg === false) return true // rising-edge only
					const slotId = parseInt(slotTriggerMatch[1])
					if (this.editMode || this._quickAssignSlots.has(slotId)) {
						this._assignSlot(slotId)
					} else if (this.deleteMode) {
						delete this.presetSlots[slotId]
						this._savePresetSlots()
						this.deleteMode = false
						this._stopDeleteBlink()
						this.setVariableValues({ arena_delete_mode: '0' })
						this.checkFeedbacks('preset_slot', 'preset_slot_delete')
					} else {
						const slot = this.presetSlots[slotId]
						if (slot) {
							this._triggerSlot(slotId)
						} else {
							this._startQuickAssign(slotId)
						}
					}
					return true
				}

				// {prefix}/slot/{n}/assign  → force-assign
				const slotAssignMatch = sub.match(/^\/slot\/(\d+)\/assign$/)
				if (slotAssignMatch) {
					if (firstArg === 0 || firstArg === false) return true
					this._assignSlot(parseInt(slotAssignMatch[1]))
					return true
				}

				// {prefix}/slot/{n}/clear  → clear slot
				const slotClearMatch = sub.match(/^\/slot\/(\d+)\/clear$/)
				if (slotClearMatch) {
					if (firstArg === 0 || firstArg === false) return true
					const slotId = parseInt(slotClearMatch[1])
					delete this.presetSlots[slotId]
					this._savePresetSlots()
					this.checkFeedbacks('preset_slot')
					return true
				}

				// {prefix}/edit  → set edit mode (int 1=on, 0=off; no args=toggle)
				if (sub === '/edit' || sub === '/edit_mode') {
					const newState = firstArg === undefined ? !this.editMode : (firstArg === 1 || firstArg === true)
					if (newState !== this.editMode) {
						this.editMode = newState
						if (newState) {
							if (this.deleteMode) { this.deleteMode = false; this._stopDeleteBlink(); this.setVariableValues({ arena_delete_mode: '0' }) }
							this._startEditBlink()
						} else {
							this._stopEditBlink()
						}
						this.setVariableValues({ arena_edit_mode: this.editMode ? '1' : '0' })
						this.checkFeedbacks('preset_slot', 'preset_slot_edit')
					}
					return true
				}

				// {prefix}/delete  → set delete mode
				if (sub === '/delete' || sub === '/delete_mode') {
					const newState = firstArg === undefined ? !this.deleteMode : (firstArg === 1 || firstArg === true)
					if (newState !== this.deleteMode) {
						this.deleteMode = newState
						if (newState) {
							if (this.editMode) { this.editMode = false; this._stopEditBlink(); this.setVariableValues({ arena_edit_mode: '0' }) }
							this._startDeleteBlink()
						} else {
							this._stopDeleteBlink()
						}
						this.setVariableValues({ arena_delete_mode: this.deleteMode ? '1' : '0' })
						this.checkFeedbacks('preset_slot', 'preset_slot_delete')
					}
					return true
				}

				// {prefix}/bpm_tap  → tap tempo
				if (sub === '/bpm_tap') {
					if (firstArg !== 0 && firstArg !== false)
						this._sendOSC('/composition/tempocontroller/tap', [])
					return true
				}

				// Unknown {prefix}/... command — log and consume (don't relay back)
				this.log('debug', `[Remote] Unknown command: ${address}`)
				return true
			}
		}

		// ── 1) Check pending name query replies
		const pendingKey = `${machine}:${address}`
		if (this._pendingNameQueries[pendingKey]) {
			const q = this._pendingNameQueries[pendingKey]
			clearTimeout(q.timer)
			delete this._pendingNameQueries[pendingKey]
			const name = args && args.length > 0 ? String(args[0].value ?? '') : ''
			q.resolve(name)
			return true // fully handled — don't store in generic dict
		}

		// Pending float queries — resolve, then fall through to section 2 for state update
		const fq = this._pendingFloatQueries[pendingKey]
		if (fq) {
			clearTimeout(fq.timer)
			delete this._pendingFloatQueries[pendingKey]
			const fqVal = args && args.length > 0 ? Number(args[0].value) : NaN
			fq.resolve(isNaN(fqVal) ? null : fqVal)
		}

		// 2) Arena tracked paths
		// Arena broadcasts /selected (state) not /select (command)
		const clipSelectMatch = address.match(/^\/composition\/layers\/(\d+)\/clips\/(\d+)\/(select|selected)$/)
		if (clipSelectMatch) {
			const layer = parseInt(clipSelectMatch[1])
			const clip = parseInt(clipSelectMatch[2])
			const val = args && args.length > 0 ? args[0].value : 1
			if (val === 1 || val === true || val === '1') {
				this.arenaSelectedClip = { layer, clip }
				// Always cancel autopilot pending on any clip change
				if (this._autopilotPending) {
					clearTimeout(this._autopilotPending.timer)
					this._autopilotPending = null
					this.checkFeedbacks('arena_autopilot_info')
				}
				// Suppress arenaLastSelectType update if a column was selected
				// in the same OSC burst (Arena sends both when clicking a column)
				const columnJustSelected = (Date.now() - selection.lastColumnSelectTime) < 200
				if (!columnJustSelected) {
					selection.type = 'clip'; selection.clip = { layer, clip }; this._lastSelectedMachine = machine
					this.arenaLastSelectType = 'clip'
					this.setVariableValues({
						arena_selected_layer: layer,
						arena_selected_clip: clip,
						arena_last_select_type: 'clip',
					})
					if (this._remapSlot != null) this.checkFeedbacks('arena_control_slot')
					this.checkFeedbacks('arena_last_select_type', 'preset_slot')
				} else {
					// Still track position, just don't change select type
					this.setVariableValues({ arena_selected_layer: layer, arena_selected_clip: clip })
				}
			}
			return true
		}

		const colSelectMatch = address.match(/^\/composition\/columns\/(\d+)\/(select|selected)$/)
		if (colSelectMatch) {
			const column = parseInt(colSelectMatch[1])
			const val = args && args.length > 0 ? args[0].value : 1
			if (val === 1 || val === true || val === '1') {
				selection.type = 'column'; selection.column = { column }; this._lastSelectedMachine = machine
				selection.lastColumnSelectTime = Date.now()
				this._lastColumnSelectTime = selection.lastColumnSelectTime
				this.arenaSelectedColumn = { column }
				this.arenaLastSelectType = 'column'
				this.setVariableValues({
					arena_selected_column: column,
					arena_last_select_type: 'column',
				})
				if (this._remapSlot != null) this.checkFeedbacks('arena_control_slot')
				this.checkFeedbacks('arena_last_select_type', 'preset_slot')
			}
			return true
		}

		const groupColSelectMatch = address.match(/^\/composition\/groups\/(\d+)\/columns\/(\d+)\/(select|selected)$/)
		if (groupColSelectMatch) {
			const group = parseInt(groupColSelectMatch[1])
			const column = parseInt(groupColSelectMatch[2])
			const val = args && args.length > 0 ? args[0].value : 1
			if (val === 1 || val === true || val === '1') {
				selection.type = 'group_column'; selection.groupColumn = { group, column }; this._lastSelectedMachine = machine
				selection.lastColumnSelectTime = Date.now()
				this._lastColumnSelectTime = selection.lastColumnSelectTime
				this.arenaSelectedGroupColumn = { group, column }
				this.arenaLastSelectType = 'group_column'
				this.setVariableValues({
					arena_selected_group: group,
					arena_selected_group_column: column,
					arena_last_select_type: 'group_column',
				})
				if (this._remapSlot != null) this.checkFeedbacks('arena_control_slot')
				this.checkFeedbacks('arena_last_select_type', 'preset_slot')
			}
			return true
		}

		// Name paths — handled via pending queries; discard unsolicited broadcasts
		const isNamePath =
			/^\/composition\/layers\/\d+\/clips\/\d+\/name$/.test(address) ||
			/^\/composition\/columns\/\d+\/name$/.test(address) ||
			/^\/composition\/groups\/\d+\/columns\/\d+\/name$/.test(address)
		if (isNamePath) return true
		// Composition-level variables and nudge caches remain the public state of
		// Arena 1. Arena 2 transport state is isolated in oscState2 above.
		if (machine === 2) return true

		// BPM — Arena reports tempo normalized 0.0-1.0 over the BPM range by default;
		// see _bpmFromOsc() for the conversion (fixes "always 500" / garbled decimal bugs)
		if (address === '/composition/tempocontroller/tempo' || address === '/composition/bpm') {
			const raw = args && args.length > 0 ? Number(args[0].value) : null
			if (raw !== null && !isNaN(raw)) {
				const bpm = this._bpmFromOsc(raw)
				this.arenaBpm = bpm
				this.setVariableValues({ arena_bpm: bpm.toFixed(2) })
				this.checkFeedbacks('arena_bpm_value')
			}
			return true
		}

		// Master opacity
		if (address === '/composition/video/opacity') {
			const op = args && args.length > 0 ? Number(args[0].value) : null
			if (op !== null && !isNaN(op)) {
				this.arenaMasterOpacity = op
				this.setVariableValues({ arena_master_opacity: op.toFixed(3) })
			}
			return true
		}

		// Layer opacity
		const layerOpacityMatch = address.match(/^\/composition\/layers\/(\d+)\/video\/opacity$/)
		if (layerOpacityMatch) {
			const layer = parseInt(layerOpacityMatch[1])
			const op = args && args.length > 0 ? Number(args[0].value) : null
			if (op !== null && !isNaN(op)) {
				if (!this.arenaLayerState[layer]) this.arenaLayerState[layer] = {}
				this.arenaLayerState[layer].opacity = op
				this.checkFeedbacks('arena_layer_opacity')
			}
			return true
		}

		// Layer bypass — /composition/layers/{n}/bypassed
		const layerBypassMatch = address.match(/^\/composition\/layers\/(\d+)\/bypassed$/)
		if (layerBypassMatch) {
			const layer = parseInt(layerBypassMatch[1])
			const bypass = args && args.length > 0 ? (args[0].value === 1 || args[0].value === true) : false
			if (!this.arenaLayerState[layer]) this.arenaLayerState[layer] = {}
			this.arenaLayerState[layer].bypass = bypass
			this.checkFeedbacks('arena_layer_bypass')
			return true
		}

		// Audio volume
		if (address === '/composition/audio/volume') {
			const v = args && args.length > 0 ? Number(args[0].value) : NaN
			if (!isNaN(v)) {
				this.arenaAudioVolume = v
				this.setVariableValues({ arena_audio_volume: v.toFixed(3) })
			}
			return true
		}

		// Composition speed
		if (address === '/composition/speed') {
			const v = args && args.length > 0 ? Number(args[0].value) : NaN
			if (!isNaN(v)) {
				this.arenaSpeed = v
				this.setVariableValues({ arena_speed: v.toFixed(3) })
			}
			return true
		}

		// Layer transition duration — Float 0.0-1.0, range 0.0-10.0s
		const layerTransitionMatch = address.match(/^\/composition\/layers\/(\d+)\/transition\/duration$/)
		if (layerTransitionMatch) {
			const layer = parseInt(layerTransitionMatch[1])
			const v = args && args.length > 0 ? Number(args[0].value) : NaN
			if (!isNaN(v) && isFinite(v)) {
				const rawSec = v * 10  // normalize: 0-1 → 0-10s
				const sec = Math.round(rawSec * 10) / 10  // round to 0.1s
				this.arenaLayerTransition[layer] = sec
				this.log('debug', `transition/duration L${layer}: raw=${v.toFixed(6)} ×10 = ${sec.toFixed(1)}s`)
			}
			return true
		}

		// 3) Everything else — store in generic dict with auto-cleanup.
		// Guard against effects/FX floods from Arena (layers can have hundreds of params).
		// If the path matches known Arena effect/param patterns, skip storage entirely —
		// they have no corresponding feedbacks and only waste memory + timer slots.
		if (
			address.includes('/effects/') ||
			address.includes('/sourceparams/') ||
			address.includes('/params/')
		) return false

		// Cap dict size to avoid unbounded growth from unexpected paths
		const isNew = !Object.prototype.hasOwnProperty.call(this.onDataReceived, address)
		if (isNew && this._onDataReceivedSize >= 500) {
			// Evict the oldest entry to make room — use for...in to avoid allocating a full array
			let oldest = null
			for (oldest in this.onDataReceived) break
			if (oldest !== null) {
				if (this._cleanupTimers[oldest]) { clearTimeout(this._cleanupTimers[oldest]); delete this._cleanupTimers[oldest] }
				delete this.onDataReceived[oldest]
				this._onDataReceivedSize--
			}
		}

		if (isNew) this._onDataReceivedSize++
		this.onDataReceived[address] = args || []
		if (this._cleanupTimers[address]) clearTimeout(this._cleanupTimers[address])
		this._cleanupTimers[address] = setTimeout(() => {
			if (Object.prototype.hasOwnProperty.call(this.onDataReceived, address)) {
				delete this.onDataReceived[address]
				this._onDataReceivedSize--
			}
			delete this._cleanupTimers[address]
		}, GENERIC_OSC_CLEANUP_TTL)
		return false
	}

	// ---------------------------------------------------------------------------
	// Name query
	// ---------------------------------------------------------------------------

	async _queryName(oscPath, machine = 1) {
		return new Promise((resolve) => {
			const key = `${machine}:${oscPath}`
			// Cancel any in-flight query for the same path to avoid timer leaks
			if (this._pendingNameQueries[key]) {
				clearTimeout(this._pendingNameQueries[key].timer)
				this._pendingNameQueries[key].resolve('')
				delete this._pendingNameQueries[key]
			}

			const timer = setTimeout(() => {
				delete this._pendingNameQueries[key]
				this.log('debug', `Name query timeout: ${oscPath}`)
				resolve('')
			}, NAME_QUERY_TIMEOUT)

			this._pendingNameQueries[key] = { resolve, timer }
			// Arena requires a string "?" argument to return the current value
			this._sendOSC(oscPath, [{ type: 's', value: '?' }], machine).catch(() => {
				clearTimeout(timer)
				delete this._pendingNameQueries[key]
				resolve('')
			})
		})
	}

	async _getClipName(layer, clip, machine = 1, fresh = false) {
		// Fast path: oscState already fetched this on clip connect (# already replaced)
		if (!fresh && machine === 1 && this.oscState) {
			const c = this.oscState.getActiveClip(layer)
			if (c && c.activeClip === clip && c.name) return c.name
		}
		const raw = await this._queryName(`/composition/layers/${layer}/clips/${clip}/name`, machine)
		return raw.replace(/#/g, String(clip))
	}

	async _getColumnName(column, machine = 1) {
		const raw = await this._queryName(`/composition/columns/${column}/name`, machine)
		return raw.replace(/#/g, String(column))
	}

	async _getGroupColumnName(group, column, machine = 1) {
		const raw = await this._queryName(`/composition/groups/${group}/columns/${column}/name`, machine)
		return raw.replace(/#/g, String(column))
	}

	async _queryFloat(oscPath, machine = 1) {
		return new Promise((resolve) => {
			const key = `${machine}:${oscPath}`
			if (this._pendingFloatQueries[key]) {
				clearTimeout(this._pendingFloatQueries[key].timer)
				this._pendingFloatQueries[key].resolve(null)
				delete this._pendingFloatQueries[key]
			}
			const timer = setTimeout(() => {
				delete this._pendingFloatQueries[key]
				resolve(null)
			}, NAME_QUERY_TIMEOUT)
			this._pendingFloatQueries[key] = { resolve, timer }
			this._sendOSC(oscPath, [{ type: 's', value: '?' }], machine).catch(() => {
				clearTimeout(timer)
				delete this._pendingFloatQueries[key]
				resolve(null)
			})
		})
	}

	// Velocity encoder: shorter interval between presses = larger step.
	// Uses EMA (exponential moving average) of press intervals for smoothing
	// and light prediction — avoids jerkiness when rhythm changes slightly.
	//   Alpha=0.35 → 65% history weight, smooth momentum feel.
	//   Range: 50–750ms. Power-1.5 curve for natural feel.
	// Velocity-sensitive step calculator with momentum model and range scaling.
	//
	// momentum: builds up with each consecutive press (+0.18/press, max 1.0),
	//   decays with half-life ~300ms when idle. Gives natural acceleration.
	// smoothedInterval: EMA of time between presses for fine-grained speed detection.
	// Combined: blends both signals for smooth, predictable response.
	//
	// rangeSize (default 1): scale the output step proportionally to the range.
	//   Range 0-1  → rangeSize=1 → step unchanged (e.g. 0.005–0.05).
	//   Range 0-10 → rangeSize=10 → steps 10× larger (proportional coverage).
	//   Range 0.2-0.4 → rangeSize=0.2 → steps 5× finer (narrow ranges are gradual).
	//   Result: same number of encoder turns covers the full range regardless of scale.
	_calcVelocityStep(key, minStep, maxStep, rangeSize = 1) {
		const now = Date.now()
		const state = this._velocityLastPress[key] ?? null
		const elapsed = state ? now - state.time : Infinity

		// ── Momentum (accumulates per press, exponential decay when idle) ──────
		const HALF_LIFE_MS = 300
		const prevMomentum = state?.momentum ?? 0
		const decayed = elapsed < Infinity ? prevMomentum * Math.pow(0.5, elapsed / HALF_LIFE_MS) : 0
		const momentum = Math.min(1.0, decayed + 0.18) // +0.18/press; full speed after ~8 quick presses

		// ── EMA interval (fine speed detection within bursts) ─────────────────
		let smoothedInterval = state?.smoothedInterval ?? Infinity
		if (elapsed > 0 && elapsed <= 750) {
			const raw = Math.max(30, Math.min(750, elapsed))
			smoothedInterval = smoothedInterval < Infinity
				? 0.25 * raw + 0.75 * smoothedInterval  // strong smoothing for stability
				: raw
		} else {
			smoothedInterval = Infinity  // gap > 750ms resets speed history
		}

		this._velocityLastPress[key] = { time: now, momentum, smoothedInterval }

		// ── Combine momentum + interval into a single [0,1] velocity factor ──
		let velFactor
		if (smoothedInterval < Infinity) {
			const intervalT = Math.max(0, 1 - (smoothedInterval - 30) / 720) // 0=slow, 1=fast
			velFactor = intervalT * 0.5 + momentum * 0.5
		} else {
			velFactor = momentum * 0.25  // first press in a new burst: gentle start
		}

		const curve = Math.pow(Math.min(1, Math.max(0, velFactor)), 1.4)
		const rawStep = minStep + curve * (maxStep - minStep)

		// ── Range scaling: step is proportional to the actual range size ──────
		const scaled = rawStep * Math.max(1e-4, rangeSize)
		return Math.round(scaled * 1e6) / 1e6
	}

	// Smoothly fade an OSC float parameter (0.0–1.0) to a target value
	_smoothFadeTo(path, toVal, durationMs = 400, numSteps = 16) {
		if (this._fadeTimers[path]) {
			clearInterval(this._fadeTimers[path])
			delete this._fadeTimers[path]
		}
		const fromVal = path === '/composition/audio/volume' ? (this.arenaAudioVolume ?? toVal)
			: path === '/composition/speed' ? (this.arenaSpeed ?? toVal)
			: path === '/composition/video/opacity' ? (this.arenaMasterOpacity ?? toVal) : toVal
		if (fromVal === toVal) {
			this._sendOSC(path, [{ type: 'f', value: toVal }])
			return
		}
		const delta = toVal - fromVal
		const stepInterval = Math.max(16, Math.round(durationMs / numSteps))
		let step = 0
		const timer = setInterval(() => {
			step++
			const val = Math.max(0, Math.min(1, fromVal + delta * (step / numSteps)))
			this._sendOSC(path, [{ type: 'f', value: val }])
			if (path === '/composition/audio/volume') {
				this.arenaAudioVolume = val
				this.setVariableValues({ arena_audio_volume: val.toFixed(3) })
			} else if (path === '/composition/speed') {
				this.arenaSpeed = val
				this.setVariableValues({ arena_speed: val.toFixed(3) })
			} else if (path === '/composition/video/opacity') {
				this.arenaMasterOpacity = val
				this.setVariableValues({ arena_master_opacity: val.toFixed(3) })
			}
			// Live-update the Control Panel's Volume/Master level display while fading
			if (this._controlPanelActive) this.checkFeedbacks('arena_control_slot')
			if (step >= numSteps) {
				clearInterval(timer)
				delete this._fadeTimers[path]
				this.checkFeedbacks('arena_control_slot')
			}
		}, stepInterval)
		this._fadeTimers[path] = timer
	}

	// ---------------------------------------------------------------------------
	// Preset slots persistence
	// ---------------------------------------------------------------------------

	/**
	 * Returns the OSC UDP port object used for sending OSC queries back to Arena.
	 * Called by OscState to query duration/name/playmode via wildcard paths.
	 */
	getOscListener() {
		return this.udpPort || null
	}

	/**
	 * Returns host and target port for OSC queries.
	 * Called by OscState.
	 */
	getConfig() {
		return {
			host: this.targetHost,
			port: parseInt(this.config.targetPort || '7000'),
		}
	}

	/**
	 * Whether periodic real-time clip progress polling (resync + health-check
	 * position queries) is active. Runtime action toggle overrides the config
	 * checkbox until the next reconnect. Called by OscState.
	 */
	getProgressPollingEnabled() {
		if (this._progressPollingOverride !== null) return this._progressPollingOverride
		return this.config.progress_polling_enabled !== false
	}

	_thumbnailsEnabled() {
		return this.config.thumbnails_enabled !== false
	}

	_savePresetSlots() {
		// Persist inside module config (survives Companion restart)
		this.saveConfig({ ...this.config, _presetSlots: this.presetSlots })
	}

	// ---------------------------------------------------------------------------
	// Edit mode blink
	// ---------------------------------------------------------------------------

	_startEditBlink() {
		this._stopEditBlink()
		this._editBlinkState = true
		this.checkFeedbacks('preset_slot_edit', 'preset_slot')  // immediate — no wait for first interval
		this._editBlinkTimer = setInterval(() => {
			this._editBlinkState = !this._editBlinkState
			this.checkFeedbacks('preset_slot', 'preset_slot_edit')
		}, BLINK_INTERVAL)
	}

	_stopEditBlink() {
		if (this._editBlinkTimer) { clearInterval(this._editBlinkTimer); this._editBlinkTimer = null }
		this._editBlinkState = false
	}

	_startDeleteBlink() {
		this._stopDeleteBlink()
		this._deleteBlinkState = true
		this.checkFeedbacks('preset_slot_delete', 'preset_slot')  // immediate — no wait for first interval
		this._deleteBlinkTimer = setInterval(() => {
			this._deleteBlinkState = !this._deleteBlinkState
			this.checkFeedbacks('preset_slot', 'preset_slot_delete')
		}, BLINK_INTERVAL)
	}

	_stopDeleteBlink() {
		if (this._deleteBlinkTimer) { clearInterval(this._deleteBlinkTimer); this._deleteBlinkTimer = null }
		this._deleteBlinkState = false
	}

	_startActionMgrBlink() {
		this._stopActionMgrBlink()
		this._actionMgrBlinkState = true
		this.checkFeedbacks('preset_slot', 'arena_control_slot')
		this._actionMgrBlinkTimer = setInterval(() => {
			this._actionMgrBlinkState = !this._actionMgrBlinkState
			this.checkFeedbacks('preset_slot', 'arena_control_slot')
		}, BLINK_INTERVAL)
	}

	_stopActionMgrBlink() {
		if (this._actionMgrBlinkTimer) { clearInterval(this._actionMgrBlinkTimer); this._actionMgrBlinkTimer = null }
		this._actionMgrBlinkState = false
	}

	_startMoveBlink() {
		this._stopMoveBlink()
		this._moveBlinkState = true
		this.checkFeedbacks('preset_slot', 'arena_control_slot')
		this._moveBlinkTimer = setInterval(() => {
			this._moveBlinkState = !this._moveBlinkState
			this.checkFeedbacks('preset_slot', 'arena_control_slot')
		}, BLINK_INTERVAL)
	}

	_stopMoveBlink() {
		if (this._moveBlinkTimer) { clearInterval(this._moveBlinkTimer); this._moveBlinkTimer = null }
		this._moveBlinkState = false
	}

	_cancelMoveMode() {
		this._moveMode = false
		this._moveSourceSlot = null
		this._moveConflict = null
		this._stopMoveBlink()
		this.checkFeedbacks('preset_slot', 'arena_control_slot')
		this.log('info', '[move] Cancelled')
	}

	// ── Verify mode blink + lifecycle ──────────────────────────────────────────

	_startVerifyBlink() {
		this._stopVerifyBlink()
		this._verifyBlinkState = true
		this.checkFeedbacks('preset_slot', 'arena_control_slot')
		this._verifyBlinkTimer = setInterval(() => {
			this._verifyBlinkState = !this._verifyBlinkState
			this.checkFeedbacks('preset_slot', 'arena_control_slot')
		}, BLINK_INTERVAL)
	}

	_stopVerifyBlink() {
		if (this._verifyBlinkTimer) { clearInterval(this._verifyBlinkTimer); this._verifyBlinkTimer = null }
		this._verifyBlinkState = false
	}

	_cancelVerifyMode() {
		this._verifyMode = false
		this._verifyScanning = false
		this._verifyResults = {}
		this._remapSlot = null
		this._remapOffset = null
		this._stopVerifyBlink()
		this.checkFeedbacks('preset_slot', 'arena_control_slot')
		this.log('info', '[verify] Exited')
	}

	_syncAutoVerifyTimer() {
		if (this._autoVerifyTimer) { clearInterval(this._autoVerifyTimer); this._autoVerifyTimer = null }
		if (this.config.auto_verify_enabled !== true) return
		this._autoVerifyTimer = setInterval(() => {
			this._runAutoVerify().catch((err) => this.log('warn', `[verify] Automatic scan failed: ${err.message}`))
		}, 60000)
	}

	async _slotNameAtStoredPosition(slot) {
		if (!slot) return ''
		const machine = slot.machine || 1
		if (slot.type === 'clip') return this._getClipName(slot.layer, slot.clip, machine, true)
		if (slot.type === 'column') {
			let name = await this._getColumnName(slot.column, machine)
			if (!name || /^column\s*#?\s*\d+$/i.test(name.trim())) {
				const clipName = await this._getLongestClipNameInColumn(slot.column, machine)
				name = clipName ? `C${slot.column}\n(${truncLabel(clipName, 15)})` : `Col${slot.column}`
			}
			return name
		}
		if (slot.type === 'group_column') return this._getGroupColumnName(slot.group, slot.column, machine)
		return ''
	}

	async _runAutoVerify() {
		if (this._autoVerifyRunning || this._verifyMode || this._verifyScanning) return
		this._autoVerifyRunning = true
		try {
			const entries = Object.entries(this.presetSlots)
				.filter(([, slot]) => slot?.type === 'clip')
				.map(([id, slot]) => [Number(id), slot])
			const results = {}
			// Two targeted name queries at a time; never wildcard and never REST.
			for (let i = 0; i < entries.length; i += 2) {
				const batch = await Promise.all(entries.slice(i, i + 2).map(async ([slotId, slot]) => {
					const actual = await this._getClipName(slot.layer, slot.clip, slot.machine || 1, true)
					return [slotId, { status: actual && actual === slot.name ? 'ok' : 'broken', expected: slot.name, actual: actual || null }]
				}))
				for (const [slotId, result] of batch) results[slotId] = result
			}
			const broken = Object.values(results).filter((result) => result.status === 'broken').length
			if (broken > 0) {
				this._verifyResults = results
				this._verifyMode = true
				this._startVerifyBlink()
				this.log('warn', `[verify] Automatic scan: ${broken}/${entries.length} clip slot(s) moved`)
			} else if (entries.length > 0) {
				this.log('debug', `[verify] Automatic scan: all ${entries.length} clip slot(s) OK`)
			}
		} finally {
			this._autoVerifyRunning = false
		}
	}

	// Scan all slots: query Arena for the name at each stored address.
	// Marks non-matching slots as 'broken' and starts the red blink.
	async _runVerify() {
		this._verifyScanning = true
		this._verifyResults = {}
		this._remapSlot = null
		this._remapOffset = null
		this.checkFeedbacks('preset_slot', 'arena_control_slot')

		const slotIds = Object.keys(this.presetSlots).map(Number).sort((a, b) => a - b)
		for (const slotId of slotIds) {
			if (!this._verifyMode) break  // user cancelled mid-scan
			const slot = this.presetSlots[slotId]
			if (!slot) continue
			const actual = await this._slotNameAtStoredPosition(slot)
			const status = (actual && actual === slot.name) ? 'ok' : 'broken'
			this._verifyResults[slotId] = { status, expected: slot.name, actual: actual || null }
			// Refresh the scanned slot immediately so the user sees it update slot-by-slot
			this.checkFeedbacks('preset_slot')
		}

		this._verifyScanning = false
		const broken = Object.values(this._verifyResults).filter(r => r.status === 'broken').length

		// Guard: user may have cancelled while scan was running
		if (!this._verifyMode) return

		if (broken === 0) {
			this.log('info', `[verify] All ${slotIds.length} slot(s) OK`)
			this._cancelVerifyMode()
		} else {
			this._startVerifyBlink()
			this.log('warn', `[verify] ${broken}/${slotIds.length} slot(s) broken — press a red slot to remap`)
		}
	}

	// Fix a single slot to the current Arena selection and record offset for bulk fix.
	// Preserves color and extraActions (extra actions are layout-independent).
	async _fixSlotToCurrentSelection(slotId) {
		const slot = this.presetSlots[slotId]
		if (!slot || !this.arenaLastSelectType) {
			this.log('warn', '[verify] Nothing selected in Arena — click the correct clip/column first')
			return false
		}
		const { color, extraActions } = slot
		const machine = this._lastSelectedMachine || slot.machine || 1
		const newType = this.arenaLastSelectType

		if (newType === 'clip') {
			const { layer, clip } = this.arenaSelectedClip
			if (layer == null || clip == null) return false
			const name = await this._getClipName(layer, clip, machine, true) || slot.name
			if (slot.type === 'clip') this._remapOffset = { type: 'clip', layerDelta: layer - slot.layer, clipDelta: clip - slot.clip }
			this.presetSlots[slotId] = { type: 'clip', layer, clip, name, color, extraActions, machine }
		} else if (newType === 'column') {
			const { column } = this.arenaSelectedColumn
			if (column == null) return false
			const name = await this._getColumnName(column, machine) || slot.name
			if (slot.type === 'column') this._remapOffset = { type: 'column', columnDelta: column - slot.column }
			this.presetSlots[slotId] = { type: 'column', column, name, color, extraActions, machine }
		} else if (newType === 'group_column') {
			const { group, column } = this.arenaSelectedGroupColumn
			if (group == null || column == null) return false
			const name = await this._getGroupColumnName(group, column, machine) || slot.name
			if (slot.type === 'group_column') this._remapOffset = { type: 'group_column', groupDelta: group - slot.group, columnDelta: column - slot.column }
			this.presetSlots[slotId] = { type: 'group_column', group, column, name, color, extraActions, machine }
		}

		this._verifyResults[slotId] = { status: 'ok', expected: this.presetSlots[slotId].name, actual: this.presetSlots[slotId].name }
		this._savePresetSlots()
		this.log('info', `[verify] Slot ${slotId} fixed`)
		return true
	}

	// Apply the calculated offset to every remaining broken slot of matching type.
	// Only fixes a slot if the name at the new position matches the expected name.
	async _applyRemapOffset() {
		const off = this._remapOffset
		if (!off) return
		const brokenIds = Object.entries(this._verifyResults)
			.filter(([, r]) => r.status === 'broken')
			.map(([id]) => Number(id))

		let fixed = 0
		for (const slotId of brokenIds) {
			const slot = this.presetSlots[slotId]
			if (!slot || slot.type !== off.type) continue
			let newSlot = null, newName = ''
			if (off.type === 'clip') {
				const nl = slot.layer + off.layerDelta, nc = slot.clip + off.clipDelta
				newName = await this._getClipName(nl, nc, slot.machine || 1, true)
				if (newName && newName === this._verifyResults[slotId].expected)
					newSlot = { ...slot, layer: nl, clip: nc, name: newName }
			} else if (off.type === 'column') {
				const nc = slot.column + off.columnDelta
				newName = await this._getColumnName(nc)
				if (newName && newName === this._verifyResults[slotId].expected)
					newSlot = { ...slot, column: nc, name: newName }
			} else if (off.type === 'group_column') {
				const ng = slot.group + off.groupDelta, nc = slot.column + off.columnDelta
				newName = await this._getGroupColumnName(ng, nc)
				if (newName && newName === this._verifyResults[slotId].expected)
					newSlot = { ...slot, group: ng, column: nc, name: newName }
			}
			if (newSlot) {
				this.presetSlots[slotId] = newSlot
				this._verifyResults[slotId] = { status: 'ok', expected: newSlot.name, actual: newSlot.name }
				fixed++
			}
		}
		if (fixed > 0) this._savePresetSlots()
		const stillBroken = Object.values(this._verifyResults).filter(r => r.status === 'broken').length
		this.log('info', `[verify] Offset applied: ${fixed} fixed, ${stillBroken} still broken`)
		if (stillBroken === 0) this._cancelVerifyMode()
		else this.checkFeedbacks('preset_slot', 'arena_control_slot')
	}

	// Builds OSC connect address for a slot's primary action
	_slotAddress(slot) {
		if (slot.type === 'clip')         return `/composition/layers/${slot.layer}/clips/${slot.clip}/connect`
		if (slot.type === 'column')       return `/composition/columns/${slot.column}/connect`
		if (slot.type === 'group_column') return `/composition/groups/${slot.group}/columns/${slot.column}/connect`
		return null
	}

	// 250ms blink for clip end-warning (preset_slot bgcolor only, ≤5s remaining)
	_startClipBlink() {
		if (this._clipBlinkTimer) return
		this._clipBlinkState = true
		this._clipBlinkTimer = setInterval(() => {
			if (this.oscState && this.oscState.anyLayerNearEnd(5)) {
				this._clipBlinkState = !this._clipBlinkState
				this.checkFeedbacks('preset_slot')
			} else {
				// Nothing needs blinking — stop timer, leave state true
				this._stopClipBlink()
			}
		}, 250)
	}

	_stopClipBlink() {
		if (this._clipBlinkTimer) { clearInterval(this._clipBlinkTimer); this._clipBlinkTimer = null }
		this._clipBlinkState = false
	}

	/** Debounce updatePresets() — coalesces rapid group/layer discoveries into one call */
	_schedulePresetsUpdate() {
		if (this._presetsUpdateTimer) return
		this._presetsUpdateTimer = setTimeout(() => {
			this._presetsUpdateTimer = null
			this.updatePresets()
		}, 1000)
	}

	// Start a 3-second quick-assign highlight on a slot
	_startQuickAssign(slotId) {
		// Cancel existing timer for this slot if any
		if (this._quickAssignTimers[slotId]) {
			clearTimeout(this._quickAssignTimers[slotId])
		}
		this._quickAssignSlots.add(slotId)
		this.checkFeedbacks('preset_slot')
		this._quickAssignTimers[slotId] = setTimeout(() => {
			this._quickAssignSlots.delete(slotId)
			delete this._quickAssignTimers[slotId]
			this.checkFeedbacks('preset_slot')
		}, QUICK_ASSIGN_TTL)
	}

	_cancelQuickAssign(slotId) {
		if (this._quickAssignTimers[slotId]) {
			clearTimeout(this._quickAssignTimers[slotId])
			delete this._quickAssignTimers[slotId]
		}
		this._quickAssignSlots.delete(slotId)
	}

	// ---------------------------------------------------------------------------
	// Slot helpers
	// ---------------------------------------------------------------------------

	async _assignSlot(slotId) {
		this.log('info', `Assigning slot ${slotId}`)
		const machine = this._lastSelectedMachine || 1
		const selection = this._machineSelections[machine]

		if (selection.type === 'clip') {
			const { layer, clip } = selection.clip
			if (layer == null || clip == null) { this.log('warn', 'No clip selected yet'); return }
			const name = await this._getClipName(layer, clip, machine, true)
			this.presetSlots[slotId] = { type: 'clip', layer, clip, name: name || `L${layer}C${clip}`, machine }
		} else if (selection.type === 'column') {
			const { column } = selection.column
			if (column == null) { this.log('warn', 'No column selected yet'); return }
			let name = await this._getColumnName(column, machine)
			if (!name || /^column\s*#?\s*\d+$/i.test(name.trim())) {
				const clipName = await this._getLongestClipNameInColumn(column, machine)
				name = clipName ? `C${column}\n(${truncLabel(clipName, 15)})` : `Col${column}`
			}
			this.presetSlots[slotId] = { type: 'column', column, name, machine }
		} else if (selection.type === 'group_column') {
			const { group, column } = selection.groupColumn
			if (group == null || column == null) { this.log('warn', 'No group column selected yet'); return }
			const name = await this._getGroupColumnName(group, column, machine)
			this.presetSlots[slotId] = { type: 'group_column', group, column, name: name || `G${group}C${column}`, machine }
		} else {
			this.log('warn', 'No Arena selection — select a clip or column first')
			return
		}

		this.log('info', `Slot ${slotId} = ${JSON.stringify(this.presetSlots[slotId])}`)
		this._savePresetSlots()
		if (this.presetSlots[slotId].type === 'clip' && this._thumbnailsEnabled()) await this._loadSlotThumbnail(slotId, null, true, true)

		// Auto-exit edit mode and quick-assign mode
		this.editMode = false
		this._stopEditBlink()
		this._cancelQuickAssign(slotId)
		this.setVariableValues({ arena_edit_mode: '0' })
		this.checkFeedbacks('preset_slot', 'preset_slot_edit')
	}

	async _getLongestClipNameInColumn(column, machine = 1) {
		const count = Math.max(1, Math.min(64, parseInt(this.config.osc_num_layers ?? 10) || 10))
		const rows = []
		// Limit the user-triggered scan to two layers (four requests) at a time.
		for (let start = 1; start <= count; start += 2) {
			const batch = await Promise.all([start, start + 1].filter((layer) => layer <= count).map(async (layer) => {
				const [name, duration] = await Promise.all([
					this._getClipName(layer, column, machine, true),
					this._queryFloat(`/composition/layers/${layer}/clips/${column}/transport/position/behaviour/duration`, machine),
				])
				return { name, duration: Number(duration) || 0 }
			}))
			rows.push(...batch)
		}
		return rows.filter((r) => r.name).sort((a, b) => b.duration - a.duration)[0]?.name || ''
	}

	_thumbnailKey(slot) {
		return slot?.type === 'clip' ? `${slot.machine || 1}:${slot.layer}:${slot.clip}` : null
	}

	_thumbnailLabel(label) {
		return String(label || '').replace(/[\r\n]+/g, ' ')
	}

	_truncateThumbnailLine(text, capacity) {
		const value = this._thumbnailLabel(text).trim()
		if (value.length <= capacity) return value
		return `${value.slice(0, Math.max(1, capacity - 3)).trimEnd()}...`
	}

	_extraActionThumbnailLabel(action) {
		const address = String(action?.address || '')
		let match = address.match(/\/layers\/(\d+)\/clips\/(\d+)\/connect$/)
		if (match) return `clip${match[1]}:${match[2]}`
		match = address.match(/\/groups\/(\d+)\/columns\/(\d+)\/connect$/)
		if (match) return `col:${match[1]}/${match[2]}`
		match = address.match(/\/columns\/(\d+)\/connect$/)
		if (match) return `col:${match[1]}`
		return this._thumbnailLabel(action?.label || address || '?')
	}

	_thumbnailButtonText(slot, label, width = 72) {
		// Companion 5 enforces a practical minimum glyph width even for size 7.
		// Keep each explicit row narrow enough that Companion never adds a third row.
		const capacity = Math.max(10, Math.floor(width / 4.8))
		const value = this._thumbnailLabel(label).trim()
		const extra = slot?.extraActions?.[0]
		if (extra) {
			return `${this._truncateThumbnailLine(value, capacity)}\n${this._truncateThumbnailLine(this._extraActionThumbnailLabel(extra), capacity)}`
		}
		if (value.length <= capacity) return value
		let split = value.lastIndexOf(' ', capacity)
		if (split < Math.floor(capacity * 0.55)) split = capacity
		const first = value.slice(0, split).trim()
		const rest = value.slice(split).trim()
		return `${first}\n${this._truncateThumbnailLine(rest, capacity)}`
	}

	_positionThumbnailText(text) {
		// Companion positions feedback text against the whole button and offers no
		// Y coordinate. A Braille blank is visible to its line layout but has no
		// painted pixels, so a single label gets one reserved row below it. Labels
		// that already use two rows are returned untouched and can never become three.
		return String(text).includes('\n') ? text : `${text}\n\u2800`
	}

	_isBlackThumbnail(encoded) {
		try {
			const png = PNG.sync.read(Buffer.from(encoded, 'base64'))
			for (let i = 0; i < png.data.length; i += 4) {
				if (png.data[i + 3] > 0 && (png.data[i] > 8 || png.data[i + 1] > 8 || png.data[i + 2] > 8)) return false
			}
			return true
		} catch {
			return false
		}
	}

	_thumbnailFrameHeight(width, height) {
		return Math.max(1, Math.min(height, Math.round(width * 9 / 16)))
	}

	_fetchClipThumbnail(host, port, layer, clip) {
		return fetchClipThumbnail(host, port, layer, clip)
	}

	async _loadSlotThumbnail(slotId, explicitSlot = null, notify = true, force = false) {
		this._thumbnailBlack ||= new Map()
		if (!this._thumbnailsEnabled()) {
			if (notify) this.log('info', '[thumbnail] Disabled in module settings')
			return false
		}
		const slot = explicitSlot || this.presetSlots[slotId]
		if (!slot || slot.type !== 'clip') {
			if (notify) this.log('warn', '[thumbnail] Select a preset slot assigned to a clip')
			return false
		}
		const key = this._thumbnailKey(slot)
		if (force) {
			const pending = this._thumbnailLoads.get(key)
			if (pending) await pending.catch(() => {})
			this._thumbnailBuffers.delete(key)
			this._thumbnailBlack.delete(key)
			for (const cacheKey of this._thumbnailRenderCache.keys()) {
				if (cacheKey.startsWith(`${key}:`)) this._thumbnailRenderCache.delete(cacheKey)
			}
		}
		if (this._thumbnailBuffers.has(key)) {
			if (!this._thumbnailBlack.has(key)) this._thumbnailBlack.set(key, this._isBlackThumbnail(this._thumbnailBuffers.get(key)))
			if (notify && slot.thumbnailHidden) {
				delete slot.thumbnailHidden
				this._savePresetSlots()
			}
			this.checkFeedbacks('preset_slot')
			return true
		}
		const machine = slot.machine || 1
		const host = machine === 2 ? this.targetHost2 : this.targetHost
		const port = machine === 2 ? this.config.restPort2 : this.config.restPort
		try {
			let load = this._thumbnailLoads.get(key)
			if (!load) {
				load = this._fetchClipThumbnail(host, port || 8080, slot.layer, slot.clip)
				this._thumbnailLoads.set(key, load)
			}
			const encoded = await load
			if (!encoded) throw new Error('empty thumbnail')
			// Keep the compact PNG. It is decoded and resized to the actual button
			// dimensions by the feedback callback, avoiding oversized config storage.
			this._thumbnailBuffers.set(key, encoded)
			this._thumbnailBlack.set(key, this._isBlackThumbnail(encoded))
			if (notify && slot.thumbnailHidden) {
				delete slot.thumbnailHidden
				this._savePresetSlots()
			}
			for (const cacheKey of this._thumbnailRenderCache.keys()) {
				if (cacheKey.startsWith(`${key}:`)) this._thumbnailRenderCache.delete(cacheKey)
			}
			this.checkFeedbacks('preset_slot')
			if (notify) this.log('info', `[thumbnail] Loaded M${machine} L${slot.layer}C${slot.clip}${slotId == null ? '' : ` for slot ${slotId}`}`)
			return true
		} catch (err) {
			if (notify) this.log('warn', `[thumbnail] Slot ${slotId}: ${err.message}`)
			return false
		} finally {
			this._thumbnailLoads.delete(key)
		}
	}

	async _thumbnailForButton(encoded, width, height) {
		const src = PNG.sync.read(Buffer.from(encoded, 'base64'))
		const frameHeight = this._thumbnailFrameHeight(width, height)
		// Companion 5 receives this as a dedicated, positioned image element.
		// The buffer therefore contains only the 16:9 frame, not the label area.
		const out = Buffer.alloc(width * frameHeight * 4)
		for (let i = 0; i < out.length; i += 4) out[i] = 255 // opaque black
		const scale = Math.max(width / src.width, frameHeight / src.height)
		const offsetX = (width - src.width * scale) / 2
		const offsetY = (frameHeight - src.height * scale) / 2
		for (let y = 0; y < frameHeight; y++) {
			const sy = Math.min(src.height - 1, Math.max(0, Math.floor((y - offsetY) / scale)))
			for (let x = 0; x < width; x++) {
				const sx = Math.min(src.width - 1, Math.max(0, Math.floor((x - offsetX) / scale)))
				const si = (sy * src.width + sx) * 4
				const di = (y * width + x) * 4
				out[di] = src.data[si + 3]
				out[di + 1] = src.data[si]
				out[di + 2] = src.data[si + 1]
				out[di + 3] = src.data[si + 2]
			}
		}
		return out.toString('base64')
	}

	_noParkingIcon(width, height) {
		const out = Buffer.alloc(width * height * 4)
		const cx = (width - 1) / 2, cy = (height - 1) / 2
		const radius = Math.max(3, Math.min(width, height) * 0.38)
		const border = Math.max(2, radius * 0.16)
		const line = Math.max(2, radius * 0.18)
		for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) {
			const dx = x - cx, dy = y - cy, d = Math.sqrt(dx * dx + dy * dy)
			const inCircle = d <= radius
			const red = inCircle && (d >= radius - border || Math.abs(dx - dy) <= line || Math.abs(dx + dy) <= line)
			const blue = inCircle && !red
			if (!red && !blue) continue
			const i = (y * width + x) * 4
			out[i] = 255
			out[i + 1] = red ? 230 : 15
			out[i + 2] = red ? 25 : 60
			out[i + 3] = red ? 25 : 150
		}
		return out.toString('base64')
	}

	_clearSlotAppearance(slotId) {
		const slot = this.presetSlots[slotId]
		if (!slot) return false
		delete slot.color
		slot.thumbnailHidden = true
		this._savePresetSlots()
		this.checkFeedbacks('preset_slot')
		return true
	}

	async _cachedThumbnailForButton(key, encoded, width, height) {
		const cacheKey = `${key}:${width}x${height}`
		if (this._thumbnailRenderCache.has(cacheKey)) return this._thumbnailRenderCache.get(cacheKey)
		const rendered = await this._thumbnailForButton(encoded, width, height)
		this._thumbnailRenderCache.set(cacheKey, rendered)
		return rendered
	}

	_machineBadge(imageBase64, width, height, machine) {
		if (!this.config.machine2_enabled) return imageBase64
		const buf = imageBase64 ? Buffer.from(imageBase64, 'base64') : Buffer.alloc(width * height * 4)
		if (buf.length !== width * height * 4) return imageBase64
		const scale = Math.max(1, Math.round(Math.min(width, height) / 36))
		const pattern = machine === 2 ? ['111', '001', '111', '100', '111'] : ['010', '110', '010', '010', '111']
		const badgeW = 5 * scale, badgeH = 7 * scale
		const left = Math.max(0, width - badgeW - scale)
		const top = scale
		const put = (x, y, a, r, g, b) => {
			if (x < 0 || y < 0 || x >= width || y >= height) return
			const i = (y * width + x) * 4
			buf[i] = a; buf[i + 1] = r; buf[i + 2] = g; buf[i + 3] = b
		}
		for (let y = 0; y < badgeH; y++) for (let x = 0; x < badgeW; x++) put(left + x, top + y, 210, 0, 0, 0)
		for (let py = 0; py < 5; py++) for (let px = 0; px < 3; px++) {
			if (pattern[py][px] !== '1') continue
			for (let sy = 0; sy < scale; sy++) for (let sx = 0; sx < scale; sx++) {
				put(left + scale + px * scale + sx, top + scale + py * scale + sy, 255, 255, 255, 255)
			}
		}
		return buf.toString('base64')
	}

	async _triggerSlot(slotId) {
		const slot = this.presetSlots[slotId]
		if (!slot) { this.log('debug', `Slot ${slotId} is empty`); return }
		if (slot.type === 'clip') {
			await this._sendOSC(`/composition/layers/${slot.layer}/clips/${slot.clip}/connect`, [{ type: 'i', value: 1 }], slot.machine || 1)
		} else if (slot.type === 'column') {
			await this._sendOSC(`/composition/columns/${slot.column}/connect`, [{ type: 'i', value: 1 }], slot.machine || 1)
		} else if (slot.type === 'group_column') {
			await this._sendOSC(`/composition/groups/${slot.group}/columns/${slot.column}/connect`, [{ type: 'i', value: 1 }], slot.machine || 1)
		}
		// Extra actions captured via the Control Panel's "add_action" tool — fire
		// alongside the primary trigger so one press calls several OSC commands
		if (slot.extraActions?.length) {
			for (const extra of slot.extraActions) {
				await this._sendOSC(extra.address, extra.args, extra.machine || slot.machine || 1)
			}
		}
		this.log('info', `Slot ${slotId} triggered: ${slot.name}`)
	}

	// ---------------------------------------------------------------------------
	// Actions
	// ---------------------------------------------------------------------------

	updateActions() {
		const send = (path, args) => this._sendOSC(path, args)

		this.setActionDefinitions({
			// ── Generic OSC ─────────────────────────────────────────────────────

			send_blank: {
				name: 'Send message without arguments',
				options: [{ type: 'textinput', label: 'OSC Path', id: 'path', default: '/osc/path', useVariables: true }],
				callback: async (action) => {
					const path = action.options.path ?? ''
					send(path, [])
				},
			},

			send_int: {
				name: 'Send integer',
				options: [
					{ type: 'textinput', label: 'OSC Path', id: 'path', default: '/osc/path', useVariables: true },
					{ type: 'textinput', label: 'Value', id: 'int', default: '1', regex: Regex.SIGNED_NUMBER, useVariables: true },
				],
				callback: async (action) => {
					const path = action.options.path ?? ''
					const val = action.options.int ?? ''
					send(path, [{ type: 'i', value: parseInt(val) }])
				},
			},

			send_float: {
				name: 'Send float',
				options: [
					{ type: 'textinput', label: 'OSC Path', id: 'path', default: '/osc/path', useVariables: true },
					{ type: 'textinput', label: 'Value', id: 'float', default: '1', regex: Regex.SIGNED_FLOAT, useVariables: true },
				],
				callback: async (action) => {
					const path = action.options.path ?? ''
					const val = action.options.float ?? ''
					send(path, [{ type: 'f', value: parseFloat(val) }])
				},
			},

			send_string: {
				name: 'Send string',
				options: [
					{ type: 'textinput', label: 'OSC Path', id: 'path', default: '/osc/path', useVariables: true },
					{ type: 'textinput', label: 'Value', id: 'string', default: 'text', useVariables: true },
				],
				callback: async (action) => {
					const path = action.options.path ?? ''
					const val = action.options.string ?? ''
					send(path, [{ type: 's', value: '' + val }])
				},
			},

			send_multiple: {
				name: 'Send message with multiple arguments',
				options: [
					{ type: 'textinput', label: 'OSC Path', id: 'path', default: '/osc/path', useVariables: true },
					{ type: 'textinput', label: 'Arguments', id: 'arguments', default: '1 "text" 2.5', useVariables: true, tooltip: 'Space-delimited numbers, booleans, or strings.' },
				],
				callback: async (action) => {
					const path = action.options.path ?? ''
					const argsStr = action.options.arguments ?? ''
					const args = Array.isArray(argsStr)
						? argsStr.filter((v) => ['string', 'boolean', 'number'].includes(typeof v)).map((v) =>
							typeof v === 'number' ? { type: 'f', value: v }
							: typeof v === 'string' ? { type: 's', value: v }
							: v ? { type: 'T' } : { type: 'F' })
						: parseArguments(argsStr).args
					send(path, args)
				},
			},

			send_boolean: {
				name: 'Send boolean',
				options: [
					{ type: 'static-text', label: 'Note', value: 'Non-standard, may only work with some receivers.', id: 'w' },
					{ type: 'textinput', label: 'OSC Path', id: 'path', default: '/osc/path', useVariables: true },
					{ type: 'checkbox', label: 'Value', id: 'value', default: false },
				],
				callback: async (action) => {
					const path = action.options.path ?? ''
					send(path, [{ type: action.options.value === true ? 'T' : 'F' }])
				},
			},

			send_blob: {
				name: 'Send blob',
				options: [
					{ type: 'static-text', label: 'Note', value: 'Non-standard, may only work with some receivers.', id: 'w' },
					{ type: 'textinput', label: 'OSC Path', id: 'path', default: '/osc/path', useVariables: true },
					{
						type: 'textinput', label: 'Blob Data (Base64)', id: 'blob', default: '', useVariables: true,
						isVisibleExpression: '$(options:hexswitch) === false',
					},
					{
						type: 'textinput', label: 'Blob Data (Hex)', id: 'blob_hex', default: '0A0B0C', useVariables: true,
						isVisibleExpression: '$(options:hexswitch) === true',
					},
					{ type: 'checkbox', label: 'Use Hex', id: 'hexswitch', default: false },
				],
				callback: async (action) => {
					const path = action.options.path ?? ''
					const raw64 = action.options.blob ?? ''
					const rawHex = action.options.blob_hex ?? ''
					const buf = action.options.hexswitch
						? Buffer.from(rawHex.replace(/[\s,]/g, ''), 'hex')
						: Buffer.from(raw64.replace(/[\s,]/g, ''), 'base64')
					if (!buf || buf.length === 0) { this.log('error', 'Invalid blob data'); return }
					send(path, [{ type: 'b', value: buf }])
				},
			},

			// ── Arena direct triggers ────────────────────────────────────────────

			arena_trigger_clip: {
				name: '[Arena] Trigger clip (layer + clip number)',
				options: [
					{ type: 'textinput', label: 'Layer number', id: 'layer', default: '1', regex: Regex.NUMBER, useVariables: true },
					{ type: 'textinput', label: 'Clip number', id: 'clip', default: '1', regex: Regex.NUMBER, useVariables: true },
				],
				callback: async (action) => {
					const layer = parseInt(action.options.layer ?? '')
					const clip = parseInt(action.options.clip ?? '')
					send(`/composition/layers/${layer}/clips/${clip}/connect`, [{ type: 'i', value: 1 }])
				},
			},

			arena_trigger_column: {
				name: '[Arena] Trigger column (by number)',
				options: [
					{ type: 'textinput', label: 'Column number', id: 'column', default: '1', regex: Regex.NUMBER, useVariables: true },
				],
				callback: async (action) => {
					const column = parseInt(action.options.column ?? '')
					send(`/composition/columns/${column}/connect`, [{ type: 'i', value: 1 }])
				},
			},

			arena_select_clip: {
				name: '[Arena] Select clip (focus, no trigger)',
				description: 'Selects (focuses) a clip in the Arena UI without triggering it.',
				options: [
					{ type: 'textinput', label: 'Layer number', id: 'layer', default: '1', regex: Regex.NUMBER, useVariables: true },
					{ type: 'textinput', label: 'Clip number', id: 'clip', default: '1', regex: Regex.NUMBER, useVariables: true },
				],
				callback: async (action) => {
					const layer = parseInt(action.options.layer ?? '')
					const clip = parseInt(action.options.clip ?? '')
					send(`/composition/layers/${layer}/clips/${clip}/select`, [{ type: 'i', value: 1 }])
				},
			},

			arena_select_column: {
				name: '[Arena] Select column (focus, no trigger)',
				description: 'Selects (focuses) a column in the Arena UI without triggering it.',
				options: [
					{ type: 'textinput', label: 'Column number', id: 'column', default: '1', regex: Regex.NUMBER, useVariables: true },
				],
				callback: async (action) => {
					const column = parseInt(action.options.column ?? '')
					send(`/composition/columns/${column}/select`, [{ type: 'i', value: 1 }])
				},
			},

			arena_clear_layer: {
				name: '[Arena] Clear layer',
				description: 'Clears the specified layer. Sends 1 then 0 after 100ms (momentary).',
				options: [
					{ type: 'textinput', label: 'Layer number', id: 'layer', default: '1', regex: Regex.NUMBER, useVariables: true },
				],
				callback: async (action) => {
					const layer = parseInt(action.options.layer ?? '')
					await this._sendOSC(`/composition/layers/${layer}/clear`, [{ type: 'i', value: 1 }])
					await new Promise((r) => setTimeout(r, 100))
					await this._sendOSC(`/composition/layers/${layer}/clear`, [{ type: 'i', value: 0 }])
				},
			},

			arena_layer_opacity: {
				name: '[Arena] Layer opacity',
				description: 'Sets the video opacity of a layer (0.0 = transparent, 1.0 = full).',
				options: [
					{ type: 'textinput', label: 'Layer number', id: 'layer', default: '1', regex: Regex.NUMBER, useVariables: true },
					{ type: 'textinput', label: 'Opacity (0.0 – 1.0)', id: 'opacity', default: '1', regex: Regex.SIGNED_FLOAT, useVariables: true },
				],
				callback: async (action) => {
					const layer = parseInt(action.options.layer ?? '')
					const opacity = Math.max(0, Math.min(1, parseFloat(action.options.opacity ?? '1')))
					send(`/composition/layers/${layer}/video/opacity`, [{ type: 'f', value: opacity }])
				},
			},

			arena_layer_bypass: {
				name: '[Arena] Layer bypass',
				description: 'Sets the bypass (mute) state of a layer.',
				options: [
					{ type: 'textinput', label: 'Layer number', id: 'layer', default: '1', regex: Regex.NUMBER, useVariables: true },
					{
						type: 'dropdown', label: 'Bypass', id: 'bypass', default: 'toggle',
						choices: [{ id: 'on', label: 'ON (bypass)' }, { id: 'off', label: 'OFF (active)' }, { id: 'toggle', label: 'Toggle' }],
					},
				],
				callback: async (action) => {
					const layer = parseInt(action.options.layer ?? '')
					const cur = this.arenaLayerState[layer]?.bypass ?? false
					const val = action.options.bypass === 'toggle' ? (cur ? 0 : 1) : (action.options.bypass === 'on' ? 1 : 0)
					send(`/composition/layers/${layer}/bypassed`, [{ type: 'i', value: val }])
				},
			},

			arena_master_opacity: {
				name: '[Arena] Master composition opacity',
				description: 'Sets the master video opacity of the composition (0.0 – 1.0).',
				options: [
					{ type: 'textinput', label: 'Opacity (0.0 – 1.0)', id: 'opacity', default: '1', regex: Regex.SIGNED_FLOAT, useVariables: true },
				],
				callback: async (action) => {
					const opacity = Math.max(0, Math.min(1, parseFloat(action.options.opacity ?? '1')))
					send('/composition/video/opacity', [{ type: 'f', value: opacity }])
				},
			},

			arena_bpm_set: {
				name: '[Arena] Set BPM',
				description: 'Sets the composition BPM/tempo. Normalized to the configured BPM range (Connection settings) unless "actual BPM value" mode is enabled.',
				options: [
					{ type: 'textinput', label: 'BPM', id: 'bpm', default: '120', regex: Regex.SIGNED_FLOAT, useVariables: true },
				],
				callback: async (action) => {
					const raw = String(action.options.bpm ?? '120').replace(',', '.')
					const bpm = parseFloat(raw)
					if (isNaN(bpm)) { this.log('warn', `[bpm] Invalid BPM value: "${raw}"`); return }
					send('/composition/tempocontroller/tempo', [{ type: 'f', value: this._bpmToOsc(bpm) }])
				},
			},

			arena_bpm_tap: {
				name: '[Arena] Tap tempo',
				description: 'Sends a tap tempo trigger to Arena.',
				options: [],
				callback: async () => {
					send('/composition/tempocontroller/tap', [])
				},
			},

			// ── Group columns ──────────────────────────────────────────────

			arena_trigger_group_column: {
				name: '[Arena] Trigger group column',
				description: 'Triggers (connects) a column within a group.',
				options: [
					{ type: 'textinput', label: 'Group number', id: 'group', default: '1', regex: Regex.NUMBER, useVariables: true },
					{ type: 'textinput', label: 'Column number', id: 'column', default: '1', regex: Regex.NUMBER, useVariables: true },
				],
				callback: async (action) => {
					const group = parseInt(action.options.group ?? '')
					const column = parseInt(action.options.column ?? '')
					send(`/composition/groups/${group}/columns/${column}/connect`, [{ type: 'i', value: 1 }])
				},
			},

			arena_select_group_column: {
				name: '[Arena] Select group column (focus, no trigger)',
				description: 'Selects (focuses) a column within a group without triggering it.',
				options: [
					{ type: 'textinput', label: 'Group number', id: 'group', default: '1', regex: Regex.NUMBER, useVariables: true },
					{ type: 'textinput', label: 'Column number', id: 'column', default: '1', regex: Regex.NUMBER, useVariables: true },
				],
				callback: async (action) => {
					const group = parseInt(action.options.group ?? '')
					const column = parseInt(action.options.column ?? '')
					send(`/composition/groups/${group}/columns/${column}/select`, [{ type: 'i', value: 1 }])
				},
			},

			// ── Absolute value setters ───────────────────────────────────────────

			arena_audio_volume_set: {
				name: '[Arena] Set audio volume',
				description: 'Sets audio volume to an absolute value. Smooth fade ramps over 400ms (16 steps).',
				options: [
					{ type: 'textinput', label: 'Volume (0.0–1.0)', id: 'volume', default: '1', regex: Regex.SIGNED_FLOAT, useVariables: true },
					{ type: 'checkbox', label: 'Smooth fade', id: 'fade', default: true },
				],
				callback: async (action) => {
					const target = Math.max(0, Math.min(1, parseFloat(action.options.volume ?? '1')))
					if (action.options.fade !== false) {
						this._smoothFadeTo('/composition/audio/volume', target)
					} else {
						this.arenaAudioVolume = target
						send('/composition/audio/volume', [{ type: 'f', value: target }])
						this.setVariableValues({ arena_audio_volume: target.toFixed(3) })
					}
				},
			},

			arena_speed_set: {
				name: '[Arena] Set composition speed',
				description: 'Sets composition speed immediately to an absolute value (0.0–1.0).',
				options: [
					{ type: 'textinput', label: 'Speed (0.0–1.0)', id: 'speed', default: '0.25', regex: Regex.SIGNED_FLOAT, useVariables: true },
				],
				callback: async (action) => {
					const target = Math.max(0, Math.min(1, parseFloat(action.options.speed ?? '0.25')))
					this.arenaSpeed = target
					send('/composition/speed', [{ type: 'f', value: target }])
					this.setVariableValues({ arena_speed: target.toFixed(3) })
				},
			},

			// ── Velocity encoders ────────────────────────────────────────────

			arena_audio_volume_nudge: {
				name: '[Arena] Audio volume — velocity nudge',
				description: 'Each press adjusts volume. Press faster for larger steps (velocity-sensitive). Supports rotary redirection from the Quick Control Panel.',
				options: [
					{
						type: 'dropdown', label: 'Direction', id: 'direction', default: 'up',
						choices: [{ id: 'up', label: 'Up (+)' }, { id: 'down', label: 'Down (-)' }],
					},
					{ type: 'number', label: 'Min step (slow press)', id: 'min_step', default: 0.005, min: 0.001, max: 0.5 },
					{ type: 'number', label: 'Max step (fast press)', id: 'max_step', default: 0.06, min: 0.001, max: 0.5 },
					{
						type: 'checkbox', id: 'menu_active_guard', default: true,
						label: 'Menu active guard — suppress this action while the Control Panel is open; redirect to its Volume/Master tool instead if one is armed',
					},
				],
				callback: async (action) => {
					const dir = action.options.direction ?? 'up'
					const minStep = Number(action.options.min_step ?? 0.005)
					const maxStep = Number(action.options.max_step ?? 0.06)
					// Menu-active guard: redirect to the armed panel parameter.
					// Master uses 0.5× steps for finer control; speed uses 0.7×.
					if (action.options.menu_active_guard !== false && this._controlPanelActive) {
						if (this._controlPanelRotaryTarget === 'volume') return this._nudgeAudioVolume(dir, minStep, maxStep)
						if (this._controlPanelRotaryTarget === 'master') return this._nudgeMasterOpacity(dir, minStep * 0.5, maxStep * 0.5)
						if (this._controlPanelRotaryTarget === 'speed')  return this._nudgeSpeed(dir, minStep * 0.7, maxStep * 0.7)
						return // menu open, no redirect target armed — swallow the press
					}
					await this._nudgeAudioVolume(dir, minStep, maxStep)
				},
			},

			arena_speed_nudge: {
				name: '[Arena] Composition speed — velocity nudge',
				description: 'Each press adjusts composition speed (0.0–1.0 float). Press faster for larger steps. Supports rotary redirection from the Quick Control Panel.',
				options: [
					{
						type: 'dropdown', label: 'Direction', id: 'direction', default: 'up',
						choices: [{ id: 'up', label: 'Up (+)' }, { id: 'down', label: 'Down (-)' }],
					},
					{ type: 'number', label: 'Min step (slow press)', id: 'min_step', default: 0.003, min: 0.001, max: 0.5 },
					{ type: 'number', label: 'Max step (fast press)', id: 'max_step', default: 0.08, min: 0.001, max: 0.5 },
					{
						type: 'checkbox', id: 'menu_active_guard', default: true,
						label: 'Menu active guard — suppress this action while the Control Panel is open; redirect to its Volume/Master tool instead if one is armed',
					},
				],
				callback: async (action) => {
					const dir = action.options.direction ?? 'up'
					const minStep = Number(action.options.min_step ?? 0.003)
					const maxStep = Number(action.options.max_step ?? 0.08)
					if (action.options.menu_active_guard !== false && this._controlPanelActive) {
						if (this._controlPanelRotaryTarget === 'volume') return this._nudgeAudioVolume(dir, minStep, maxStep)
						if (this._controlPanelRotaryTarget === 'master') return this._nudgeMasterOpacity(dir, minStep * 0.5, maxStep * 0.5)
						if (this._controlPanelRotaryTarget === 'speed')  return this._nudgeSpeed(dir, minStep * 0.7, maxStep * 0.7)
						return // menu open, no redirect target armed — swallow the press
					}
					await this._nudgeSpeed(dir, minStep, maxStep)
				},
			},

			arena_master_opacity_nudge: {
				name: '[Arena] Master opacity — velocity nudge',
				description: 'Each press adjusts master composition opacity. Press faster for larger steps. Supports rotary redirection from the Quick Control Panel.',
				options: [
					{
						type: 'dropdown', label: 'Direction', id: 'direction', default: 'up',
						choices: [{ id: 'up', label: 'Up (+)' }, { id: 'down', label: 'Down (-)' }],
					},
					{ type: 'number', label: 'Min step (slow press)', id: 'min_step', default: 0.005, min: 0.001, max: 0.5 },
					{ type: 'number', label: 'Max step (fast press)', id: 'max_step', default: 0.06, min: 0.001, max: 0.5 },
					{
						type: 'checkbox', id: 'menu_active_guard', default: true,
						label: 'Menu active guard — suppress this action while the Control Panel is open; redirect to its Volume/Master tool instead if one is armed',
					},
				],
				callback: async (action) => {
					const dir = action.options.direction ?? 'up'
					const minStep = Number(action.options.min_step ?? 0.005)
					const maxStep = Number(action.options.max_step ?? 0.06)
					if (action.options.menu_active_guard !== false && this._controlPanelActive) {
						if (this._controlPanelRotaryTarget === 'volume') return this._nudgeAudioVolume(dir, minStep, maxStep)
						if (this._controlPanelRotaryTarget === 'master') return this._nudgeMasterOpacity(dir, minStep * 0.5, maxStep * 0.5)
						if (this._controlPanelRotaryTarget === 'speed')  return this._nudgeSpeed(dir, minStep * 0.7, maxStep * 0.7)
						return // menu open, no redirect target armed — swallow the press
					}
					await this._nudgeMasterOpacity(dir, minStep, maxStep)
				},
			},

			arena_float_nudge: {
				name: 'OSC: Float nudge (any path)',
				description: 'Velocity-sensitive nudge for any OSC float parameter. Assign the "Up" variant to rotate_right and "Down" to rotate_left to turn any encoder into a controller for any Arena parameter (color, intensity, effect level…). The current value is tracked internally and queried from Arena on the first press.',
				options: [
					{ type: 'textinput', label: 'OSC Path', id: 'path', default: '/composition/video/opacity', useVariables: true },
					{
						type: 'dropdown', label: 'Direction', id: 'direction', default: 'up',
						choices: [{ id: 'up', label: 'Up (+)' }, { id: 'down', label: 'Down (-)' }],
					},
					{ type: 'number', label: 'Min step (slow)', id: 'min_step', default: 0.005, min: 0.001, max: 1.0, step: 0.001 },
					{ type: 'number', label: 'Max step (fast)', id: 'max_step', default: 0.05, min: 0.001, max: 1.0, step: 0.001 },
					{ type: 'number', label: 'Range min', id: 'range_min', default: 0, min: -10, max: 10, step: 0.001 },
					{ type: 'number', label: 'Range max', id: 'range_max', default: 1, min: -10, max: 10, step: 0.001 },
					{ type: 'checkbox', id: 'query_unknown', label: 'Query current value from Arena when unknown', default: true },
				],
				callback: async (action) => {
					const path = action.options.path ?? ''
					if (!path) return
					const dir = action.options.direction ?? 'up'
					const minStep = Number(action.options.min_step ?? 0.005)
					const maxStep = Number(action.options.max_step ?? 0.05)
					const rMin = Number(action.options.range_min ?? 0)
					const rMax = Number(action.options.range_max ?? 1)
					// Range-proportional step: narrow ranges get finer control automatically
					const rangeSize = Math.max(1e-4, rMax - rMin)
					const step = this._calcVelocityStep(`float_nudge_${path}_${dir}`, minStep, maxStep, rangeSize)

					if (this._floatNudgeValues[path] == null && action.options.query_unknown !== false) {
						const q = await this._queryFloat(path)
						if (q !== null) this._floatNudgeValues[path] = q
					}
					if (this._floatNudgeValues[path] == null) {
						this.log('warn', `[float-nudge] Unknown value for ${path} — Arena has not responded yet`)
						return
					}
					const newVal = Math.max(rMin, Math.min(rMax, this._floatNudgeValues[path] + (dir === 'up' ? step : -step)))
					this._floatNudgeValues[path] = newVal
					send(path, [{ type: 'f', value: newVal }])
				},
			},

			// ── Preset slots ─────────────────────────────────────────────────────

			preset_slot_trigger: {
				name: '[Arena] Preset slot — Trigger / Assign',
				description: 'Edit/delete mode ON → assign or delete. Slot empty → 3s quick-assign. Slot filled → trigger.',
				options: [
					{ type: 'number', label: 'Slot number', id: 'slot', default: 1, min: 1, max: 200 },
				],
				callback: async (action) => {
					const slotId = Number(action.options.slot ?? 1)

					// ── Move mode ─────────────────────────────────────────────────────
					if (this._moveMode) {
						if (this._moveConflict != null) return // handled by control panel

						if (this._moveSourceSlot == null) {
							// Phase 1: pick source — must be filled
							if (!this.presetSlots[slotId]) {
								this.log('warn', `[move] Slot ${slotId} is empty — pick a filled slot`)
								return
							}
							this._moveSourceSlot = slotId
							this.checkFeedbacks('preset_slot', 'arena_control_slot')
							this.log('info', `[move] Source: slot ${slotId} — now pick destination`)
							return
						}

						// Phase 2: pick destination
						const srcId = this._moveSourceSlot
						if (slotId === srcId) { this._cancelMoveMode(); return } // tap source again = cancel

						const srcSlot = this.presetSlots[srcId]
						if (!srcSlot) { this._cancelMoveMode(); return }

						if (!this.presetSlots[slotId]) {
							// Empty destination: move directly
							this.presetSlots[slotId] = srcSlot
							delete this.presetSlots[srcId]
							this._savePresetSlots()
							this.log('info', `[move] Slot ${srcId} → ${slotId}`)
							this._cancelMoveMode()
							this.checkFeedbacks('preset_slot')
						} else {
							// Destination filled: show conflict resolution on control panel
							this._moveConflict = { src: srcId, dest: slotId }
							this.checkFeedbacks('preset_slot', 'arena_control_slot')
							this.log('info', `[move] Conflict: slot ${slotId} filled — choose OVERWRITE or MERGE on panel`)
						}
						return
					}

					// ── Verify mode: pressing a broken slot enters remap ──────────────
					if (this._verifyMode && !this._verifyScanning) {
						const result = this._verifyResults[slotId]
						if (result?.status === 'broken') {
							this._remapSlot = slotId
							this.checkFeedbacks('preset_slot', 'arena_control_slot')
							this.log('info', `[verify] Remapping slot ${slotId} (${result.expected}) — select correct clip/column in Arena, then use panel`)
						}
						// All other slot presses ignored while in verify mode
						return
					}

					// Paint mode (Quick Control Panel): apply the armed color to this
					// filled slot instead of triggering / assigning it, then exit paint mode
					if (this._thumbnailMode) {
						await this._loadSlotThumbnail(slotId, null, true, true)
						this._thumbnailMode = false
						this.checkFeedbacks('arena_control_slot')
						return
					}
					if (this._clearAppearanceMode) {
						const cleared = this._clearSlotAppearance(slotId)
						this._clearAppearanceMode = false
						this.log(cleared ? 'info' : 'warn', cleared
							? `[control-panel] Slot ${slotId} appearance cleared`
							: `[control-panel] Slot ${slotId} is empty — nothing to clear`)
						this.checkFeedbacks('arena_control_slot')
						return
					}
					if (this._paintMode) {
						const slot = this.presetSlots[slotId]
						if (slot) {
							const [r, g, b] = this._paintPalette()[this._paintColorIndex]
							slot.color = this._rgb(r, g, b)
							slot.thumbnailHidden = true
							this._savePresetSlots()
							this.log('info', `[control-panel] Slot ${slotId} painted`)
						} else {
							this.log('warn', `[control-panel] Slot ${slotId} is empty — nothing to paint`)
						}
						this._paintMode = false
						this.checkFeedbacks('preset_slot', 'arena_control_slot')
						return
					}

					// Add-action mode: armed → enter review mode for the pressed slot
					if (this._addActionArmed) {
						const slot = this.presetSlots[slotId]
						this._addActionArmed = false
						if (!slot) {
							this.log('warn', `[action-mgr] Slot ${slotId} is empty`)
							this.checkFeedbacks('arena_control_slot')
							return
						}
						this._addActionReviewSlot = slotId
						this._startActionMgrBlink()
						this.log('info', `[action-mgr] Reviewing slot ${slotId}`)
						this.checkFeedbacks('arena_control_slot')
						return
					}

					// Delete mode: clear slot and exit delete mode
					if (this.deleteMode) {
						delete this.presetSlots[slotId]
						this._savePresetSlots()
						this.deleteMode = false
						this._stopDeleteBlink()
						this.setVariableValues({ arena_delete_mode: '0' })
						this.checkFeedbacks('preset_slot', 'preset_slot_delete')
						this.log('info', `Slot ${slotId} cleared via delete mode`)
						return
					}

					// Edit mode: assign slot
					if (this.editMode) {
						await this._assignSlot(slotId)
						return
					}

					// Quick-assign mode: slot was previously pressed (3s window) → assign now
					if (this._quickAssignSlots.has(slotId)) {
						await this._assignSlot(slotId)
						return
					}

					// Normal mode
					const slot = this.presetSlots[slotId]
					if (slot) {
						// Filled slot → trigger
						await this._triggerSlot(slotId)
					} else {
						// Empty slot → start 3s quick-assign window (amber glow)
						this._startQuickAssign(slotId)
					}
				},
			},

			preset_slot_edit_mode: {
				name: '[Arena] Preset slot — Toggle edit mode',
				description: 'While edit mode is active, pressing a slot assigns the current Arena selection.',
				options: [
					{
						type: 'dropdown', label: 'Action', id: 'action', default: 'toggle',
						choices: [{ id: 'toggle', label: 'Toggle' }, { id: 'on', label: 'Turn ON' }, { id: 'off', label: 'Turn OFF' }],
					},
				],
				callback: async (action) => {
					const act = action.options.action ?? 'toggle'
					this.editMode = act === 'toggle' ? !this.editMode : act === 'on'
					if (this.editMode) {
						// Entering edit mode — exit delete mode if active
						if (this.deleteMode) {
							this.deleteMode = false
							this._stopDeleteBlink()
							this.setVariableValues({ arena_delete_mode: '0' })
						}
						this._startEditBlink()
					} else {
						this._stopEditBlink()
					}
					this.setVariableValues({ arena_edit_mode: this.editMode ? '1' : '0' })
					this.checkFeedbacks('preset_slot', 'preset_slot_edit')
				},
			},

			preset_slot_delete_mode: {
				name: '[Arena] Preset slot — Toggle delete mode',
				description: 'While delete mode is active, pressing a slot clears it (red blink).',
				options: [
					{
						type: 'dropdown', label: 'Action', id: 'action', default: 'toggle',
						choices: [{ id: 'toggle', label: 'Toggle' }, { id: 'on', label: 'Turn ON' }, { id: 'off', label: 'Turn OFF' }],
					},
				],
				callback: async (action) => {
					const act = action.options.action ?? 'toggle'
					this.deleteMode = act === 'toggle' ? !this.deleteMode : act === 'on'
					if (this.deleteMode) {
						// Entering delete mode — exit edit mode if active
						if (this.editMode) {
							this.editMode = false
							this._stopEditBlink()
							this.setVariableValues({ arena_edit_mode: '0' })
						}
						this._startDeleteBlink()
					} else {
						this._stopDeleteBlink()
					}
					this.setVariableValues({ arena_delete_mode: this.deleteMode ? '1' : '0' })
					this.checkFeedbacks('preset_slot', 'preset_slot_delete')
				},
			},

			preset_slot_clear: {
				name: '[Arena] Preset slot — Clear',
				options: [
					{ type: 'number', label: 'Slot number', id: 'slot', default: 1, min: 1, max: 200 },
					{
						type: 'simple', label: 'Clear this slot now', id: 'clear_btn',
						text: 'Clear Slot',
					},
				],
				callback: async (action) => {
					const slotId = Number(action.options.slot ?? 1)
					delete this.presetSlots[slotId]
					this._savePresetSlots()
					this.checkFeedbacks('preset_slot', 'preset_slot_edit')
				},
			},

			// ── Autopilot ────────────────────────────────────────────────────────

			arena_autopilot_set: {
				name: '[Arena] Set clip autopilot from duration minus layer transition',
				description: 'Press 1: previews computed autopilot time on button. Press 2 (within 8s): sends to Arena. Computes clip_duration − transition − offset.',
				options: [
					{
						type: 'checkbox', label: 'Use specific layer / clip instead of last selected',
						id: 'customTarget', default: false,
					},
					{
						type: 'number', label: 'Layer', id: 'layer', default: 1, min: 1, max: 100,
					},
					{
						type: 'number', label: 'Clip', id: 'clip', default: 1, min: 1, max: 100,
					},
					{
						type: 'number', label: 'Extra offset (seconds, subtracted)', id: 'offset',
						default: 0, min: -60, max: 600,
					},
				],
				callback: async (action) => {
					const useCustom = !!action.options.customTarget
					const layer = useCustom ? Number(action.options.layer) : this.arenaSelectedClip?.layer
					const clip  = useCustom ? Number(action.options.clip)  : this.arenaSelectedClip?.clip
					if (!layer || !clip) {
						this.log('warn', 'arena_autopilot_set: no clip selected')
						return
					}

					// ── SECOND PRESS: pending matches → confirm & send to Arena ────────────────
					const pending = this._autopilotPending
					if (pending && pending.layer === layer && pending.clip === clip) {
						clearTimeout(pending.timer)
						this._autopilotPending = null
						const { durationSec, transitionSec, transitionSource, autopilotSec, offset } = pending
						// 1) Mode = 3 (Seconds)
						await this._sendOSC(
							`/composition/layers/${layer}/clips/${clip}/autopilot/duration`,
							[{ type: 'i', value: 3 }],
						)
						// 2) Seconds value (normalized 0–1 for /autopilot/seconds range)
						await this._sendOSC(
							`/composition/layers/${layer}/clips/${clip}/autopilot/seconds`,
							[{ type: 'f', value: autopilotSec / MAX_RANGE }],
						)
						this._autopilotCache[`${layer}:${clip}`] = { autopilotSec, transitionSec, durationSec }
						this.setVariableValues({
							arena_autopilot_last_layer:      String(layer),
							arena_autopilot_last_clip:       String(clip),
							arena_autopilot_last_duration:   durationSec.toFixed(2),
							arena_autopilot_last_transition: transitionSec.toFixed(2),
							arena_autopilot_last_value:      autopilotSec.toFixed(2),
						})
						this.checkFeedbacks('arena_autopilot_info')
						this.log('info', `autopilot CONFIRMED L${layer}C${clip}: ${durationSec.toFixed(2)}s − ${transitionSec.toFixed(2)}s [${transitionSource}] − ${offset}s = ${autopilotSec.toFixed(2)}s`)
						return
					}

					// ── FIRST PRESS: compute & show preview ──────────────────────────────
					const durationSec = this.oscState?.getLayerDurationSeconds(layer) ?? 0
					if (durationSec <= 0) {
						this.log('warn', `arena_autopilot_set: layer ${layer} has no known duration`)
						return
					}
					// Always query fresh — Arena only broadcasts on request, cache goes stale on UI change
					const rawQ = (await this._queryFloat(`/composition/layers/${layer}/transition/duration`)) ?? 0
					const transitionSec = Math.round(rawQ * 10 * 10) / 10  // 0-1 → 0-10s, round to 0.1
					this.arenaLayerTransition[layer] = transitionSec
					const transitionSource = 'live-query'
					this.log('debug', `transition/duration L${layer}: raw=${rawQ.toFixed(6)} ×10 = ${transitionSec.toFixed(1)}s`)
					const offset = Number(action.options.offset ?? 0)
					const autopilotSec = Math.max(0, durationSec - transitionSec - offset)

					this.log('info', `autopilot PREVIEW L${layer}C${clip}: clipDur=${durationSec.toFixed(2)}s, trans=${transitionSec.toFixed(2)}s [${transitionSource}], offset=${offset}s → ${autopilotSec.toFixed(2)}s — PRESS AGAIN TO CONFIRM`)

					// Cancel any previous pending (different target)
					if (this._autopilotPending?.timer) clearTimeout(this._autopilotPending.timer)

					const timer = setTimeout(() => {
						if (this._autopilotPending?.layer === layer && this._autopilotPending?.clip === clip) {
							this.log('debug', 'autopilot pending expired')
							this._autopilotPending = null
							this.checkFeedbacks('arena_autopilot_info')
						}
					}, 8000)

					this._autopilotPending = { layer, clip, durationSec, transitionSec, transitionSource, autopilotSec, offset, timer }
					this.checkFeedbacks('arena_autopilot_info')
				},
			},

			arena_layer_transition_set: {
				name: '[Arena] Set layer transition duration',
				description: 'Sets the transition duration (in seconds) for a layer.',
				options: [
					{ type: 'number', label: 'Layer', id: 'layer', default: 1, min: 1, max: 100 },
					{ type: 'number', label: 'Duration (seconds)', id: 'duration', default: 5, min: 0, max: 10 },
				],
				callback: async (action) => {
					const layer = Number(action.options.layer ?? 1)
					const duration = Number(action.options.duration ?? 5)
					// /transition/duration: Float 0.0-1.0, range 0.0-10.0s → send normalized
					const normalized = Math.min(1, Math.max(0, duration / 10))
					await this._sendOSC(
						`/composition/layers/${layer}/transition/duration`,
						[{ type: 'f', value: normalized }],
					)
					// Arena will echo back the value; handler will update arenaLayerTransition
					this.log('info', `Layer ${layer} transition set to ${duration}s (sent ${normalized.toFixed(4)})`)
				},
			},

			// ── Resolume Arena shortcuts install ────────────────────────────────

			arena_install_resolume_shortcuts: {
				name: '[Arena] Install Resolume Arena shortcuts file',
				description: 'Writes the ARENA-OSC.xml OSC shortcut preset to the Resolume Arena Presets/Shortcuts folder on this machine. OSC shortcuts define which paths Arena sends as output feedback.',
				options: [
					{
						type: 'textinput', label: 'Target folder (leave blank for default: %APPDATA%\\Resolume Arena)',
						id: 'folder', default: '',
					},
					{
						type: 'textinput', label: 'Filename',
						id: 'filename', default: 'ARENA-OSC.xml',
					},
				],
				callback: async (action) => {
					const fs = require('fs')
					const path = require('path')
					const os = require('os')

					// Resolve target folder — use option, fallback to config, fallback to default
					let baseFolder = String(action.options.folder || '%APPDATA%\\Resolume Arena').trim()
					// Expand Windows-style %ENV_VAR% placeholders
					baseFolder = baseFolder.replace(/%([^%]+)%/gi, (_, k) => process.env[k] || _)
					// Append Presets\Shortcuts subfolder automatically if base path is given
					const folder = baseFolder.endsWith('Shortcuts') || baseFolder.endsWith('Shortcuts/')
						? baseFolder
						: path.join(baseFolder, 'Presets', 'Shortcuts')
					const filename = String(action.options.filename || 'ARENA-OSC.xml').trim()

					try {
						if (!fs.existsSync(folder)) fs.mkdirSync(folder, { recursive: true })
						const destPath = path.join(folder, filename)
						fs.writeFileSync(destPath, _RESOLUME_SHORTCUTS_XML, 'utf-8')
						this.log('info', `Resolume shortcuts installed: ${destPath}`)
					} catch (err) {
						this.log('error', `Failed to install shortcuts: ${err.message}`)
					}
				},
			},

			// ── Loop-hold: loop-start / loop-fin ────────────────────────────────

			arena_loop_start: {
				name: '[Arena] Loop-start — hold autopilot loop',
				description: 'While active: 1 second before each clip cycle end, increments autopilot/loops by 1, deferring autopilot indefinitely. Press Loop-fin to stop.',
				options: [
					{ type: 'number', label: 'Watch layer', id: 'watch_layer', default: 1, min: 1, max: 100 },
					{ type: 'number', label: 'Watch clip',  id: 'watch_clip',  default: 1, min: 1, max: 500 },
				],
				callback: async (action) => {
					const watchLayer = Number(action.options.watch_layer ?? 1)
					const watchClip  = Number(action.options.watch_clip  ?? 1)
					const key = `${watchLayer}:${watchClip}`

					if (this._loopHoldWatchers[key]) {
						this.log('info', `[loop-start] L${watchLayer}/C${watchClip}: already active (use loop-fin to stop)`)
						return
					}

					// Query initial loops value once, then track locally to avoid
					// repeated OSC queries inside the hot 100ms interval
					const loopsPath = `/composition/layers/${watchLayer}/clips/${watchClip}/autopilot/loops`
					const initialRaw = await this._queryFloat(loopsPath).catch(() => null)
					const initialLoops = initialRaw != null ? Math.round(initialRaw) : 1

					const entry = { lastRemaining: null, bumpedThisCycle: false, loops: initialLoops }
					entry.timer = setInterval(() => {
						if (!this.oscState) return
						const remaining = this.oscState.getLayerRemainingSeconds(watchLayer)
						if (remaining == null || remaining < 0) return

						// Detect cycle reset: remaining jumped UP (clip looped back to start)
						if (entry.lastRemaining != null && remaining > entry.lastRemaining + 1.0) {
							entry.bumpedThisCycle = false
						}

						// Within 1s of end — bump loops once per cycle
						if (remaining <= 1.0 && remaining > 0 && !entry.bumpedThisCycle) {
							entry.bumpedThisCycle = true
							entry.loops++
							const next = entry.loops
							this._sendOSC(loopsPath, [{ type: 'i', value: next }]).catch((e) =>
								this.log('error', `[loop-start] send error: ${e.message}`)
							)
							this.log('info', `[loop-start] L${watchLayer}/C${watchClip}: rem=${remaining.toFixed(2)}s → loops=${next}`)
						}
						entry.lastRemaining = remaining
					}, 100)
					this._loopHoldWatchers[key] = entry
					this.log('info', `[loop-start] Armed L${watchLayer}/C${watchClip}, initial loops=${initialLoops}`)
				},
			},

			arena_loop_fin: {
				name: '[Arena] Loop-fin — release autopilot loop',
				description: 'Stops the Loop-start watcher. Autopilot will fire normally on the next cycle end.',
				options: [
					{ type: 'number', label: 'Watch layer', id: 'watch_layer', default: 1, min: 1, max: 100 },
					{ type: 'number', label: 'Watch clip',  id: 'watch_clip',  default: 1, min: 1, max: 500 },
				],
				callback: async (action) => {
					const watchLayer = Number(action.options.watch_layer ?? 1)
					const watchClip  = Number(action.options.watch_clip  ?? 1)
					const key = `${watchLayer}:${watchClip}`
					if (this._loopHoldWatchers[key]) {
						clearInterval(this._loopHoldWatchers[key].timer)
						delete this._loopHoldWatchers[key]
						this.log('info', `[loop-fin] L${watchLayer}/C${watchClip}: released, autopilot will fire next cycle`)
					} else {
						this.log('info', `[loop-fin] L${watchLayer}/C${watchClip}: no active watcher`)
					}
				},
			},

			// ── Diagnostics / network-friendly controls ─────────────────────────

			arena_toggle_progress_polling: {
				name: '[Arena] Toggle real-time progress polling',
				description: 'Enables/disables periodic clip position re-sync at runtime (mirrors the Connection setting). Useful to quickly reduce OSC traffic on sensitive networks.',
				options: [
					{
						type: 'dropdown', label: 'Mode', id: 'mode', default: 'toggle',
						choices: [{ id: 'toggle', label: 'Toggle' }, { id: 'on', label: 'Turn on' }, { id: 'off', label: 'Turn off' }],
					},
				],
				callback: async (action) => {
					const mode = action.options.mode ?? 'toggle'
					const current = this.getProgressPollingEnabled()
					const next = mode === 'on' ? true : mode === 'off' ? false : !current
					this._progressPollingOverride = next
					this.setVariableValues({ arena_progress_polling: next ? '1' : '0' })
					this.checkFeedbacks('arena_progress_polling_status')
					this.log('info', `[progress-polling] ${next ? 'enabled' : 'disabled'} (runtime override)`)
				},
			},

			arena_check_connection: {
				name: '[Arena] Check connection (ping)',
				description: 'Measures OSC round-trip latency and jitter to Arena using a lightweight query. Updates arena_ping_ms / arena_ping_jitter_ms.',
				options: [],
				callback: async () => {
					await this._doPing()
				},
			},

			// ── Quick Control Panel ──────────────────────────────────────────────

			arena_control_panel_activate: {
				name: '[Arena] Control Panel — Activate',
				description: 'Toggles the Quick Control Panel. While inactive, Control Panel slot buttons stay in "bypass". While active, 3 tabs of tools: Tab 1 — Paint / ACT MGR / Edit Mode / Del Mode; Tab 2 — Master / Vol / Speed rotary menus; Tab 3 — Ping / Poll Toggle / OSC Reconnect / Del All. Rotate encoder to switch tabs.',
				options: [
					{
						type: 'dropdown', label: 'Mode', id: 'mode', default: 'toggle',
						choices: [{ id: 'toggle', label: 'Toggle' }, { id: 'on', label: 'Turn on' }, { id: 'off', label: 'Turn off' }],
					},
				],
				callback: async (action) => {
					const mode = action.options.mode ?? 'toggle'
					const next = mode === 'on' ? true : mode === 'off' ? false : !this._controlPanelActive
					this._controlPanelActive = next
					this._controlPanelPage = 0
					if (!next) {
						if (this._massDeleteArmTimer) { clearTimeout(this._massDeleteArmTimer); this._massDeleteArmTimer = null }
						this._paintMode = false
						this._paintPickerActive = false
						this._thumbnailMode = false
						this._clearAppearanceMode = false
						this._massDeleteArmed = false
						this._addActionArmed = false
						this._addActionReviewSlot = null
						this._stopActionMgrBlink()
						this._controlPanelRotaryTarget = null
						if (this._moveMode) this._cancelMoveMode()
						if (this._verifyMode || this._verifyScanning) this._cancelVerifyMode()
					}
					this._syncControlPanelVars()
					this.checkFeedbacks('arena_control_slot')
					this.log('info', `[control-panel] ${next ? 'activated' : 'deactivated'}`)
				},
			},

			arena_control_slot_press: {
				name: '[Arena] Control Panel — Slot press',
				description: 'Bound to one of the Control Panel slot buttons (1..N). Does nothing while the panel is inactive ("bypass"). Slot count is set in Connection settings.',
				options: [
					{ type: 'number', label: 'Slot number', id: 'slot', default: 1, min: 1, max: 8 },
				],
				callback: async (action) => {
					if (!this._controlPanelActive) return // bypass — idle, no action
					const slot = Number(action.options.slot ?? 1)
					const count = this._controlSlotCount()

					// ── Move conflict resolution ───────────────────────────────────────
					// Slot 1 = OVERWRITE, Slot 2 = MERGE, Slot 3 / last = CANCEL
					if (this._moveConflict != null) {
						const { src, dest } = this._moveConflict
						if (slot === 1) {
							// OVERWRITE: replace destination data with source
							if (!this.presetSlots[src]) { this._cancelMoveMode(); return }
							this.presetSlots[dest] = this.presetSlots[src]
							delete this.presetSlots[src]
							this._savePresetSlots()
							this.log('info', `[move] OVERWRITE: slot ${src} → ${dest}`)
							this._cancelMoveMode()
							this.checkFeedbacks('preset_slot')
						} else if (slot === 2) {
							// MERGE: convert source primary action to extra, append to dest
							const srcSlot = this.presetSlots[src]
							const destSlot = this.presetSlots[dest]
							if (!srcSlot || !destSlot) { this._cancelMoveMode(); return }
							const srcAddress = this._slotAddress(srcSlot)
							if (srcAddress) {
								const merged = { address: srcAddress, args: [{ type: 'i', value: 1 }], label: srcSlot.name || `Slot${src}` }
								destSlot.extraActions = [...(destSlot.extraActions || []), merged, ...(srcSlot.extraActions || [])]
							}
							delete this.presetSlots[src]
							this._savePresetSlots()
							this.log('info', `[move] MERGE: slot ${src} merged into ${dest}`)
							this._cancelMoveMode()
							this.checkFeedbacks('preset_slot')
						} else {
							// CANCEL: back to source-picking with the same armed state
							this._moveConflict = null
							this._moveSourceSlot = null
							this.checkFeedbacks('preset_slot', 'arena_control_slot')
							this.log('info', '[move] Conflict cancelled — pick a new source')
						}
						return
					}

					// ── Verify remap panel ────────────────────────────────────────────
					// Slot 1 = SET HERE, Slot 2 = FIX ALL+offset, Slot 3 = SKIP, last = END
					if (this._remapSlot != null) {
						if (slot === 1) {
							const ok = await this._fixSlotToCurrentSelection(this._remapSlot)
							if (ok) this._remapSlot = null  // stay in remap if nothing was selected
							this.checkFeedbacks('preset_slot', 'arena_control_slot')
						} else if (slot === 2) {
							const savedId = this._remapSlot
							const ok = await this._fixSlotToCurrentSelection(savedId)
							this._remapSlot = null
							if (ok) await this._applyRemapOffset()
							else this.checkFeedbacks('preset_slot', 'arena_control_slot')
						} else if (slot === 3) {
							if (this._verifyResults[this._remapSlot]) this._verifyResults[this._remapSlot].status = 'ok'
							this._remapSlot = null
							const stillBroken = Object.values(this._verifyResults).filter(r => r.status === 'broken').length
							if (stillBroken === 0) this._cancelVerifyMode()
							else this.checkFeedbacks('preset_slot', 'arena_control_slot')
						} else {
							this._cancelVerifyMode()
						}
						return
					}

					// Color picker sub-mode: all non-Next slots are swatches
					if (this._paintPickerActive) {
						if (slot >= count) {
							this._paintPickerPage = (this._paintPickerPage + 1) % this._paintPickerPageCount(count)
							this.checkFeedbacks('arena_control_slot')
							return
						}
						const item = this._paintPickerItem(slot, count)
						if (item.type === 'clear') {
							this._clearAppearanceMode = true
							this._paintPickerActive = false
							this.log('info', '[paint] Clear appearance armed — press a preset slot')
							this.checkFeedbacks('arena_control_slot')
							return
						}
						if (item.type === 'thumbnail') {
							if (!this._thumbnailsEnabled()) return
							this._thumbnailMode = true
							this._paintPickerActive = false
							this.log('info', '[thumbnail] Armed — press a clip preset slot')
							this.checkFeedbacks('arena_control_slot')
							return
						}
						this._paintColorIndex = item.colorIndex
						this._paintMode = true
						this._paintPickerActive = false
						this.log('info', `[control-panel] Paint color #${item.colorIndex + 1}/${this._paintPalette().length} armed`)
						this.checkFeedbacks('arena_control_slot')
						return
					}

					// ── BUG FIX: armed guard ───────────────────────────────────────────
					// While armed (waiting for preset slot), ignore all panel slot presses
					// EXCEPT ACT MGR (which disarms) and NEXT ▶ (which also disarms).
					// Without this, pressing NEXT changes pages or pressing other tools
					// fires them unexpectedly, confusing the user.
					if (this._addActionArmed && this._addActionReviewSlot == null) {
						const tool = this._controlToolForSlot(slot)
						if (tool?.id === 'action_manager') {
							this._addActionArmed = false
							this.checkFeedbacks('arena_control_slot')
							this.log('info', '[action-mgr] Disarmed')
						} else if (slot >= count) {
							// NEXT ▶ while armed = disarm (not page-change)
							this._addActionArmed = false
							this.checkFeedbacks('arena_control_slot')
						}
						// all other panel slot presses ignored while armed
						return
					}

					// ── Add-action review mode ─────────────────────────────────────────
					// slot 1       = primary action (read-only)
					// slots 2..n-1 = extra actions (extraIdx = slot - 2)
					// slot count   = EXIT (only exit)
					if (this._addActionReviewSlot != null) {
						if (slot === count) {
							// EXIT — single press returns to normal panel, no auto-rearm
							this._addActionReviewSlot = null
							this._stopActionMgrBlink()
							this.checkFeedbacks('arena_control_slot', 'preset_slot')
							this.log('info', '[action-mgr] Review exited')
							return
						}
						if (slot > count || slot < 1) return
						if (slot === 1) return // primary action — read-only, nothing to do

						const reviewedSlot = this.presetSlots[this._addActionReviewSlot]
						if (!reviewedSlot) { this._addActionReviewSlot = null; this._stopActionMgrBlink(); this.checkFeedbacks('arena_control_slot'); return }

						const extraIdx = slot - 2
						const maxExtras = count - 2

						const extra = reviewedSlot.extraActions?.[extraIdx]
						if (extra) {
							// Filled — delete this extra action
							const removed = reviewedSlot.extraActions.splice(extraIdx, 1)[0]
							if (!reviewedSlot.extraActions.length) delete reviewedSlot.extraActions
							this._savePresetSlots()
							this.log('info', `[add-action] Slot ${this._addActionReviewSlot}: deleted '${removed.label}'`)
							this.checkFeedbacks('preset_slot', 'arena_control_slot')
						} else {
							// Empty — capture current Arena selection and append
							if ((reviewedSlot.extraActions?.length ?? 0) >= maxExtras) {
								this.log('warn', `[add-action] All ${maxExtras} extra-action slots filled; increase Number of control slots to add more`)
								return
							}
							const captured = this._captureCurrentSelectionAsAction()
							if (!captured) {
								this.log('warn', '[add-action] Nothing selected in Arena — select a clip/column first')
								return
							}
							reviewedSlot.extraActions = reviewedSlot.extraActions || []
							reviewedSlot.extraActions.push(captured)
							this._savePresetSlots()
							this.log('info', `[add-action] Slot ${this._addActionReviewSlot}: added '${captured.label}' (${reviewedSlot.extraActions.length}/${maxExtras})`)
							this.checkFeedbacks('preset_slot', 'arena_control_slot')
						}
						return
					}

					if (slot >= count) {
						const totalPages = ArenaOscInstance.CONTROL_PAGES.length
						this._controlPanelPage = (this._controlPanelPage + 1) % totalPages
						this.checkFeedbacks('arena_control_slot')
						return
					}
					const tool = this._controlToolForSlot(slot)
					if (tool) await this._runControlTool(tool)
				},
			},

			arena_control_slot_rotate: {
				name: '[Arena] Control Panel — Slot rotate',
				description: 'Add to rotate_left / rotate_right steps of a physical encoder. Behaviour: during Paint picker — scrolls color wheel; when Vol/Master/Speed is armed — controls that parameter; otherwise — scrolls between the 3 tool tabs. Bypass while panel is inactive.',
				options: [
					{ type: 'number', label: 'Slot number (matches the panel button)', id: 'slot', default: 1, min: 1, max: 8 },
					{
						type: 'dropdown', label: 'Direction', id: 'direction', default: 'right',
						choices: [{ id: 'right', label: 'Right (+)' }, { id: 'left', label: 'Left (-)' }],
					},
					{ type: 'number', label: 'Min step (slow)', id: 'min_step', default: 0.003, min: 0.001, max: 0.5 },
					{ type: 'number', label: 'Max step (fast)', id: 'max_step', default: 0.02, min: 0.001, max: 0.5 },
				],
				callback: async (action) => {
					if (!this._controlPanelActive) return // bypass
					const dir = action.options.direction === 'right' ? 'up' : 'down'
					const slot = Number(action.options.slot ?? 1)
					const minStep = Number(action.options.min_step ?? 0.003)
					const maxStep = Number(action.options.max_step ?? 0.02)

					// Paint picker: any rotation scrolls the color wheel
					if (this._paintPickerActive) {
						const count = this._controlSlotCount()
						const totalPages = this._paintPickerPageCount(count)
						this._paintPickerPage = dir === 'up'
							? (this._paintPickerPage + 1) % totalPages
							: (this._paintPickerPage - 1 + totalPages) % totalPages
						this.checkFeedbacks('arena_control_slot')
						return
					}

					// Armed rotary target: route to the armed parameter (from any slot).
					// Master uses 0.5× steps for finer control; speed uses 0.7×.
					if (this._controlPanelRotaryTarget === 'volume') return this._nudgeAudioVolume(dir, minStep, maxStep)
					if (this._controlPanelRotaryTarget === 'master') return this._nudgeMasterOpacity(dir, minStep * 0.5, maxStep * 0.5)
					if (this._controlPanelRotaryTarget === 'speed')  return this._nudgeSpeed(dir, minStep * 0.7, maxStep * 0.7)

					// Default: rotate scrolls between the 3 tabs
					const totalPages = ArenaOscInstance.CONTROL_PAGES.length
					this._controlPanelPage = dir === 'up'
						? (this._controlPanelPage + 1) % totalPages
						: (this._controlPanelPage - 1 + totalPages) % totalPages
					this.checkFeedbacks('arena_control_slot')
				},
			},
		})
	}

	// ---------------------------------------------------------------------------
	// Feedbacks
	// ---------------------------------------------------------------------------

	updateFeedbacks() {
		this.setFeedbackDefinitions({
			// ── Preset slot display (advanced — controls button look) ─────────────

			preset_slot: {
				type: 'advanced',
				name: '[Arena] Preset slot display',
				description: 'Shows clip/column name and color. Blinks orange (edit), red (delete), amber (quick-assign). Shows live progress bar when the assigned clip is playing.',
				affectedProperties: ['text', 'size', 'bgcolor', 'color', 'imageBuffer'],
				options: [
					{ type: 'number', label: 'Slot number', id: 'slot', default: 1, min: 1, max: 200 },
					{ type: 'colorpicker', label: 'Clip color', id: 'clip_color', default: this._rgb(0, 80, 200) },
					{ type: 'colorpicker', label: 'Column color', id: 'column_color', default: this._rgb(0, 160, 0) },
					{ type: 'colorpicker', label: 'Group Column color', id: 'group_column_color', default: this._rgb(0, 90, 0) },
					{ type: 'checkbox', label: 'Show progress bar when clip is playing', id: 'showProgressBar', default: true },
				],
				callback: async (feedback) => {
					const slotId = Number(feedback.options.slot ?? 1)
					const slot = this.presetSlots[slotId]

					// ── Move mode ─────────────────────────────────────────────────────
					if (this._moveMode) {
						const isSrc  = this._moveSourceSlot === slotId
						const isConflictSrc  = this._moveConflict?.src  === slotId
						const isConflictDest = this._moveConflict?.dest === slotId

						// Conflict resolution: source = cyan, dest = amber, others = dim
						if (this._moveConflict != null) {
							if (isConflictSrc)  return { text: slot?.name || String(slotId), bgcolor: this._rgb(0, 80, 120), color: this._rgb(180, 240, 255), size: '12' }
							if (isConflictDest) {
								const bg = this._moveBlinkState ? this._rgb(200, 140, 0) : this._rgb(80, 50, 0)
								return { text: slot?.name || String(slotId), bgcolor: bg, color: this._rgb(255, 255, 180), size: '12' }
							}
							return { text: slot ? (slot.name || String(slotId)) : String(slotId), bgcolor: this._rgb(20, 20, 20), color: this._rgb(60, 60, 60), size: '12' }
						}

						// Source chosen: source = solid cyan, others = green blink (filled) or dim green (empty)
						if (isSrc) {
							return { text: slot?.name || String(slotId), bgcolor: this._rgb(0, 140, 180), color: this._rgb(255, 255, 255), size: '12' }
						}
						if (slot) {
							const bg = this._moveBlinkState ? this._rgb(0, 170, 50) : this._rgb(0, 55, 15)
							return { text: slot.name || String(slotId), bgcolor: bg, color: this._rgb(200, 255, 200), size: '12' }
						}
						// Phase 1 (no source yet): empty slots dimly pulsed; phase 2: eligible destination
						const bg = this._moveSourceSlot != null
							? (this._moveBlinkState ? this._rgb(0, 80, 30) : this._rgb(10, 20, 10))
							: this._rgb(20, 20, 20)
						return { text: String(slotId), bgcolor: bg, color: this._rgb(60, 120, 60), size: '12' }
					}

					// ── Verify mode: broken = red blink, remap target = amber pulse ──
					if (this._verifyMode || this._verifyScanning) {
						const result = this._verifyResults[slotId]

						if (this._remapSlot === slotId) {
							const bg = this._verifyBlinkState ? this._rgb(200, 130, 0) : this._rgb(65, 40, 0)
							return { text: slot?.name || String(slotId), bgcolor: bg, color: this._rgb(255, 255, 200), size: '12' }
						}
						if (result?.status === 'broken') {
							const bg = this._verifyBlinkState ? this._rgb(210, 0, 0) : this._rgb(60, 0, 0)
							return { text: slot?.name || String(slotId), bgcolor: bg, color: this._rgb(255, 255, 255), size: '12' }
						}
						if (this._verifyScanning && !result) {
							// Scanning: not yet checked — dim grey
							return { text: slot ? (slot.name || String(slotId)) : String(slotId), bgcolor: this._rgb(30, 30, 30), color: this._rgb(80, 80, 80), size: '12' }
						}
						// 'ok' result or scan complete: fall through to normal display
					}

					// Delete mode — red blink on all slots
					if (this.deleteMode) {
						if (slot) {
							// Filled: blink between slot color and bright red
							const bg = this._deleteBlinkState ? this._rgb(220, 0, 0) : this._rgb(60, 0, 0)
							return { text: slot.name || '?', bgcolor: bg, color: this._rgb(255, 255, 255), size: '12' }
						} else {
							// Empty: dim red blink
							const bg = this._deleteBlinkState ? this._rgb(100, 0, 0) : this._rgb(20, 20, 20)
							return { text: String(slotId), bgcolor: bg, color: this._rgb(150, 80, 80), size: '12' }
						}
					}

					// Quick-assign mode for this slot — amber/orange solid glow
					if (this._quickAssignSlots.has(slotId)) {
					return { text: 'PRESS\nAGAIN', bgcolor: this._rgb(200, 90, 0), color: this._rgb(255, 255, 255), size: '12' }
					}

					// Action Manager review mode — blink the reviewed slot
					if (this._addActionReviewSlot === slotId) {
						const bg = this._actionMgrBlinkState ? this._rgb(0, 120, 180) : this._rgb(0, 40, 80)
						return { text: slot?.name || String(slotId), bgcolor: bg, color: this._rgb(200, 240, 255), size: '12' }
					}

					// Edit mode — orange blink
					if (this.editMode) {
						if (slot) {
							// Assigned in edit mode → blink between slot color and black
							const slotBaseColor = slot.color ?? (slot.type === 'clip' ? feedback.options.clip_color : feedback.options.column_color)
							const bg = this._editBlinkState ? slotBaseColor : this._rgb(0, 0, 0)
							return { text: slot.name || '?', bgcolor: bg, color: this._rgb(255, 255, 255), size: '12' }
						} else {
							// Empty in edit mode → blink orange / dark
							const bg = this._editBlinkState ? this._rgb(210, 90, 0) : this._rgb(20, 20, 20)
							return { text: String(slotId), bgcolor: bg, color: this._rgb(255, 255, 255), size: '12' }
						}
					}

					// Normal mode
					if (!slot) {
						return { text: String(slotId), bgcolor: this._rgb(25, 25, 25), color: this._rgb(90, 90, 90), size: '12' }
					}
					const bg = slot.color ?? (slot.type === 'clip' ? feedback.options.clip_color
						: slot.type === 'column' ? feedback.options.column_color
						: (feedback.options.group_column_color ?? this._rgb(150, 80, 0)))
					const label = slot.name || (slot.type === 'clip' ? `L${slot.layer}C${slot.clip}`
						: slot.type === 'column' ? `Col${slot.column}` : `G${slot.group}C${slot.column}`)
					const displayLabel = label
					const thumbnailKey = this._thumbnailKey(slot)
					const thumbnail = this._thumbnailBuffers.get(thumbnailKey)
					if (this._thumbnailsEnabled() && thumbnail && !slot.thumbnailHidden) {
						const w = feedback.image?.width || 72, h = feedback.image?.height || 72
						this._thumbnailBlack ||= new Map()
						if (!this._thumbnailBlack.has(thumbnailKey)) this._thumbnailBlack.set(thumbnailKey, this._isBlackThumbnail(thumbnail))
						if (this._thumbnailBlack.get(thumbnailKey)) {
							return {
								text: displayLabel,
								bgcolor: this._rgb(0, 0, 0), color: this._rgb(255, 255, 255), size: '12', alignment: 'center:center',
								imageBuffer: this._machineBadge(null, w, h, slot.machine || 1),
								imageBufferEncoding: { pixelFormat: 'ARGB' },
							}
						}
						let imageBuffer
						try { imageBuffer = await this._cachedThumbnailForButton(thumbnailKey, thumbnail, w, h) } catch {}
						const frameHeight = this._thumbnailFrameHeight(w, h)
						return {
							text: this._positionThumbnailText(this._thumbnailButtonText(slot, displayLabel, w)),
							bgcolor: this._rgb(0, 0, 0), color: this._rgb(255, 255, 255), size: '6', alignment: 'center:bottom',
							imageBuffer: this._machineBadge(imageBuffer, w, frameHeight, slot.machine || 1),
							imageBufferEncoding: { pixelFormat: 'ARGB' },
							imageBufferPosition: { x: 0, y: 0, width: w, height: frameHeight },
						}
					}

					// ── Live progress bar: show when this specific clip is playing ──────
					// Disabled for multi-action slots (extraActions) — there's no single
					// "active clip" concept once a slot fires several OSC triggers at once.
					const slotOscState = slot.machine === 2 ? this.oscState2 : this.oscState
					if (slot.type === 'clip' && feedback.options.showProgressBar !== false && slotOscState && !slot.extraActions?.length) {
						if (slotOscState.getActiveClipColumn(slot.layer) === slot.clip) {
							const remaining = slotOscState.getLayerRemainingSeconds(slot.layer)
							const duration = slotOscState.getLayerDurationSeconds(slot.layer)
							const progress = slotOscState.getLayerProgress(slot.layer)
							const pm = slotOscState.getLayerPlaymode(slot.layer)
							// Playmode symbols: 0=↻ Loop, 1=↔ Bounce, 2=⁑ Random, 3=▶ Once&Clear, 4=⏸ Once&Hold
							const pmSymbols = ['\u21bb', '\u2194', '\u2051', '\u25b6', '\u23f8']
							const symbol = pm >= 0 && pm < pmSymbols.length ? pmSymbols[pm] : ''

							// Allow up to 2 lines for name; truncate only if wider than 2 lines
							const dispLabel = truncLabel(displayLabel, 18)
							// Short name fits on 1 line — push timer to line 3 with blank line
							const timerSep = visWidth(dispLabel) <= 8 ? '\n\n' : '\n'
							let barColor, progressPercent, bgColor = bg
							if (pm === 0 || pm === 1) {
								// Loop / Bounce — solid green, full bar
								barColor = this._rgb(0, 200, 0)
								progressPercent = 100
							} else if (pm === 2) {
								// Random — bar blinks to indicate indeterminate position
								barColor = this._clipBlinkState ? this._rgb(0, 200, 0) : this._rgb(0, 60, 0)
								progressPercent = 100
							} else {
								// Once & Clear (3), Once & Hold (4), unknown (-1) — smooth progress
								progressPercent = Math.max(0, Math.min(100, (progress || 0) * 100))
								if (remaining <= 5 && remaining > 0) {
									barColor = this._rgb(220, 0, 0)  // solid red — no bar blink
									bgColor = this._clipBlinkState ? this._rgb(100, 0, 0) : bg  // bgcolor blinks
									this._startClipBlink()  // start blink timer lazily
								} else if (remaining <= 10) {
									barColor = this._rgb(220, 0, 0)
								} else if (remaining <= 30) {
									barColor = this._rgb(255, 140, 0)
								} else {
									barColor = this._rgb(0, 200, 0)
								}
							}
							const w = feedback.image?.width ?? 72
							const h = feedback.image?.height ?? 72
							const barH = Math.max(4, Math.round(h / 10))
							const textSize = h >= 120 ? '22' : h >= 90 ? '16' : '12'
							const barOptions = {
								width: w, height: h,
								colors: [{ size: 100, color: barColor, background: barColor, backgroundOpacity: 64 }],
								barLength: w - Math.round(w / 14), barWidth: barH, value: progressPercent,
								type: 'horizontal', offsetX: Math.round(w / 14),
								offsetY: h - barH - 2,
								opacity: 255,
							}

							// Icon placed AFTER the countdown: "00:00 ↻"
							const timePart = duration > 0
								? (pm === 0 || pm === 1 ? '\u221e' : slotOscState.secondsToTimecode(remaining))
								: ''
							const line2 = timePart && symbol ? `${timePart} ${symbol}`
								: timePart ? timePart : symbol
							const barImage = graphics.bar(barOptions).toString('base64')
							return {
								text: line2 ? `${dispLabel}${timerSep}${line2}` : dispLabel,
								bgcolor: bgColor, color: this._rgb(255, 255, 255), size: textSize,
								imageBuffer: this._machineBadge(barImage, w, h, slot.machine || 1),
								imageBufferEncoding: { pixelFormat: 'ARGB' },
							}
						}
					}

					// Multi-action slot: line 1 = original name, lines 2-4 = each extra
					// OSC trigger's short label (up to 3), no progress bar
					if (slot.extraActions?.length) {
						const lines = [displayLabel, ...slot.extraActions.slice(0, 3).map((a) => `${a.label || a.address}${this.config.machine2_enabled ? (a.machine === 2 ? '²' : '¹') : ''}`)]
						const w = feedback.image?.width || 72, h = feedback.image?.height || 72
						return { text: lines.join('\n'), bgcolor: bg, color: this._rgb(255, 255, 255), size: '12', imageBuffer: this._machineBadge(null, w, h, slot.machine || 1), imageBufferEncoding: { pixelFormat: 'ARGB' } }
					}

					const w = feedback.image?.width || 72, h = feedback.image?.height || 72
					return { text: displayLabel, bgcolor: bg, color: this._rgb(255, 255, 255), size: '12', imageBuffer: this._machineBadge(null, w, h, slot.machine || 1), imageBufferEncoding: { pixelFormat: 'ARGB' } }
				},
			},

			// ── Edit mode indicator ───────────────────────────────────────────────

			preset_slot_edit: {
				type: 'boolean',
				name: '[Arena] Edit mode active',
				description: 'True while edit mode is ON.',
				options: [],
				defaultStyle: { bgcolor: this._rgb(210, 90, 0), color: this._rgb(255, 255, 255) },
				callback: () => this.editMode,
			},

			preset_slot_delete: {
				type: 'boolean',
				name: '[Arena] Delete mode active',
				description: 'True while delete mode is ON.',
				options: [],
				defaultStyle: { bgcolor: this._rgb(200, 0, 0), color: this._rgb(255, 255, 255) },
				callback: () => this.deleteMode,
			},

			// ── Last Arena select type ────────────────────────────────────────────

			arena_last_select_type: {
				type: 'boolean',
				name: '[Arena] Last selection type',
				description: 'True when last Arena selection matches the configured type.',
				options: [
					{
						type: 'dropdown', label: 'Type', id: 'type', default: 'clip',
						choices: [{ id: 'clip', label: 'Clip' }, { id: 'column', label: 'Column' }, { id: 'group_column', label: 'Group Column' }],
					},
				],
				defaultStyle: { bgcolor: this._rgb(0, 80, 200), color: this._rgb(255, 255, 255) },
				callback: (feedback) => this.arenaLastSelectType === feedback.options.type,
			},

			// ── Arena live feedbacks ─────────────────────────────────────────────

			arena_bpm_value: {
				type: 'boolean',
				name: '[Arena] BPM value',
				description: 'True when Arena BPM matches the comparison.',
				options: [
					{ type: 'textinput', label: 'BPM', id: 'bpm', default: '120', regex: Regex.SIGNED_FLOAT, useVariables: true },
					{
						id: 'comparison', type: 'dropdown', label: 'Comparison', default: 'equal',
						choices: [
							{ id: 'equal', label: '=' }, { id: 'greaterthan', label: '>' }, { id: 'lessthan', label: '<' },
							{ id: 'greaterthanequal', label: '>=' }, { id: 'lessthanequal', label: '<=' }, { id: 'notequal', label: '!=' },
						],
					},
				],
				defaultStyle: { bgcolor: this._rgb(100, 0, 150), color: this._rgb(255, 255, 255) },
				callback: async (fb) => {
					if (this.arenaBpm === null) return false
					const target = parseFloat(fb.options.bpm ?? '120')
					if (isNaN(target)) return false
					return evaluateComparison(this.arenaBpm, target, fb.options.comparison)
				},
			},

			arena_progress_polling_status: {
				type: 'boolean',
				name: '[Arena] Progress polling status',
				description: 'True while real-time clip progress polling is active.',
				options: [],
				defaultStyle: { bgcolor: this._rgb(0, 120, 60), color: this._rgb(255, 255, 255) },
				callback: () => this.getProgressPollingEnabled(),
			},

			user_var: {
				type: 'boolean',
				name: '[Arena] User variable state',
				description: 'True when the selected user variable is ON. Bind to any button to use as a custom indicator.',
				options: [
					{
						type: 'dropdown', id: 'var', label: 'Variable', default: '1',
						choices: [{ id: '1', label: 'User var 1' }, { id: '2', label: 'User var 2' }],
					},
				],
				defaultStyle: { bgcolor: this._rgb(0, 130, 60), color: this._rgb(255, 255, 255) },
				callback: (fb) => fb.options.var === '2' ? this._userVar2 : this._userVar1,
			},

			arena_ping_status: {
				type: 'advanced',
				name: '[Arena] Connection check (ping) status',
				description: 'Colors by last measured OSC round-trip time. Run "[Arena] Check connection (ping)" to update.',
				affectedProperties: ['text', 'bgcolor', 'color'],
				options: [
					{ id: 'goodMs', type: 'textinput', label: 'Good under (ms)', default: '50' },
					{ id: 'warnMs', type: 'textinput', label: 'Warning under (ms)', default: '150' },
				],
				callback: (feedback) => {
					const rtt = this._pingHistory.length ? this._pingHistory[this._pingHistory.length - 1] : null
					if (rtt === null) return { bgcolor: this._rgb(80, 80, 80), text: 'PING\n—' }
					const good = parseFloat(feedback.options.goodMs) || 50
					const warn = parseFloat(feedback.options.warnMs) || 150
					const bgcolor = rtt <= good ? this._rgb(0, 150, 0) : rtt <= warn ? this._rgb(200, 150, 0) : this._rgb(180, 0, 0)
					return { bgcolor, color: this._rgb(255, 255, 255), text: `PING\n${rtt}ms` }
				},
			},

			arena_control_slot: {
				type: 'advanced',
				name: '[Arena] Control Panel — Slot display',
				description: 'While the Quick Control Panel is inactive, this returns no override (stays in "bypass" — free to show anything else). While active, shows the current tool page, or — during Paint — a color-wheel swatch.',
				affectedProperties: ['text', 'bgcolor', 'color'],
				options: [
					{ type: 'number', label: 'Slot number', id: 'slot', default: 1, min: 1, max: 8 },
				],
				callback: (feedback) => {
					if (!this._controlPanelActive) return {} // bypass — no override, idle
					const slot = Number(feedback.options.slot ?? 1)
					const count = this._controlSlotCount()

					// Color picker sub-mode
					if (this._paintPickerActive) {
						if (slot >= count) {
							return { text: 'NEXT\n▶', bgcolor: this._rgb(40, 40, 40), color: this._rgb(255, 255, 255) }
						}
						const item = this._paintPickerItem(slot, count)
						if (item.type === 'clear') {
							const w = feedback.image?.width || 72, h = feedback.image?.height || 72
							return { text: '', bgcolor: this._rgb(20, 35, 75), imageBuffer: this._noParkingIcon(w, h), imageBufferEncoding: { pixelFormat: 'ARGB' } }
						}
						if (item.type === 'thumbnail') return { text: 'THUMB', bgcolor: this._thumbnailsEnabled() ? this._rgb(25, 70, 100) : this._rgb(35, 35, 35), color: this._rgb(255, 255, 255) }
						const [r, g, b] = item.color
						return { text: '', bgcolor: this._rgb(r, g, b) }
					}

					// Add-action review mode feedback:
					// slot 1       = primary (blue, read-only)
					// slots 2..n-1 = extra actions (extraIdx = slot - 2)
					// slot count   = EXIT
					if (this._addActionReviewSlot != null) {
						const reviewedSlot = this.presetSlots[this._addActionReviewSlot]

						// Last slot = EXIT
						if (slot === count) {
							return { text: '← EXIT', bgcolor: this._rgb(60, 0, 70), color: this._rgb(255, 180, 255) }
						}
						if (slot > count) {
							return { text: 'NEXT\n▶', bgcolor: this._rgb(40, 40, 40), color: this._rgb(255, 255, 255) }
						}

						// Slot 1: primary action (read-only)
						if (slot === 1) {
							if (!reviewedSlot) return { text: '—', bgcolor: this._rgb(30, 30, 30), color: this._rgb(100, 100, 100) }
							const typeTag = reviewedSlot.type === 'clip' ? `L${reviewedSlot.layer}/C${reviewedSlot.clip}`
								: reviewedSlot.type === 'column' ? `Col${reviewedSlot.column}`
								: `G${reviewedSlot.group}/C${reviewedSlot.column}`
							return { text: `${typeTag}\n${reviewedSlot.name || '?'}`, bgcolor: this._rgb(0, 50, 110), color: this._rgb(180, 220, 255) }
						}

						// Extra action slots (2..count-1)
						const extraIdx = slot - 2
						const extra = reviewedSlot?.extraActions?.[extraIdx]
						if (extra) {
							const addrShort = extra.address.split('/').slice(-2).join('/')
							return { text: `${extra.label}\n${addrShort}`, bgcolor: this._rgb(130, 40, 0), color: this._rgb(255, 220, 180) }
						}
						return { text: `+${extraIdx + 1}\nADD`, bgcolor: this._rgb(0, 65, 25), color: this._rgb(140, 255, 140) }
					}

					// ── Move mode conflict resolution ─────────────────────────────────────
					// Slot 1 = OVERWRITE, Slot 2 = MERGE, Slot 3+ or last = CANCEL
					if (this._moveConflict != null) {
						const { src, dest } = this._moveConflict
						const srcSlot  = this.presetSlots[src]
						const destSlot = this.presetSlots[dest]
						if (slot === 1) return { text: `OVER\nWRITE\n↓${dest}`, bgcolor: this._rgb(160, 40, 0), color: this._rgb(255, 220, 180) }
						if (slot === 2) return { text: `MERGE\n→${dest}`, bgcolor: this._rgb(0, 60, 140), color: this._rgb(180, 220, 255) }
						if (slot >= count) return { text: 'CANCEL\n✕', bgcolor: this._rgb(50, 50, 50), color: this._rgb(200, 200, 200) }
						if (slot === 3) return { text: srcSlot?.name  ? `FROM\n${srcSlot.name}`  : `FROM\n#${src}`,  bgcolor: this._rgb(0, 80, 120), color: this._rgb(180, 240, 255) }
						if (slot === 4) return { text: destSlot?.name ? `INTO\n${destSlot.name}` : `INTO\n#${dest}`, bgcolor: this._rgb(80, 50, 0),  color: this._rgb(255, 220, 130) }
						return { text: '—', bgcolor: this._rgb(20, 20, 20), color: this._rgb(60, 60, 60) }
					}

					// ── Verify remap panel ────────────────────────────────────────────────
					// Slot 1 = SET HERE, Slot 2 = FIX ALL+offset, Slot 3 = SKIP, last = END
					if (this._remapSlot != null) {
						const rSlot = this.presetSlots[this._remapSlot]
						// Build live offset label from current Arena selection
						let offsetLabel = ''
						if (rSlot && this.arenaLastSelectType) {
							if (rSlot.type === 'clip' && this.arenaLastSelectType === 'clip' && this.arenaSelectedClip.layer != null) {
								const dL = this.arenaSelectedClip.layer - rSlot.layer
								const dC = this.arenaSelectedClip.clip - rSlot.clip
								offsetLabel = (dL !== 0 ? `L${dL >= 0 ? '+' : ''}${dL}` : '') + (dC !== 0 ? ` C${dC >= 0 ? '+' : ''}${dC}` : '')
							} else if (rSlot.type === 'column' && this.arenaLastSelectType === 'column' && this.arenaSelectedColumn.column != null) {
								const dC = this.arenaSelectedColumn.column - rSlot.column
								offsetLabel = dC !== 0 ? `${dC >= 0 ? '+' : ''}${dC} col` : '=0'
							} else if (rSlot.type === 'group_column' && this.arenaLastSelectType === 'group_column' && this.arenaSelectedGroupColumn.group != null) {
								const dC = this.arenaSelectedGroupColumn.column - rSlot.column
								offsetLabel = dC !== 0 ? `${dC >= 0 ? '+' : ''}${dC} col` : '=0'
							}
						}
						const hasOffset = offsetLabel.trim() !== '' && offsetLabel !== '=0'
						const brokenCount = Object.values(this._verifyResults).filter(r => r.status === 'broken').length
						if (slot === 1) return { text: 'SET\nHERE', bgcolor: this.arenaLastSelectType ? this._rgb(0, 140, 50) : this._rgb(40, 70, 40), color: this._rgb(255, 255, 255) }
						if (slot === 2) return { text: hasOffset ? `FIX ALL\n${offsetLabel.trim()}` : 'FIX ALL\n(select)', bgcolor: hasOffset ? this._rgb(0, 70, 180) : this._rgb(40, 40, 70), color: this._rgb(255, 255, 255) }
						if (slot === 3) return { text: 'SKIP', bgcolor: this._rgb(60, 60, 60), color: this._rgb(200, 200, 200) }
						if (slot >= count) return { text: 'END\nVERIFY', bgcolor: this._rgb(50, 50, 50), color: this._rgb(200, 200, 200) }
						if (slot === 4) return { text: `⚠ ${brokenCount}\nBROKEN`, bgcolor: this._rgb(80, 30, 0), color: this._rgb(255, 200, 100) }
						return { text: '—', bgcolor: this._rgb(20, 20, 20), color: this._rgb(60, 60, 60) }
					}

					if (slot >= count) {
						const tab = (this._controlPanelPage % ArenaOscInstance.CONTROL_PAGES.length) + 1
						const total = ArenaOscInstance.CONTROL_PAGES.length
						return { text: `${tab}/${total}\n▶`, bgcolor: this._rgb(40, 40, 40), color: this._rgb(200, 200, 200) }
					}
					const tool = this._controlToolForSlot(slot)
					if (!tool) return { text: '—', bgcolor: this._rgb(20, 20, 20), color: this._rgb(90, 90, 90) }
					if (tool.id === 'move') {
						const armed = this._moveMode
						return { text: armed ? 'MOVE\nARMED' : tool.label, bgcolor: armed ? this._rgb(0, 130, 60) : this._rgb(40, 60, 40), color: this._rgb(255, 255, 255) }
					}
					if (tool.id === 'verify') {
						if (this._verifyScanning) return { text: 'SCAN…\n▶', bgcolor: this._rgb(160, 110, 0), color: this._rgb(255, 255, 200) }
						if (this._verifyMode) {
							const broken = Object.values(this._verifyResults).filter(r => r.status === 'broken').length
							return { text: `VERIFY\n⚠ ${broken}`, bgcolor: this._rgb(150, 50, 0), color: this._rgb(255, 200, 150) }
						}
						return { text: tool.label, bgcolor: this._rgb(30, 60, 30), color: this._rgb(180, 255, 180) }
					}
					if (tool.id === 'auto_verify') {
						const enabled = this.config.auto_verify_enabled === true
						return {
							text: enabled ? 'AUTO VERIFY\nON' : 'AUTO VERIFY\nOFF',
							bgcolor: enabled ? this._rgb(0, 105, 45) : this._rgb(55, 55, 55),
							color: this._rgb(255, 255, 255),
						}
					}
					if (tool.id === 'user_var_1' || tool.id === 'user_var_2') {
						const isVar2 = tool.id === 'user_var_2'
						const val = isVar2 ? this._userVar2 : this._userVar1
						const label = isVar2
							? (this.config.user_var_2_name || 'v=2')
							: (this.config.user_var_1_name || 'v=1')
						return {
							text: `${label}\n${val ? 'is true' : 'is false'}`,
							bgcolor: val ? this._rgb(0, 130, 50) : this._rgb(50, 50, 50),
							color: this._rgb(255, 255, 255),
						}
					}
					if (tool.id === 'paint') {
						if (this._thumbnailMode) return { text: 'THUMB\nREADY', bgcolor: this._rgb(0, 80, 130), color: this._rgb(255, 255, 255) }
						if (this._clearAppearanceMode) return { text: 'CLEAR\nREADY', bgcolor: this._rgb(110, 45, 10), color: this._rgb(255, 230, 190) }
						if (this._paintMode) {
							const [r, g, b] = this._paintPalette()[this._paintColorIndex]
							return { text: 'PAINT\nREADY', bgcolor: this._rgb(r, g, b), color: this._rgb(255, 255, 255) }
						}
						return { text: tool.label, bgcolor: this._rgb(60, 60, 60), color: this._rgb(255, 255, 255) }
					}
					if (tool.id === 'thumb_toggle') {
						const enabled = this._thumbnailsEnabled()
						return { text: enabled ? 'THUMB\nON' : 'THUMB\nOFF', bgcolor: enabled ? this._rgb(0, 100, 50) : this._rgb(70, 25, 25), color: this._rgb(255, 255, 255) }
					}
					if (tool.id === 'mass_delete') {
						return {
							text: this._massDeleteArmed ? 'CONFIRM\nDEL ALL' : tool.label,
							bgcolor: this._massDeleteArmed ? this._rgb(200, 0, 0) : this._rgb(60, 0, 0),
							color: this._rgb(255, 255, 255),
						}
					}
					if (tool.id === 'poll_toggle') {
						return {
							text: tool.label,
							bgcolor: this.getProgressPollingEnabled() ? this._rgb(0, 100, 50) : this._rgb(60, 60, 60),
							color: this._rgb(255, 255, 255),
						}
					}
					if (tool.id === 'edit_mode') {
						return {
							text: tool.label,
							bgcolor: this.editMode ? this._rgb(210, 90, 0) : this._rgb(60, 60, 60),
							color: this._rgb(255, 255, 255),
						}
					}
					if (tool.id === 'delete_mode') {
						return {
							text: tool.label,
							bgcolor: this.deleteMode ? this._rgb(200, 0, 0) : this._rgb(60, 60, 60),
							color: this._rgb(255, 255, 255),
						}
					}
					if (tool.id === 'action_manager') {
						const inReview = this._addActionReviewSlot != null
						return {
							text: inReview ? `SLOT ${this._addActionReviewSlot}` : this._addActionArmed ? 'PICK\nSLOT' : tool.label,
							bgcolor: inReview ? this._rgb(150, 60, 0) : this._addActionArmed ? this._rgb(200, 130, 0) : this._rgb(60, 60, 60),
							color: this._rgb(255, 255, 255),
						}
					}
					if (tool.id === 'ping') {
						const rtt = this._pingHistory.length ? this._pingHistory[this._pingHistory.length - 1] : null
						if (rtt != null) {
							const bgcolor = rtt <= 50 ? this._rgb(0, 130, 0) : rtt <= 150 ? this._rgb(170, 120, 0) : this._rgb(160, 0, 0)
							return { text: `PING\n${rtt}ms`, bgcolor, color: this._rgb(255, 255, 255) }
						}
						return { text: tool.label, bgcolor: this._rgb(60, 60, 60), color: this._rgb(255, 255, 255) }
					}
					if (tool.id === 'volume' || tool.id === 'master' || tool.id === 'speed_ctrl') {
						const armed = this._controlPanelRotaryTarget === (tool.id === 'speed_ctrl' ? 'speed' : tool.id)
						const level = tool.id === 'volume' ? this.arenaAudioVolume
							: tool.id === 'master' ? this.arenaMasterOpacity
							: this.arenaSpeed
						const pct = level != null ? `${Math.round(level * 100)}%` : '—'
						const title = tool.id === 'volume' ? 'VOL' : tool.id === 'master' ? 'MASTER' : 'SPEED'
						return {
							text: `${title}\n${pct}`,
							bgcolor: armed ? this._rgb(0, 130, 90) : this._rgb(60, 60, 60),
							color: this._rgb(255, 255, 255),
						}
					}
					return { text: tool.label, bgcolor: this._rgb(60, 60, 60), color: this._rgb(255, 255, 255) }
				},
			},

			arena_layer_bypass: {
				type: 'boolean',
				name: '[Arena] Layer bypass state',
				description: 'True when the layer is bypassed (muted).',
				options: [
					{ type: 'textinput', label: 'Layer number', id: 'layer', default: '1', regex: Regex.NUMBER, useVariables: true },
				],
				defaultStyle: { bgcolor: this._rgb(180, 0, 0), color: this._rgb(255, 255, 255) },
				callback: async (fb) => {
					const layer = parseInt(fb.options.layer ?? '1')
					return this.arenaLayerState[layer]?.bypass === true
				},
			},

			arena_layer_opacity: {
				type: 'boolean',
				name: '[Arena] Layer opacity value',
				description: 'True when layer opacity matches comparison.',
				options: [
					{ type: 'textinput', label: 'Layer number', id: 'layer', default: '1', regex: Regex.NUMBER, useVariables: true },
					{ type: 'textinput', label: 'Opacity (0.0 – 1.0)', id: 'opacity', default: '1', regex: Regex.SIGNED_FLOAT, useVariables: true },
					{
						id: 'comparison', type: 'dropdown', label: 'Comparison', default: 'equal',
						choices: [
							{ id: 'equal', label: '=' }, { id: 'greaterthan', label: '>' }, { id: 'lessthan', label: '<' },
							{ id: 'greaterthanequal', label: '>=' }, { id: 'lessthanequal', label: '<=' }, { id: 'notequal', label: '!=' },
						],
					},
				],
				defaultStyle: { bgcolor: this._rgb(0, 100, 100), color: this._rgb(255, 255, 255) },
				callback: async (fb) => {
					const layer = parseInt(fb.options.layer ?? '1')
					const curOpacity = this.arenaLayerState[layer]?.opacity
					if (curOpacity === undefined) return false
					const target = parseFloat(fb.options.opacity ?? '1')
					if (isNaN(target)) return false
					return evaluateComparison(curOpacity, target, fb.options.comparison)
				},
			},

			// ── Generic OSC feedbacks ────────────────────────────────────────────

			osc_feedback_int: {
				type: 'boolean',
				name: 'Listen for OSC messages (Integer)',
				description: 'Requires "Listen for Feedback" to be enabled.',
				options: [
					{ type: 'textinput', label: 'OSC Path', id: 'path', default: '/osc/path', useVariables: true },
					{ type: 'textinput', label: 'Value', id: 'arguments', default: '1', regex: Regex.SIGNED_NUMBER, useVariables: true },
					{
						id: 'comparison', type: 'dropdown', label: 'Comparison', default: 'equal',
						choices: [
							{ id: 'equal', label: '=' }, { id: 'greaterthan', label: '>' }, { id: 'lessthan', label: '<' },
							{ id: 'greaterthanequal', label: '>=' }, { id: 'lessthanequal', label: '<=' }, { id: 'notequal', label: '!=' },
						],
					},
				],
				callback: async (fb) => {
					const path = fb.options.path ?? ''
					const target = parseFloat(fb.options.arguments ?? '')
					if (isNaN(target) || !Object.prototype.hasOwnProperty.call(this.onDataReceived, path)) return false
					return evaluateComparison(parseFloat(this.onDataReceived[path][0]?.value), target, fb.options.comparison)
				},
			},

			osc_feedback_float: {
				type: 'boolean',
				name: 'Listen for OSC messages (Float)',
				description: 'Requires "Listen for Feedback" to be enabled.',
				options: [
					{ type: 'textinput', label: 'OSC Path', id: 'path', default: '/osc/path', useVariables: true },
					{ type: 'textinput', label: 'Value', id: 'arguments', default: '1', regex: Regex.SIGNED_FLOAT, useVariables: true },
					{
						id: 'comparison', type: 'dropdown', label: 'Comparison', default: 'equal',
						choices: [
							{ id: 'equal', label: '=' }, { id: 'greaterthan', label: '>' }, { id: 'lessthan', label: '<' },
							{ id: 'greaterthanequal', label: '>=' }, { id: 'lessthanequal', label: '<=' }, { id: 'notequal', label: '!=' },
						],
					},
				],
				callback: async (fb) => {
					const path = fb.options.path ?? ''
					const target = parseFloat(fb.options.arguments ?? '')
					if (isNaN(target) || !Object.prototype.hasOwnProperty.call(this.onDataReceived, path)) return false
					return evaluateComparison(parseFloat(this.onDataReceived[path][0]?.value), target, fb.options.comparison)
				},
			},

			osc_feedback_bool: {
				type: 'boolean',
				name: 'Listen for OSC messages (Boolean)',
				description: 'Requires "Listen for Feedback" to be enabled.',
				options: [
					{ type: 'static-text', label: 'Note', value: 'Non-standard type.', id: 'w' },
					{ type: 'textinput', label: 'OSC Path', id: 'path', default: '/osc/path', useVariables: true },
					{ type: 'checkbox', label: 'Value', id: 'arguments', default: false },
					{
						id: 'comparison', type: 'dropdown', label: 'Comparison', default: 'equal',
						choices: [{ id: 'equal', label: '=' }, { id: 'notequal', label: '!=' }],
					},
				],
				callback: async (fb) => {
					const path = fb.options.path ?? ''
					if (!Object.prototype.hasOwnProperty.call(this.onDataReceived, path)) return false
					return evaluateComparison(this.onDataReceived[path][0]?.value === true, fb.options.arguments, fb.options.comparison)
				},
			},

			osc_feedback_string: {
				type: 'boolean',
				name: 'Listen for OSC messages (String)',
				description: 'Requires "Listen for Feedback" to be enabled.',
				options: [
					{ type: 'textinput', label: 'OSC Path', id: 'path', default: '/osc/path', useVariables: true },
					{ type: 'textinput', label: 'Value', id: 'arguments', default: 'my string', useVariables: true },
					{
						id: 'comparison', type: 'dropdown', label: 'Comparison', default: 'equal',
						choices: [{ id: 'equal', label: '=' }, { id: 'notequal', label: '!=' }],
					},
				],
				callback: async (fb) => {
					const path = fb.options.path ?? ''
					const expected = fb.options.arguments ?? ''
					if (!Object.prototype.hasOwnProperty.call(this.onDataReceived, path)) return false
					const actual = this.onDataReceived[path][0]?.value
					if (typeof actual !== 'string') return false
					return evaluateComparison(actual, expected, fb.options.comparison)
				},
			},

			osc_feedback_multi: {
				type: 'boolean',
				name: 'Listen for OSC messages (Multiple Arguments)',
				description: 'Requires "Listen for Feedback" to be enabled.',
				options: [
					{ type: 'textinput', label: 'OSC Path', id: 'path', default: '/osc/path', useVariables: true },
					{ type: 'textinput', label: 'Arguments', id: 'arguments', default: '1 "test" 2.5', useVariables: true },
					{
						id: 'comparison', type: 'dropdown', label: 'Comparison', default: 'equal',
						choices: [{ id: 'equal', label: '=' }, { id: 'notequal', label: '!=' }],
					},
				],
				callback: async (fb) => {
					const path = fb.options.path ?? ''
					const argsStr = fb.options.arguments ?? ''
					const { args, error } = parseArguments(argsStr)
					if (error || !Object.prototype.hasOwnProperty.call(this.onDataReceived, path)) return false
					const received = this.onDataReceived[path]
					let result = fb.options.comparison === 'equal'
					for (let i = 0; i < args.length; i++) {
						result = evaluateComparison(received[i]?.value, args[i].value, fb.options.comparison)
						if (fb.options.comparison === 'equal' && !result) break
						if (fb.options.comparison === 'notequal' && result) break
					}
					return result
				},
			},

			osc_feedback_noargs: {
				type: 'boolean',
				name: 'Listen for OSC messages (No Arguments)',
				description: 'Requires "Listen for Feedback" to be enabled.',
				options: [{ type: 'textinput', label: 'OSC Path', id: 'path', default: '/osc/path', useVariables: true }],
				callback: async (fb) => {
					const path = fb.options.path ?? ''
					if (Object.prototype.hasOwnProperty.call(this.onDataReceived, path) && this.onDataReceived[path].length > 0) {
						delete this.onDataReceived[path]
						this._onDataReceivedSize--
						if (this._cleanupTimers[path]) { clearTimeout(this._cleanupTimers[path]); delete this._cleanupTimers[path] }
						return true
					}
					return false
				},
			},

			// ── OSC Transport feedbacks ──────────────────────────────────────────

			oscProgressBar: {
				type: 'advanced',
				name: 'OSC: Progress Bar (Layer)',
				description: 'Visual progress bar for layer clip playback. Green → Orange → Red → Fast blink (≤5s). Always full green if looping. Requires "Listen for Feedback".',
				affectedProperties: ['bgcolor', 'color', 'imageBuffer'],
				options: [
					{ id: 'layer', type: 'textinput', label: 'Layer', default: '1', useVariables: true },
					{ id: 'hideWhenNotRunning', type: 'checkbox', label: 'Hide when clip not running', default: true },
					{ id: 'orangeSeconds', type: 'textinput', label: 'Orange at remaining seconds', default: '30', useVariables: true },
					{ id: 'redSeconds', type: 'textinput', label: 'Red at remaining seconds', default: '10', useVariables: true },
					{ id: 'runningColor', type: 'colorpicker', label: 'Running color (green)', default: this._rgb(0, 200, 0), returnType: 'number' },
					{ id: 'warningColor', type: 'colorpicker', label: 'Warning color (orange)', default: this._rgb(255, 140, 0), returnType: 'number' },
					{ id: 'criticalColor', type: 'colorpicker', label: 'Critical color (red)', default: this._rgb(220, 0, 0), returnType: 'number' },
				],
				callback: async (feedback) => {
					if (!this.oscState) return {}

					const layer = parseInt(feedback.options.layer ?? '1')
					const remaining = this.oscState.getLayerRemainingSeconds(layer)
					const duration = this.oscState.getLayerDurationSeconds(layer)
					const progress = this.oscState.getLayerProgress(layer)
					const isLooping = this.oscState.isLayerLooping(layer)

					if (feedback.options.hideWhenNotRunning && duration <= 0) return {}

					const orangeThreshold = parseFloat(String(feedback.options.orangeSeconds ?? '30')) || 30
					const redThreshold = parseFloat(String(feedback.options.redSeconds ?? '10')) || 10

					// Determine bar color
					let barColor
					if (isLooping) {
						barColor = +feedback.options.runningColor
					} else if (remaining <= 5 && remaining > 0) {
						// Solid red — no bar blink (bgcolor blink handled by preset_slot)
						barColor = +feedback.options.criticalColor
					} else if (remaining <= redThreshold) {
						barColor = +feedback.options.criticalColor
					} else if (remaining <= orangeThreshold) {
						barColor = +feedback.options.warningColor
					} else {
						barColor = +feedback.options.runningColor
					}

					const width = feedback.image?.width ?? 72
					const height = feedback.image?.height ?? 72
					// Looping clips show 100% bar (always full)
					const progressPercent = isLooping ? 100 : Math.max(0, Math.min(100, (progress || 0) * 100))
					// Scale bar with button size
					const barH = Math.max(4, Math.round(height / 10))
					const barOptions = {
						width,
						height,
						colors: [{ size: 100, color: barColor, background: barColor, backgroundOpacity: 64 }],
						barLength: width - Math.round(width / 14),
						barWidth: barH,
						value: progressPercent,
						type: 'horizontal',
						offsetX: Math.round(width / 14),
						offsetY: height - barH - 2,
						opacity: 255,
					}

					return {
						imageBuffer: graphics.bar(barOptions).toString('base64'),
						imageBufferEncoding: { pixelFormat: 'ARGB' },
					}
				},
			},

			oscActiveColumn: {
				type: 'boolean',
				name: 'OSC: Active Column',
				description: 'True when the specified column is the currently active composition column. Requires "Listen for Feedback".',
				options: [
					{ id: 'column', type: 'textinput', label: 'Column', default: '1', useVariables: true },
				],
				defaultStyle: { bgcolor: this._rgb(0, 200, 0), color: this._rgb(255, 255, 255) },
				callback: async (feedback) => {
					if (!this.oscState) return false
					const column = parseInt(feedback.options.column ?? '1')
					return this.oscState.activeColumn === column
				},
			},

			oscConnectedClip: {
				type: 'boolean',
				name: 'OSC: Clip connected (playing)',
				description: 'True when the specified layer + clip slot is the currently connected (playing) clip. Requires "Listen for Feedback".',
				options: [
					{ id: 'layer', type: 'textinput', label: 'Layer', default: '1', useVariables: true },
					{ id: 'clip', type: 'textinput', label: 'Clip slot', default: '1', useVariables: true },
				],
				defaultStyle: { bgcolor: this._rgb(0, 180, 0), color: this._rgb(255, 255, 255) },
				callback: async (feedback) => {
					if (!this.oscState) return false
					const layer = parseInt(feedback.options.layer ?? '1')
					const clip = parseInt(feedback.options.clip ?? '1')
					return this.oscState.getActiveClipColumn(layer) === clip
				},
			},

			oscLayerLooping: {
				type: 'boolean',
				name: 'OSC: Clip looping',
				description: 'True when the active clip on the layer is in a looping playmode (Loop, Ping Pong, Random). Requires "Listen for Feedback".',
				options: [
					{ id: 'layer', type: 'textinput', label: 'Layer', default: '1', useVariables: true },
				],
				defaultStyle: { bgcolor: this._rgb(0, 160, 0), color: this._rgb(255, 255, 255) },
				callback: async (feedback) => {
					if (!this.oscState) return false
					const layer = parseInt(feedback.options.layer ?? '1')
					return this.oscState.isLayerLooping(layer)
				},
			},

			oscGroupColumnConnected: {
				type: 'boolean',
				name: 'OSC: Group Column active (connected)',
				description: 'True when the specified column is currently the active (connected) column in the group. Requires "Listen for Feedback".',
				options: [
					{ id: 'group', type: 'textinput', label: 'Group', default: '1', useVariables: true },
					{ id: 'column', type: 'textinput', label: 'Column', default: '1', useVariables: true },
				],
				defaultStyle: { bgcolor: this._rgb(0, 200, 0), color: this._rgb(255, 255, 255) },
				callback: async (feedback) => {
					const group = parseInt(feedback.options.group ?? '1')
					const column = parseInt(feedback.options.column ?? '1')
					return this.groupConnectedColumns.get(group) === column
				},
			},

			// ── Autopilot ──────────────────────────────────────────────────────────

			arena_autopilot_info: {
				type: 'advanced',
				name: '[Arena] Autopilot — preview / result',
				description: 'Shows preview (press 1) or confirmed result (press 2) of arena_autopilot_set.',
				affectedProperties: ['text', 'size', 'bgcolor', 'color', 'imageBuffer'],
				options: [],
				callback: () => {
					const _trunc = (s) => truncLabel(s, 8)

					// State 1: pending preview (first press, waiting for confirmation)
					if (this._autopilotPending) {
						const { layer, clip, transitionSec, autopilotSec } = this._autopilotPending
						const clipName = this.oscState?.getActiveClip(Number(layer))?.name || `L${layer}C${clip}`
						return {
							text: `${_trunc(clipName)}\n→ ${autopilotSec.toFixed(1)}s\n-${transitionSec.toFixed(1)}s \u2753`,
							bgcolor: this._rgb(80, 50, 0),
							color: this._rgb(255, 200, 0),
							size: '14',
						}
					}

					// State 2: confirmed result
					const layer = this.getVariableValue('arena_autopilot_last_layer')
					const clip  = this.getVariableValue('arena_autopilot_last_clip')
					const av    = parseFloat(this.getVariableValue('arena_autopilot_last_value') ?? '')
					if (!layer || !clip || isNaN(av)) {
						return { text: 'AUTO\nPress\nto set', bgcolor: this._rgb(20, 20, 20), color: this._rgb(100, 100, 100), size: '14' }
					}
					const tr   = parseFloat(this.getVariableValue('arena_autopilot_last_transition') ?? '')
					const name = this.oscState?.getActiveClip(Number(layer))?.name || `L${layer}C${clip}`
					return {
						text: `${_trunc(name)}\n\u2713 ${av.toFixed(1)}s\n-${isNaN(tr) ? '?' : tr.toFixed(1)}s`,
						bgcolor: this._rgb(0, 80, 30),
						color: this._rgb(180, 255, 180),
						size: '14',
					}
				},
			},
		})
	}

	// ---------------------------------------------------------------------------
	// Variables
	// ---------------------------------------------------------------------------

	updateVariables() {
		// Build per-layer variable definitions
		const layerNums = Array.from({ length: OSC_DEFAULT_LAYERS }, (_, i) => i + 1)
		// Include any extra dynamically-discovered layers beyond the default 10
		if (this.oscState) {
			for (const n of this.oscState.getAllRegisteredLayers()) {
				if (n > OSC_DEFAULT_LAYERS) layerNums.push(n)
			}
		}
		const oscLayerVars = layerNums.flatMap((n) => [
			{ variableId: `osc_layer_${n}_elapsed`, name: `OSC Layer ${n} / Elapsed Time` },
			{ variableId: `osc_layer_${n}_elapsed_seconds`, name: `OSC Layer ${n} / Elapsed (seconds)` },
			{ variableId: `osc_layer_${n}_duration`, name: `OSC Layer ${n} / Duration` },
			{ variableId: `osc_layer_${n}_remaining`, name: `OSC Layer ${n} / Remaining Time` },
			{ variableId: `osc_layer_${n}_remaining_seconds`, name: `OSC Layer ${n} / Remaining (seconds)` },
			{ variableId: `osc_layer_${n}_progress`, name: `OSC Layer ${n} / Progress (%)` },
			{ variableId: `osc_layer_${n}_clip_name`, name: `OSC Layer ${n} / Clip Name` },
			{ variableId: `osc_layer_${n}_playmode`, name: `OSC Layer ${n} / Clip Playmode` },
		])

		this.setVariableDefinitions({
			// Generic
			'latest_received_timestamp': { name: 'Latest OSC message received timestamp' },
			'latest_received_raw': { name: 'Latest OSC message received' },
			'latest_received_path': { name: 'Latest OSC command received' },
			'latest_received_client': { name: 'Latest OSC message received client (UDP only)' },
			'latest_received_port': { name: 'Latest OSC message received port (UDP only)' },
			'latest_received_args': { name: 'Latest OSC arguments received array' },
			'latest_sent_timestamp': { name: 'Latest OSC message sent timestamp' },
			'latest_sent_raw': { name: 'Latest OSC message sent' },
			'latest_sent_path': { name: 'Latest OSC command sent' },
			'latest_sent_args': { name: 'Latest OSC arguments sent array' },
			// Arena — selection
			'arena_selected_layer': { name: 'Arena — last selected layer' },
			'arena_selected_clip': { name: 'Arena — last selected clip' },
			'arena_selected_column': { name: 'Arena — last selected column' },
			'arena_selected_group': { name: 'Arena — last selected group' },
			'arena_selected_group_column': { name: 'Arena — last selected group column' },
			'arena_last_select_type': { name: 'Arena — last select type (clip | column | group_column)' },
			'arena_edit_mode': { name: 'Arena — edit mode active (1 | 0)' },
			'arena_delete_mode': { name: 'Arena — delete mode active (1 | 0)' },
			// Quick Control Panel
			'arena_control_panel_active': { name: 'Quick Control Panel open (1 | 0)' },
			'arena_rotary_target': { name: 'Rotary redirect target while panel open (volume | master | empty)' },
			// User variables (Tab 4 panel toggles)
			'user_var_1': { name: 'User variable 1 (1 | 0)' },
			'user_var_2': { name: 'User variable 2 (1 | 0)' },
			// Arena — live parameters
			'arena_bpm': { name: 'Arena — current BPM' },
			'arena_master_opacity': { name: 'Arena — master composition opacity (0.0–1.0)' },
			'arena_audio_volume': { name: 'Arena — audio volume (0.0–1.0)' },
			'arena_speed': { name: 'Arena — composition speed float (0.0–1.0)' },
			// Diagnostics
			'arena_progress_polling': { name: 'Real-time progress polling active (1 | 0)' },
			'arena_ping_ms': { name: 'Last OSC round-trip time (ms)' },
			'arena_ping_jitter_ms': { name: 'OSC round-trip jitter (ms, stddev of last 10)' },
			// Arena — autopilot (last set via arena_autopilot_set)
			'arena_autopilot_last_layer':    { name: 'Autopilot — last set layer' },
			'arena_autopilot_last_clip':     { name: 'Autopilot — last set clip' },
			'arena_autopilot_last_duration': { name: 'Autopilot — last clip duration (s)' },
			'arena_autopilot_last_transition': { name: 'Autopilot — last layer transition (s)' },
			'arena_autopilot_last_value':    { name: 'Autopilot — last set value (s)' },
			// OSC transport state
			'osc_active_column': { name: 'OSC / Active Column' },
			'osc_active_column_name': { name: 'OSC / Active Column Name' },
			...Object.fromEntries(oscLayerVars.map(v => [v.variableId, { name: v.name }])),
		})

		this.setVariableValues({
			arena_selected_layer: this.arenaSelectedClip.layer ?? '',
			arena_selected_clip: this.arenaSelectedClip.clip ?? '',
			arena_selected_column: this.arenaSelectedColumn.column ?? '',
			arena_last_select_type: this.arenaLastSelectType ?? '',
			arena_edit_mode: '0',
			arena_delete_mode: '0',
			arena_control_panel_active: '0',
			arena_rotary_target: '',
			arena_bpm: this.arenaBpm !== null ? String(this.arenaBpm) : '',
			arena_master_opacity: this.arenaMasterOpacity !== null ? String(this.arenaMasterOpacity) : '',
			arena_audio_volume: this.arenaAudioVolume !== null ? this.arenaAudioVolume.toFixed(3) : '',
			arena_speed: this.arenaSpeed !== null ? this.arenaSpeed.toFixed(3) : '',
			arena_selected_group: this.arenaSelectedGroupColumn.group ?? '',
			arena_selected_group_column: this.arenaSelectedGroupColumn.column ?? '',
			arena_progress_polling: this.getProgressPollingEnabled() ? '1' : '0',
			user_var_1: this._userVar1 ? '1' : '0',
			user_var_2: this._userVar2 ? '1' : '0',
			arena_ping_ms: this._pingHistory.length ? String(this._pingHistory[this._pingHistory.length - 1]) : '',
			arena_ping_jitter_ms: '',
		})
	}

	// ---------------------------------------------------------------------------
	// Utility
	// ---------------------------------------------------------------------------

	_rgb(r, g, b) {
		return ((r & 0xff) << 16) | ((g & 0xff) << 8) | (b & 0xff)
	}

	// ---------------------------------------------------------------------------
	// Presets (drag-and-drop button templates)
	// ---------------------------------------------------------------------------

	_applyPresetDefaults(presets) {
		for (const preset of Object.values(presets)) {
			if (preset.type === 'simple' && preset.style) preset.style.show_topbar = false
		}
		return presets
	}

	updatePresets() {
		const presets = {}

		// ── Preset slot buttons 1–50 ────────────────────────────────────────────
		for (let slot = 1; slot <= 50; slot++) {
			presets[`slot_${slot}`] = {
				type: 'simple',
				category: 'Preset Slots',
				name: `Preset Slot ${slot}`,
				style: {
					text: `Slot ${slot}`,
					size: '12',
					bgcolor: this._rgb(25, 25, 25),
					color: this._rgb(150, 150, 150),
				},
				feedbacks: [{
					feedbackId: 'preset_slot',
					options: { slot, clip_color: this._rgb(0, 80, 200), column_color: this._rgb(0, 160, 0), group_column_color: this._rgb(0, 90, 0) },
				}],
				steps: [{ down: [{ actionId: 'preset_slot_trigger', options: { slot } }], up: [] }],
			}
		}

		// ── Edit mode toggle ─────────────────────────────────────────────────────
		presets['edit_mode_toggle'] = {
			type: 'simple',
			category: 'Preset Slots',
			name: 'Edit Mode',
			style: { text: 'EDIT\nMODE', size: '14', bgcolor: this._rgb(50, 25, 0), color: this._rgb(200, 120, 0) },
			feedbacks: [{ feedbackId: 'preset_slot_edit', options: {} }],
			steps: [{ down: [{ actionId: 'preset_slot_edit_mode', options: { action: 'toggle' } }], up: [] }],
		}

		// ── Delete mode toggle ───────────────────────────────────────────────────
		presets['delete_mode_toggle'] = {
			type: 'simple',
			category: 'Preset Slots',
			name: 'Delete Mode',
			style: { text: 'DEL\nMODE', size: '14', bgcolor: this._rgb(50, 0, 0), color: this._rgb(200, 80, 80) },
			feedbacks: [{ feedbackId: 'preset_slot_delete', options: {} }],
			steps: [{ down: [{ actionId: 'preset_slot_delete_mode', options: { action: 'toggle' } }], up: [] }],
		}

		// ── Trigger clip ─────────────────────────────────────────────────────────
		presets['trigger_clip'] = {
			type: 'simple',
			category: 'Arena Controls',
			name: 'Trigger Clip L1C1',
			style: { text: 'L1\nC1', size: '14', bgcolor: this._rgb(0, 50, 150), color: this._rgb(255, 255, 255) },
			feedbacks: [],
			steps: [{ down: [{ actionId: 'arena_trigger_clip', options: { layer: '1', clip: '1' } }], up: [] }],
		}

		// ── Trigger column ───────────────────────────────────────────────────────
		presets['trigger_column'] = {
			type: 'simple',
			category: 'Arena Controls',
			name: 'Trigger Column 1',
			style: { text: 'COL\n1', size: '14', bgcolor: this._rgb(0, 120, 0), color: this._rgb(255, 255, 255) },
			feedbacks: [],
			steps: [{ down: [{ actionId: 'arena_trigger_column', options: { column: '1' } }], up: [] }],
		}

		// ── Layer opacity 100% ───────────────────────────────────────────────────
		presets['layer_opacity_full'] = {
			type: 'simple',
			category: 'Arena Controls',
			name: 'Layer 1 — Opacity 100%',
			style: { text: 'L1\n100%', size: '14', bgcolor: this._rgb(0, 60, 80), color: this._rgb(255, 255, 255) },
			feedbacks: [],
			steps: [{ down: [{ actionId: 'arena_layer_opacity', options: { layer: '1', opacity: '1' } }], up: [] }],
		}

		// ── Layer opacity 0% ─────────────────────────────────────────────────────
		presets['layer_opacity_zero'] = {
			type: 'simple',
			category: 'Arena Controls',
			name: 'Layer 1 — Opacity 0%',
			style: { text: 'L1\n0%', size: '14', bgcolor: this._rgb(0, 60, 80), color: this._rgb(255, 255, 255) },
			feedbacks: [],
			steps: [{ down: [{ actionId: 'arena_layer_opacity', options: { layer: '1', opacity: '0' } }], up: [] }],
		}

		// ── Layer bypass toggle ──────────────────────────────────────────────────
		presets['layer_bypass_toggle'] = {
			type: 'simple',
			category: 'Arena Controls',
			name: 'Layer 1 — Bypass Toggle',
			style: { text: 'L1\nBYPASS', size: '14', bgcolor: this._rgb(60, 0, 0), color: this._rgb(200, 200, 200) },
			feedbacks: [{ feedbackId: 'arena_layer_bypass', options: { layer: '1' } }],
			steps: [{ down: [{ actionId: 'arena_layer_bypass', options: { layer: '1', bypass: 'toggle' } }], up: [] }],
		}

		// ── Clear layer ──────────────────────────────────────────────────────────
		presets['clear_layer'] = {
			type: 'simple',
			category: 'Arena Controls',
			name: 'Layer 1 — Clear',
			style: { text: 'CLEAR\nL1', size: '14', bgcolor: this._rgb(80, 0, 0), color: this._rgb(255, 255, 255) },
			feedbacks: [],
			steps: [{ down: [{ actionId: 'arena_clear_layer', options: { layer: '1' } }], up: [] }],
		}

		// ── Master opacity ───────────────────────────────────────────────────────
		presets['master_opacity_full'] = {
			type: 'simple',
			category: 'Arena Controls',
			name: 'Master Opacity 100%',
			style: { text: 'MASTER\n100%', size: '14', bgcolor: this._rgb(20, 60, 80), color: this._rgb(255, 255, 255) },
			feedbacks: [],
			steps: [{ down: [{ actionId: 'arena_master_opacity', options: { opacity: '1' } }], up: [] }],
		}

		presets['master_opacity_zero'] = {
			type: 'simple',
			category: 'Arena Controls',
			name: 'Master Opacity 0%',
			style: { text: 'MASTER\n0%', size: '14', bgcolor: this._rgb(20, 60, 80), color: this._rgb(255, 255, 255) },
			feedbacks: [],
			steps: [{ down: [{ actionId: 'arena_master_opacity', options: { opacity: '0' } }], up: [] }],
		}

		// ── BPM ──────────────────────────────────────────────────────────────────
		presets['tap_tempo'] = {
			type: 'simple',
			category: 'Arena Controls',
			name: 'Tap Tempo',
			style: { text: 'TAP\nTEMPO', size: '14', bgcolor: this._rgb(60, 0, 100), color: this._rgb(255, 255, 255) },
			feedbacks: [],
			steps: [{ down: [{ actionId: 'arena_bpm_tap', options: {} }], up: [] }],
		}

		presets['bpm_120'] = {
			type: 'simple',
			category: 'Arena Controls',
			name: 'Set BPM 120',
			style: { text: 'BPM\n120', size: '14', bgcolor: this._rgb(60, 0, 100), color: this._rgb(255, 255, 255) },
			feedbacks: [],
			steps: [{ down: [{ actionId: 'arena_bpm_set', options: { bpm: '120' } }], up: [] }],
		}

		// ── Audio volume encoder (rotary) ────────────────────────────────────────────
		// Right = up, Left = down, Press = smooth fade to normal (1.0)
		presets['audio_volume_encoder'] = {
			type: 'simple',
			category: 'Arena Controls',
			name: 'Audio Volume Encoder',
			style: { text: 'AUDIO\nVOL', size: '14', bgcolor: this._rgb(0, 70, 50), color: this._rgb(255, 255, 255) },
			options: { rotaryActions: true },
			feedbacks: [],
			steps: [{
				down: [{ actionId: 'arena_audio_volume_set', options: { volume: '1', fade: true } }],
				up: [],
				rotate_left: [{ actionId: 'arena_audio_volume_nudge', options: { direction: 'down', min_step: 0.005, max_step: 0.06 } }],
				rotate_right: [{ actionId: 'arena_audio_volume_nudge', options: { direction: 'up', min_step: 0.005, max_step: 0.06 } }],
			}],
		}

		// ── Composition speed encoder (rotary) ────────────────────────────────────────
		// Right = up, Left = down, Press = set to 0.25 immediately
		presets['speed_encoder'] = {
			type: 'simple',
			category: 'Arena Controls',
			name: 'Composition Speed Encoder',
			style: { text: 'COMP\nSPD', size: '14', bgcolor: this._rgb(0, 50, 70), color: this._rgb(255, 255, 255) },
			options: { rotaryActions: true },
			feedbacks: [],
			steps: [{
				down: [{ actionId: 'arena_speed_set', options: { speed: '0.25' } }],
				up: [],
				rotate_left: [{ actionId: 'arena_speed_nudge', options: { direction: 'down', min_step: 0.003, max_step: 0.08 } }],
				rotate_right: [{ actionId: 'arena_speed_nudge', options: { direction: 'up', min_step: 0.003, max_step: 0.08 } }],
			}],
		}

		// ── Master opacity encoder (rotary) ───────────────────────────────────────────
		// Right = up, Left = down, Press = set to full (1.0). Doubles as the
		// Control Panel's Volume/Master rotary-redirect target when armed.
		presets['master_opacity_encoder'] = {
			type: 'simple',
			category: 'Arena Controls',
			name: 'Master Opacity Encoder',
			style: { text: 'MASTER\nOPACITY', size: '14', bgcolor: this._rgb(70, 50, 0), color: this._rgb(255, 255, 255) },
			options: { rotaryActions: true },
			feedbacks: [],
			steps: [{
				down: [{ actionId: 'arena_master_opacity', options: { opacity: '1' } }],
				up: [],
				rotate_left: [{ actionId: 'arena_master_opacity_nudge', options: { direction: 'down', min_step: 0.005, max_step: 0.06 } }],
				rotate_right: [{ actionId: 'arena_master_opacity_nudge', options: { direction: 'up', min_step: 0.005, max_step: 0.06 } }],
			}],
		}

		// ── Generic float encoder (rotary) ─────────────────────────────────────────
		// Template for controlling any Arena float parameter with a rotary encoder.
		// Duplicate and change the OSC path to suit any parameter (color, effect, etc.)
		presets['generic_float_encoder'] = {
			type: 'simple',
			category: 'Arena Controls',
			name: 'Generic Float Encoder',
			style: { text: 'ENCODER\n/osc/path', size: '10', bgcolor: this._rgb(40, 40, 60), color: this._rgb(200, 200, 255) },
			options: { rotaryActions: true },
			feedbacks: [],
			steps: [{
				down: [],
				up: [],
				rotate_left: [{
					actionId: 'arena_float_nudge',
					options: { path: '/osc/path', direction: 'down', min_step: 0.005, max_step: 0.05, range_min: 0, range_max: 1, query_unknown: true },
				}],
				rotate_right: [{
					actionId: 'arena_float_nudge',
					options: { path: '/osc/path', direction: 'up', min_step: 0.005, max_step: 0.05, range_min: 0, range_max: 1, query_unknown: true },
				}],
			}],
		}

		// ── Clear slot ───────────────────────────────────────────────────────────
		presets['clear_slot_1'] = {
			type: 'simple',
			category: 'Preset Slots',
			name: 'Clear Slot 1',
			style: { text: 'CLR\nSLOT 1', size: '14', bgcolor: this._rgb(60, 0, 0), color: this._rgb(200, 100, 100) },
			feedbacks: [],
			steps: [{ down: [{ actionId: 'preset_slot_clear', options: { slot: 1 } }], up: [] }],
		}

		// ── Loop-hold ────────────────────────────────────────────────────────────
		presets['loop_start'] = {
			type: 'simple',
			category: 'Automation',
			name: 'Loop-Start (hold autopilot)',
			style: { text: 'LOOP\nSTART', size: '14', bgcolor: this._rgb(0, 60, 100), color: this._rgb(100, 220, 255) },
			feedbacks: [],
			steps: [{ down: [{ actionId: 'arena_loop_start', options: { watch_layer: 1, watch_clip: 1 } }], up: [] }],
		}

		presets['loop_fin'] = {
			type: 'simple',
			category: 'Automation',
			name: 'Loop-Fin (release autopilot)',
			style: { text: 'LOOP\nFIN', size: '14', bgcolor: this._rgb(0, 80, 40), color: this._rgb(100, 255, 180) },
			feedbacks: [],
			steps: [{ down: [{ actionId: 'arena_loop_fin', options: { watch_layer: 1, watch_clip: 1 } }], up: [] }],
		}

		// ── Diagnostics ──────────────────────────────────────────────────────────
		presets['toggle_progress_polling'] = {
			type: 'simple',
			category: 'Diagnostics',
			name: 'Toggle progress polling',
			style: { text: 'POLL\nTOGGLE', size: '14', bgcolor: this._rgb(0, 60, 60), color: this._rgb(150, 255, 255) },
			feedbacks: [{ feedbackId: 'arena_progress_polling_status', options: {} }],
			steps: [{ down: [{ actionId: 'arena_toggle_progress_polling', options: { mode: 'toggle' } }], up: [] }],
		}

		presets['check_connection'] = {
			type: 'simple',
			category: 'Diagnostics',
			name: 'Check connection (ping)',
			style: { text: 'PING', size: '18', bgcolor: this._rgb(60, 60, 60), color: this._rgb(255, 255, 255) },
			feedbacks: [{ feedbackId: 'arena_ping_status', options: { goodMs: '50', warnMs: '150' } }],
			steps: [{ down: [{ actionId: 'arena_check_connection', options: {} }], up: [] }],
		}

		// ── Quick Control Panel ────────────────────────────────────────────────────
		presets['control_panel_activate'] = {
			type: 'simple',
			category: 'Quick Control Panel',
			name: 'Control Panel — Activate',
			style: { text: 'TOOLS', size: '18', bgcolor: this._rgb(50, 0, 90), color: this._rgb(220, 180, 255) },
			feedbacks: [],
			steps: [{ down: [{ actionId: 'arena_control_panel_activate', options: { mode: 'toggle' } }], up: [] }],
		}

		try {
			const controlSlotCount = Math.max(2, Math.min(8, parseInt(this.config.control_slot_count ?? 4) || 4))
			for (let s = 1; s <= controlSlotCount; s++) {
				presets[`control_slot_${s}`] = {
					type: 'simple',
					category: 'Quick Control Panel',
					name: `Control Panel — Slot ${s}`,
					style: { text: String(s), size: '18', bgcolor: this._rgb(30, 30, 30), color: this._rgb(200, 200, 200) },
					feedbacks: [{ feedbackId: 'arena_control_slot', options: { slot: s } }],
					steps: [{ down: [{ actionId: 'arena_control_slot_press', options: { slot: s } }], up: [] }],
				}
			}
		} catch (e) {
			this.log('debug', `control panel presets: ${e.message}`)
		}

				// ── OSC Transport presets (all discovered/configured layers) ─────────────────
		try {
			const oscMinLayers = Math.max(1, parseInt(this.config.osc_num_layers ?? 10) || 10)
			const oscLayerSet = new Set(Array.from({ length: oscMinLayers }, (_, i) => i + 1))
			if (this.oscState) {
				for (const n of this.oscState.getAllRegisteredLayers()) oscLayerSet.add(n)
			}
			for (const layer of [...oscLayerSet].sort((a, b) => a - b)) {
				presets[`osc_progress_layer_${layer}`] = {
					type: 'simple',
					category: 'OSC Transport',
					name: `Progress Bar — Layer ${layer}`,
					style: { text: `L${layer}\n$(arena-osc:osc_layer_${layer}_remaining)`, size: '14', bgcolor: this._rgb(0, 30, 0), color: this._rgb(200, 200, 200) },
					feedbacks: [{
						feedbackId: 'oscProgressBar',
						options: {
							layer: String(layer),
							hideWhenNotRunning: true,
							orangeSeconds: '30',
							redSeconds: '10',
							runningColor: this._rgb(0, 200, 0),
							warningColor: this._rgb(255, 140, 0),
							criticalColor: this._rgb(220, 0, 0),
						},
					}],
					steps: [{ down: [], up: [] }],
				}
			}

			// ── Group column presets (all discovered/configured groups) ───────────────
			const oscMinGroups = Math.max(0, parseInt(this.config.osc_num_groups ?? 0) || 0)
			const oscGroupSet = new Set([...this.arenaGroups])
			for (let g = 1; g <= oscMinGroups; g++) oscGroupSet.add(g)
			for (const group of [...oscGroupSet].sort((a, b) => a - b)) {
				for (let col = 1; col <= 4; col++) {
					presets[`group_${group}_col_${col}`] = {
						type: 'simple',
						category: 'Arena Groups',
						name: `Group ${group} — Column ${col}`,
						style: { text: `G${group}\nC${col}`, size: '14', bgcolor: this._rgb(0, 70, 0), color: this._rgb(255, 255, 255) },
						feedbacks: [{
							feedbackId: 'oscGroupColumnConnected',
							options: { group: String(group), column: String(col) },
						}],
						steps: [{ down: [{ actionId: 'arena_trigger_group_column', options: { group: String(group), column: String(col) } }], up: [] }],
					}
				}
			}
		} catch (e) {
			this.log('warn', `updatePresets OSC section: ${e.message}`)
		}

		// Build structure from category metadata (v2 API)
		this._applyPresetDefaults(presets)
		const catMap = {}
		for (const [id, p] of Object.entries(presets)) {
			const cat = p.category || 'Other'
			if (!catMap[cat]) catMap[cat] = []
			catMap[cat].push(id)
			delete p.category
		}
		const structure = Object.entries(catMap).map(([cat, ids]) => ({
			id: cat.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
			name: cat,
			definitions: [{ id: 'all', type: 'simple', name: cat, presets: ids }],
		}))
		this.setPresetDefinitions(structure, presets)
	}
}

module.exports = ArenaOscInstance
module.exports.UpgradeScripts = []

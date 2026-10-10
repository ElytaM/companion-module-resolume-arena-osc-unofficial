// Arena OSC — OscState
// Per-layer clip transport state with linear position prediction.
//
// Prediction: when an OSC position message arrives, we record (position, time, speed).
// A single 200ms master timer extrapolates:
//   predictedPos = lastOscPos + elapsed_s * speed / durationSec
// This gives smooth countdown at 5fps with zero extra OSC traffic.
//
// OSC traffic strategy:
//   connect:       7 wildcard + 2 direct queries (no wildcard position — see note below)
//   new clip:      5 targeted queries (position + duration + name + playmode + speed), debounced 1s
//   column change: 4 wildcard queries (connected + name + duration + playmode — NO position)
//   health check:  3 wildcard + N targeted per-layer queries every 30s
//
// WHY NO WILDCARD POSITION:
//   /composition/layers/*/clips/*/transport/position? returns data for ALL clips in ALL layers,
//   including non-active ones. The per-layer handler cannot distinguish which clip is "active"
//   from the stream alone, causing time to jump between clips. Position is always pulled
//   individually via queryClipInfoAndPosition() triggered by the connected handler.
'use strict'

const OSC_DEFAULT_LAYERS = 10
const MAX_RANGE = 604800            // Resolume's normalized range (7 days in seconds)
const PREDICT_INTERVAL_MS = 200     // master timer: variable updates (5fps)
const STALE_THRESHOLD_S = 3.0       // stop predicting if no OSC update for this long
const HEALTH_CHECK_MS = 30000       // lightweight health check
const RESYNC_INTERVAL_MS = 2000     // forced position re-anchor per layer (drift correction + custom presets)
                                    // 500ms was 20 queries/sec with 10 layers; 2000ms = 5/sec — still fast enough

// Resolume Arena playmode integer values (from OSC)
// 0 = Loop, 1 = Bounce, 2 = Random, 3 = Play Once & Clear, 4 = Play Once & Hold
const PM_LOOP   = 0
const PM_BOUNCE = 1
const PM_RANDOM = 2
// PM_ONCE_CLEAR = 3, PM_ONCE_HOLD = 4 — both are "plays once" (bar moves, no repeat)

/**
 * OscState — manages all clip transport state received from Resolume via OSC.
 *
 * Per-layer tracking:
 *   position (0-1), duration (0-1 of MAX_RANGE), name, playmode, connected
 *
 * Duration estimation (resolume-timecode algorithm):
 *   Measures deltaPos/deltaTime, averages 10 samples, settles after 3 consistent.
 *
 * Variables set per layer (prefix = `osc_layer_N`):
 *   _elapsed, _elapsed_seconds, _duration, _remaining, _remaining_seconds,
 *   _progress, _clip_name
 *
 * Composition-level variables:
 *   osc_active_column, osc_active_column_name
 */
class OscState {
	constructor(instance) {
		this.instance = instance

		this.layers = new Map()             // Map<layerNum, LayerState>
		this.registeredLayers = new Set()
		this.activeColumn = 0
		this.columnNames = new Map()

		this.masterTimer = null             // 200ms: variable updates only
		this.refreshInterval = null         // 30s: health check

		// No blink state in OscState — blink is driven by index.js timers

		this.lastRemainingInt = new Map()   // per-layer, throttles checkFeedbacks
		this.lastQueryTime = new Map()      // per-layer, debounces queryClipInfoAndPosition
		this.lastResyncTime = new Map()     // per-layer, unconditional 2s position re-anchor
		this._presetsUpdateTimer = null     // debounce for updatePresets() on layer discovery
	}

	// ──────────────────────────────────────────────────────────────────────────
	// Message Routing
	// ──────────────────────────────────────────────────────────────────────────

	/**
	 * Route an incoming OSC message to the appropriate handler.
	 * Returns true if handled (caller should not process further).
	 * @param {string} address
	 * @param {Array} args  OSC argument objects [{type, value}, ...]
	 */
	handleMessage(address, args) {
		if (!address.startsWith('/composition')) return false

		const value = args && args.length > 0 ? args[0].value : undefined
		let match

		// ── Clip transport position (most frequent — check first) ─────────────
		match = address.match(/^\/composition\/layers\/(\d+)\/clips\/(\d+)\/transport\/position$/)
		if (match) {
			const layer = +match[1]
			const column = +match[2]
			const pos = +value
			if (!isFinite(pos)) return true  // discard malformed value
			const layerState = this.getOrCreateLayer(layer)

			// Only accept position for the currently active clip on this layer.
			// The connected handler is authoritative for clip detection — never infer from position
			// (wildcard position responses carry data for ALL clips and cause false clip changes).
			if (layerState.clip.activeClip !== column) return true

			// Ground-truth position from Arena (drift correction / initial seed)
			layerState.clip.position = pos
			layerState.lastPositionTime = Date.now()
			layerState.lastOscPos = pos

			// Estimation fallback: if duration still unknown use sample-based approach
			if (layerState.clip.duration === 0 && !layerState.estimation.settled) {
				this._estimateDuration(layerState, pos)
			}
			// Variable updates handled by master timer via _predictPosition()
			// Let index.js also see this message: an active column is a valid
			// assignable selection, not only transport state.
			return false
		}

		// ── Clip duration ──────────────────────────────────────────────────────
		match = address.match(/^\/composition\/layers\/(\d+)\/clips\/(\d+)\/transport\/position\/behaviour\/duration$/)
		if (match) {
			const layer = +match[1]
			const column = +match[2]
			const layerState = this.getOrCreateLayer(layer)
			if (layerState.clip.activeClip === column) {
				const dur = +value
				if (!isFinite(dur) || dur < 0) return true
				layerState.clip.duration = dur
				layerState.clip.durationEstimated = false
				layerState.estimation.settled = true
				this.updateLayerVariables(layer)
			}
			return true
		}

		// ── Clip speed ────────────────────────────────────────────────────────
		match = address.match(/^\/composition\/layers\/(\d+)\/clips\/(\d+)\/transport\/position\/behaviour\/speed$/)
		if (match) {
			const layer = +match[1]
			const column = +match[2]
			const layerState = this.getOrCreateLayer(layer)
			if (layerState.clip.activeClip === 0 || layerState.clip.activeClip === column) {
				const spd = +value
				if (isFinite(spd)) layerState.clip.speed = spd
				this.updateLayerVariables(layer)
			}
			return true
		}

		// ── Clip playmode (loop detection) ────────────────────────────────────
		match = address.match(/^\/composition\/layers\/(\d+)\/clips\/(\d+)\/transport\/position\/behaviour\/playmode$/)
		if (match) {
			const layer = +match[1]
			const column = +match[2]
			const layerState = this.getOrCreateLayer(layer)
			if (layerState.clip.activeClip === 0 || layerState.clip.activeClip === column) {
				layerState.clip.playmode = String(value ?? '')
				// Trigger feedback re-check immediately — loop status may change color
				this.instance.checkFeedbacks('oscProgressBar', 'preset_slot')
			}
			return true
		}

		// ── Clip connected ────────────────────────────────────────────────────
		match = address.match(/^\/composition\/layers\/(\d+)\/clips\/(\d+)\/connected$/)
		if (match) {
			const layer = +match[1]
			const column = +match[2]
			const connectedState = +value
			const layerState = this.getOrCreateLayer(layer)

			if (connectedState >= 2) {
				const isNewClip = layerState.clip.activeClip !== column
				layerState.clip.activeClip = column
				layerState.clip.connected = connectedState
				if (isNewClip) {
					// Reset state and immediately pull all clip info — no waiting for position stream
					layerState.clip.position = 0
					layerState.clip.duration = 0
					layerState.clip.durationEstimated = false
					layerState.clip.name = ''
					layerState.clip.playmode = ''
					layerState.lastPositionTime = 0
					layerState.lastOscPos = 0
					this._resetEstimation(layerState)
					this.lastQueryTime.delete(layer)   // bypass debounce for first query
					this.lastResyncTime.delete(layer)  // force immediate position anchor
					this.queryClipInfoAndPosition(layer, column)
				}
			} else if (connectedState === 0 && layerState.clip.activeClip === column) {
				layerState.clip.connected = 0
				layerState.clip.position = 0
				layerState.clip.duration = 0
				layerState.clip.activeClip = 0
				layerState.clip.name = ''
				layerState.clip.playmode = ''
			}

			this.updateLayerVariables(layer)
			return true
		}

		// ── Clip name ─────────────────────────────────────────────────────────
		match = address.match(/^\/composition\/layers\/(\d+)\/clips\/(\d+)\/name$/)
		if (match) {
			const layer = +match[1]
			const column = +match[2]
			const layerState = this.getOrCreateLayer(layer)
			if (layerState.clip.activeClip === column) {
				// Replace # with column number (Resolume template convention)
				const rawName = String(value ?? '')
				const newName = rawName.replace(/#/g, String(column))
				if (layerState.clip.name !== '' && layerState.clip.name !== newName) {
					// Content replaced in same slot — reset
					layerState.clip.duration = 0
					layerState.clip.durationEstimated = false
					layerState.clip.playmode = ''
					this._resetEstimation(layerState)
					this.lastQueryTime.delete(layer)
					this.queryClipInfoAndPosition(layer, column)
				}
				layerState.clip.name = newName
				this.updateLayerVariables(layer)
			}
			// Return FALSE so index.js pending name resolvers also receive this reply
			return false
		}

		// ── Column connected (active column tracking) ─────────────────────────
		match = address.match(/^\/composition\/columns\/(\d+)\/connected$/)
		if (match) {
			const column = +match[1]
			const connectedState = +value
			if (connectedState >= 2) {
				if (this.activeColumn !== column) {
					this.activeColumn = column
					const colName = this.columnNames.get(column) || `Column ${column}`
					this.instance.setVariableValues({
						osc_active_column: column.toString(),
						osc_active_column_name: colName,
					})
					// Don't eagerly reset layer data — let the connected/disconnected
					// responses for each layer handle state transitions naturally.
					// This prevents blanking layers that keep the same clip across columns.
					// Clear resync timers so every active layer re-anchors position within 200ms.
					this.lastResyncTime.clear()
					this.lastQueryTime.clear()
					this.queryClipInfoWildcard()
				}
			}
			// Let index.js also treat an active column as an assignable selection.
			return false
		}

		// ── Column name ────────────────────────────────────────────────────────
		match = address.match(/^\/composition\/columns\/(\d+)\/name$/)
		if (match) {
			const column = +match[1]
			// Replace # with column number (Resolume template convention: "Scene #" → "Scene 3")
			const name = String(value ?? '').replace(/#/g, String(column))
			this.columnNames.set(column, name)
			if (column === this.activeColumn) {
				this.instance.setVariableValues({ osc_active_column_name: name })
			}
			// Return FALSE so index.js pending name resolvers also receive this reply
			return false
		}

		return false
	}

	// ──────────────────────────────────────────────────────────────────────────
	// Duration Estimation (resolume-timecode algorithm)
	// ──────────────────────────────────────────────────────────────────────────

	/**
	 * Estimate clip duration from the rate of position change.
	 * Based on https://github.com/chabad360/resolume-timecode
	 */
	_estimateDuration(layerState, pos) {
		const now = Date.now()
		const est = layerState.estimation

		if (pos < 0.002) {
			est.prevPos = pos
			est.prevTime = now
			return
		}
		if (est.prevPos === 0 || est.prevTime === 0) {
			est.prevPos = pos
			est.prevTime = now
			return
		}

		const deltaPos = pos - est.prevPos
		const deltaTime = (now - est.prevTime) / 1000
		est.prevPos = pos
		est.prevTime = now

		if (deltaPos <= 0 || deltaTime <= 0) return

		const sampleDuration = deltaTime / deltaPos
		if (sampleDuration < 0.5 || sampleDuration > 86400) return

		est.samples.push(sampleDuration)
		if (est.samples.length > 10) est.samples.shift()

		if (est.samples.length >= 3) {
			const avg = est.samples.reduce((a, b) => a + b, 0) / est.samples.length
			const consistent = est.samples.every((s) => Math.abs(s - avg) / avg < 0.1)
			if (consistent) {
				est.estimatedDurationSec = avg
				layerState.clip.duration = avg / MAX_RANGE
				layerState.clip.durationEstimated = true
				est.settled = true
			}
		}
	}

	_resetEstimation(layerState) {
		layerState.estimation = { prevPos: 0, prevTime: 0, samples: [], estimatedDurationSec: 0, settled: false }
	}

	// ──────────────────────────────────────────────────────────────────────────
	// Position Prediction
	// ──────────────────────────────────────────────────────────────────────────

	/**
	 * Predict current clip position by linear extrapolation from last OSC sample.
	 * Falls back to raw clip.position if duration unknown or data is stale (>3s).
	 *
	 *   pos = lastOscPos + elapsed_s * speed / durationSec
	 */
	_predictPosition(ls) {
		const clip = ls.clip
		const rawPos = isFinite(clip.position) ? clip.position : 0
		if (clip.duration === 0 || ls.lastPositionTime === 0) return rawPos
		const dt = (Date.now() - ls.lastPositionTime) / 1000
		if (dt > STALE_THRESHOLD_S) return rawPos  // stale — don't over-predict
		const durationSec = clip.duration * MAX_RANGE
		const speed = clip.speed > 0 ? clip.speed : 1.0
		const predicted = ls.lastOscPos + (dt * speed) / durationSec
		return isFinite(predicted) ? Math.min(1.0, Math.max(0.0, predicted)) : rawPos
	}

	// ──────────────────────────────────────────────────────────────────────────
	// State Accessors
	// ──────────────────────────────────────────────────────────────────────────

	getOrCreateLayer(layer) {
		if (!this.layers.has(layer)) {
			this.layers.set(layer, {
				lastPositionTime: 0,    // ms timestamp of last OSC position message
				lastOscPos: 0,          // raw position at lastPositionTime (prediction base)
				clip: {
					activeClip: 0, connected: 0, position: 0, duration: 0,
					durationEstimated: false, speed: 0, name: '', playmode: '',
				},
				estimation: { prevPos: 0, prevTime: 0, samples: [], estimatedDurationSec: 0, settled: false },
			})
			if (layer > OSC_DEFAULT_LAYERS) this.instance.updateVariables()
			this._schedulePresetsUpdate()
		}
		return this.layers.get(layer)
	}

	/** Debounced presets update — coalesces rapid layer discoveries into one call */
	_schedulePresetsUpdate() {
		if (this._presetsUpdateTimer) return
		this._presetsUpdateTimer = setTimeout(() => {
			this._presetsUpdateTimer = null
			try { this.instance.updatePresets() } catch (e) {
				this.instance.log('debug', `updatePresets: ${e.message}`)
			}
		}, 1000)
	}

	getActiveClip(layer) {
		return this.layers.get(layer)?.clip
	}

	getLayerDurationSeconds(layer) {
		const clip = this.getActiveClip(layer)
		if (!clip || clip.duration === 0) return 0
		return clip.duration * MAX_RANGE
	}

	getLayerElapsedSeconds(layer) {
		const ls = this.layers.get(layer)
		if (!ls?.clip.duration) return 0
		return this._predictPosition(ls) * ls.clip.duration * MAX_RANGE
	}

	getLayerRemainingSeconds(layer) {
		const ls = this.layers.get(layer)
		if (!ls?.clip.duration) return 0
		return Math.max(0, (1 - this._predictPosition(ls)) * ls.clip.duration * MAX_RANGE)
	}

	getLayerProgress(layer) {
		const ls = this.layers.get(layer)
		return ls ? this._predictPosition(ls) : 0
	}

	getActiveClipColumn(layer) {
		const clip = this.getActiveClip(layer)
		if (!clip || clip.activeClip === 0) return undefined
		return clip.activeClip
	}

	/**
	 * Returns the playmode integer (0-4) of the active clip on this layer, or -1 if unknown.
	 * 0=Loop, 1=Bounce, 2=Random, 3=Once&Clear, 4=Once&Hold
	 */
	getLayerPlaymode(layer) {
		const clip = this.getActiveClip(layer)
		if (!clip) return -1
		const pm = clip.playmode
		if (pm === '' || pm === undefined || pm === null) return -1
		const pmInt = parseInt(pm)
		if (!isNaN(pmInt)) return pmInt
		// String fallback
		const s = String(pm).toLowerCase()
		if (s === 'loop') return PM_LOOP
		if (s === 'bounce' || s === 'ping pong') return PM_BOUNCE
		if (s === 'random') return PM_RANDOM
		return 3  // default to once
	}

	/**
	 * Returns true if the active clip on this layer repeats indefinitely (Loop or Bounce).
	 * Random is NOT treated as looping — it has no fixed endpoint but bar still moves.
	 */
	isLayerLooping(layer) {
		const pm = this.getLayerPlaymode(layer)
		return pm === PM_LOOP || pm === PM_BOUNCE
	}

	getAllRegisteredLayers() {
		return this.registeredLayers
	}

	// ──────────────────────────────────────────────────────────────────────────
	// Formatting Utilities
	// ──────────────────────────────────────────────────────────────────────────

	secondsToTimecode(totalSeconds) {
		const negative = totalSeconds < 0
		const abs = Math.abs(totalSeconds)
		const h = Math.floor(abs / 3600)
		const m = Math.floor((abs % 3600) / 60)
		const s = Math.floor(abs % 60)
		const prefix = negative ? '-' : ''
		if (h > 0) {
			return `${prefix}${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
		}
		return `${prefix}${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
	}

	// ──────────────────────────────────────────────────────────────────────────
	// Variable Updates
	// ──────────────────────────────────────────────────────────────────────────

	updateLayerVariables(layer) {
		const ls = this.layers.get(layer)
		if (!ls) return
		const clip = ls.clip
		const pos = this._predictPosition(ls)
		const durationSec = clip.duration * MAX_RANGE
		const elapsedSec = durationSec > 0 ? pos * durationSec : 0
		const remainingSec = durationSec > 0 ? Math.max(0, (1 - pos) * durationSec) : 0

		// Progress bar image/color is recomputed every tick (5/sec) so it animates
		// smoothly and reacts immediately to threshold crossings — it was previously
		// gated by the same once-per-second throttle as the text variables below,
		// which made the bar appear frozen between integer-second boundaries.
		this.instance.checkFeedbacks('oscProgressBar')

		// Text variables (timecode, seconds, %) only change on integer-second
		// boundaries, so they + preset_slot feedbacks stay throttled to ~1/sec/layer.
		const ri = Math.floor(remainingSec)
		if (this.lastRemainingInt.get(layer) === ri) return

		this.lastRemainingInt.set(layer, ri)
		const prefix = `osc_layer_${layer}`
		try {
			this.instance.setVariableValues({
				[`${prefix}_elapsed`]: this.secondsToTimecode(elapsedSec),
				[`${prefix}_elapsed_seconds`]: Math.round(elapsedSec).toString(),
				[`${prefix}_duration`]: this.secondsToTimecode(durationSec),
				[`${prefix}_remaining`]: this.secondsToTimecode(remainingSec),
				[`${prefix}_remaining_seconds`]: Math.ceil(remainingSec).toString(),
				[`${prefix}_progress`]: (pos * 100).toFixed(0),
				[`${prefix}_clip_name`]: clip.name,
				[`${prefix}_playmode`]: clip.playmode,
			})
		} catch (e) {
			this.instance.log('warn', `OscState: setVariableValues failed: ${e.message}`)
		}
		this.instance.checkFeedbacks('preset_slot')
	}

	// ──────────────────────────────────────────────────────────────────────────
	// Master timer — prediction + blink (single interval)
	// ──────────────────────────────────────────────────────────────────────────

	/**
	 * Single 200ms interval — updates variables for all active layers.
	 * No blink logic here: blink is handled by dedicated timers in index.js.
	 */
	_startMasterTimer() {
		if (this.masterTimer) return
		this.masterTimer = setInterval(() => {
			try {
				const now = Date.now()
				for (const [layer, ls] of this.layers) {
					if (ls.clip.activeClip <= 0) continue

					this.updateLayerVariables(layer)

					// Unconditional resync — corrects prediction drift and handles custom presets
					// that don't push position via OSC. Fires every RESYNC_INTERVAL_MS ms.
					// Skipped when real-time progress polling is disabled (sensitive networks).
					if (this.instance.getProgressPollingEnabled?.() !== false &&
						ls.clip.duration > 0 && ls.clip.connected >= 2) {
						if (now - (this.lastResyncTime.get(layer) || 0) > RESYNC_INTERVAL_MS) {
							this.lastResyncTime.set(layer, now)
							this._pollPosition(layer, ls.clip.activeClip)
						}
					}
				}
			} catch (e) {
				this.instance.log('warn', `OscState masterTimer: ${e.message}`)
			}
		}, PREDICT_INTERVAL_MS)
	}

	/** Returns true if any non-looping layer has ≤5s remaining (for blink control in index.js) */
	anyLayerNearEnd(thresholdSec = 5) {
		for (const [layer] of this.layers) {
			if (!this.isLayerLooping(layer)) {
				const r = this.getLayerRemainingSeconds(layer)
				if (r > 0 && r <= thresholdSec) return true
			}
		}
		return false
	}

	/**
	 * Lightweight position-only poll for a single clip.
	 * Used as fallback when Arena doesn't push position (custom presets, generators).
	 * Sends ONLY the position query — not the full 5-field info query.
	 */
	_pollPosition(layer, column) {
		const listener = this.instance.getOscListener()
		const cfg = this.instance.getConfig()
		if (!listener) return
		try {
			listener.send(
				{ address: `/composition/layers/${layer}/clips/${column}/transport/position`, args: [{ type: 's', value: '?' }] },
				cfg.host, cfg.port
			)
		} catch (e) {
			// Silently ignore — position poll is best-effort
		}
	}

	// ──────────────────────────────────────────────────────────────────────────
	// OSC Queries — minimal traffic strategy
	// ──────────────────────────────────────────────────────────────────────────

	/**
	 * Per-clip query: position + duration + name + playmode + speed.
	 * Called on clip connect and as periodic drift correction.
	 * Debounced at 1s per layer to prevent query storms.
	 */
	queryClipInfoAndPosition(layer, column) {
		const listener = this.instance.getOscListener()
		const cfg = this.instance.getConfig()
		if (!listener) return
		const now = Date.now()
		if (now - (this.lastQueryTime.get(layer) || 0) < 1000) return
		this.lastQueryTime.set(layer, now)
		const q = [{ type: 's', value: '?' }]
		try {
			listener.send({ address: `/composition/layers/${layer}/clips/${column}/transport/position`, args: q }, cfg.host, cfg.port)
			listener.send({ address: `/composition/layers/${layer}/clips/${column}/transport/position/behaviour/duration`, args: q }, cfg.host, cfg.port)
			listener.send({ address: `/composition/layers/${layer}/clips/${column}/name`, args: q }, cfg.host, cfg.port)
			listener.send({ address: `/composition/layers/${layer}/clips/${column}/transport/position/behaviour/playmode`, args: q }, cfg.host, cfg.port)
			listener.send({ address: `/composition/layers/${layer}/clips/${column}/transport/position/behaviour/speed`, args: q }, cfg.host, cfg.port)
		} catch (e) {
			this.instance.log('debug', `queryClipInfoAndPosition error: ${e.message}`)
		}
	}

	/**
	 * Wildcard query for all clip info — called after column change.
	 */
	queryClipInfoWildcard() {
		const listener = this.instance.getOscListener()
		const cfg = this.instance.getConfig()
		if (!listener) return
		const q = [{ type: 's', value: '?' }]
		// Never query /layers/*/clips/* here. Arena expands that pattern into
		// thousands of replies on large compositions and its UI can lock up.
		if (!this.activeColumn) return
		try {
			listener.send({ address: `/composition/layers/*/clips/${this.activeColumn}/connected`, args: q }, cfg.host, cfg.port)
			// NOTE: position/speed are NOT queried here — wildcard responses for all clips
			// confuse per-layer active clip tracking. Position is pulled per-clip via
			// queryClipInfoAndPosition() triggered by the connected handler.
		} catch (e) {
			this.instance.log('debug', `queryClipInfoWildcard error: ${e.message}`)
		}
	}

	/**
	 * Full initial state query — sent once when the OSC listener starts.
	 */
	_queryInitialState() {
		const listener = this.instance.getOscListener()
		const cfg = this.instance.getConfig()
		if (!listener) return
		const q = [{ type: 's', value: '?' }]
		try {
			listener.send({ address: '/composition/columns/*/connected', args: q }, cfg.host, cfg.port)
			listener.send({ address: '/composition/columns/*/name', args: q }, cfg.host, cfg.port)
			listener.send({ address: '/composition/audio/volume', args: q }, cfg.host, cfg.port)
			listener.send({ address: '/composition/speed', args: q }, cfg.host, cfg.port)
			listener.send({ address: '/composition/layers/*/transition/duration', args: q }, cfg.host, cfg.port)
		} catch (e) {
			this.instance.log('debug', `_queryInitialState error: ${e.message}`)
		}
	}

	/**
	 * Start all timers and fire initial state query.
	 * Called from index.js when OSC listener connects.
	 */
	startPeriodicRefresh() {
		this.stopPeriodicRefresh()
		this._startMasterTimer()
		// Delay initial query to give the UDP socket time to finish binding
		this._initQueryTimer = setTimeout(() => {
			this._initQueryTimer = null
			this._queryInitialState()
		}, 500)
		// Lightweight health check every 30s
		this.refreshInterval = setInterval(() => {
			const listener = this.instance.getOscListener()
			const cfg = this.instance.getConfig()
			if (!listener) return
			const q = [{ type: 's', value: '?' }]
			try {
				listener.send({ address: '/composition/columns/*/connected', args: q }, cfg.host, cfg.port)
				this.queryClipInfoWildcard()
				// Targeted position re-sync for known active clips (no wildcard flood)
				// Skipped when real-time progress polling is disabled (sensitive networks) —
				// connect/name/duration are still queried once per clip change regardless.
				if (this.instance.getProgressPollingEnabled?.() !== false) {
					for (const [layer, ls] of this.layers) {
						if (ls.clip.activeClip > 0 && ls.clip.connected >= 2) {
							this.lastQueryTime.delete(layer)
							this.queryClipInfoAndPosition(layer, ls.clip.activeClip)
						}
					}
				}
			} catch (e) {
				this.instance.log('debug', `health check send error: ${e.message}`)
			}
		}, HEALTH_CHECK_MS)
	}

	stopPeriodicRefresh() {
		if (this.masterTimer) { clearInterval(this.masterTimer); this.masterTimer = null }
		if (this.refreshInterval) { clearInterval(this.refreshInterval); this.refreshInterval = null }
		if (this._initQueryTimer) { clearTimeout(this._initQueryTimer); this._initQueryTimer = null }
		if (this._presetsUpdateTimer) { clearTimeout(this._presetsUpdateTimer); this._presetsUpdateTimer = null }
	}

	// ──────────────────────────────────────────────────────────────────────────
	// Lifecycle
	// ──────────────────────────────────────────────────────────────────────────

	clear() {
		this.layers.clear()
		this.registeredLayers.clear()
		this.activeColumn = 0
		this.columnNames.clear()
		this.lastRemainingInt.clear()
		this.lastQueryTime.clear()
		this.lastResyncTime.clear()
	}

	destroy() {
		this.stopPeriodicRefresh()
		this.clear()
	}
}

module.exports = { OscState, OSC_DEFAULT_LAYERS, MAX_RANGE }

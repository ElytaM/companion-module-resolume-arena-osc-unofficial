"""
Comprehensive fixes for arena-osc:
1. imageBuffer -> base64 string (SDK v2 requirement)
2. affectedProperties - add imageBuffer
3. Velocity-aware smooth nudge replaces fixed _smoothFadeFromTo
4. Size-adaptive button rendering
5. Remove unused ctx params
"""

import re

with open('src/index.js', 'r', encoding='utf-8') as f:
    content = f.read()

# ================================================================
# 1. Fix imageBuffer: add .toString('base64')
# ================================================================
# Both occurrences
content = content.replace(
    'imageBuffer: graphics.bar(barOptions),\n\t\t\t\t\t\t\timageBufferEncoding: { pixelFormat: \'ARGB\' },',
    "imageBuffer: graphics.bar(barOptions).toString('base64'),\n\t\t\t\t\t\t\timageBufferEncoding: { pixelFormat: 'ARGB' },"
)
content = content.replace(
    'imageBuffer: graphics.bar(barOptions),\n\t\t\t\t\t\timageBufferEncoding: { pixelFormat: \'ARGB\' },',
    "imageBuffer: graphics.bar(barOptions).toString('base64'),\n\t\t\t\t\t\timageBufferEncoding: { pixelFormat: 'ARGB' },"
)
# Also handle any other occurrences
content = content.replace(
    "imageBuffer: graphics.bar(barOptions),",
    "imageBuffer: graphics.bar(barOptions).toString('base64'),"
)
count_base64 = content.count(".toString('base64')")
print(f'imageBuffer base64 fixes: {count_base64}')

# ================================================================
# 2. Fix affectedProperties - add 'imageBuffer'
# ================================================================
content = content.replace(
    "affectedProperties: ['text', 'size', 'bgcolor', 'color'],",
    "affectedProperties: ['text', 'size', 'bgcolor', 'color', 'imageBuffer'],"
)
content = content.replace(
    "affectedProperties: ['bgcolor', 'color'],",
    "affectedProperties: ['bgcolor', 'color', 'imageBuffer'],"
)
print('affectedProperties updated')

# ================================================================
# 3. Replace _smoothFadeFromTo with velocity-aware _smoothNudge
# ================================================================

OLD_SMOOTH_FROM_TO = '''	// Smooth fade with an EXPLICIT fromVal that is independent of the cached arenaX
	// variables (which have already been pre-committed to toVal by the nudge helper).
	// Sends 6 OSC messages over 120ms from fromVal to toVal so Arena moves gradually.
	// Cancels any in-progress fade for the same path before starting a new one.
	_smoothFadeFromTo(path, fromVal, toVal, durationMs = 120, numSteps = 6) {
		if (this._fadeTimers[path]) { clearInterval(this._fadeTimers[path]); delete this._fadeTimers[path] }
		if (Math.abs(fromVal - toVal) < 1e-6) {
			this._sendOSC(path, [{ type: 'f', value: toVal }])
			return
		}
		const delta = toVal - fromVal
		const stepInterval = Math.max(16, Math.round(durationMs / numSteps))
		let s = 0
		this._fadeTimers[path] = setInterval(() => {
			s++
			const val = Math.max(0, Math.min(1, fromVal + delta * (s / numSteps)))
			this._sendOSC(path, [{ type: 'f', value: val }])
			if (s >= numSteps) {
				clearInterval(this._fadeTimers[path])
				delete this._fadeTimers[path]
			}
		}, stepInterval)
	}'''

NEW_SMOOTH_NUDGE = '''	// Velocity-aware smooth nudge: sends intermediate OSC values between encoder events.
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
	}'''

if OLD_SMOOTH_FROM_TO in content:
    content = content.replace(OLD_SMOOTH_FROM_TO, NEW_SMOOTH_NUDGE)
    print('Replaced _smoothFadeFromTo with _smoothNudge')
else:
    print('WARNING: Could not find _smoothFadeFromTo to replace')

# ================================================================
# 4. Update nudge methods to use _smoothNudge instead of conditional smooth/direct
# ================================================================

# _nudgeAudioVolume
OLD_NUDGE_VOL = '''	async _nudgeAudioVolume(dir, minStep, maxStep, smooth = false) {
		const step = this._calcVelocityStep(`audio_vol_${dir}`, minStep, maxStep)
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
		if (smooth) {
			this._smoothFadeFromTo('/composition/audio/volume', fromVal, newVal)
		} else {
			await this._sendOSC('/composition/audio/volume', [{ type: 'f', value: newVal }])
		}
	}'''

NEW_NUDGE_VOL = '''	async _nudgeAudioVolume(dir, minStep, maxStep) {
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
	}'''

if OLD_NUDGE_VOL in content:
    content = content.replace(OLD_NUDGE_VOL, NEW_NUDGE_VOL)
    print('Updated _nudgeAudioVolume')
else:
    print('WARNING: Could not find _nudgeAudioVolume')

# _nudgeMasterOpacity
OLD_NUDGE_MASTER = '''	async _nudgeMasterOpacity(dir, minStep, maxStep, smooth = false) {
		const step = this._calcVelocityStep(`master_op_${dir}`, minStep, maxStep)
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
		if (smooth) {
			this._smoothFadeFromTo('/composition/video/opacity', fromVal, newVal)
		} else {
			await this._sendOSC('/composition/video/opacity', [{ type: 'f', value: newVal }])
		}
	}'''

NEW_NUDGE_MASTER = '''	async _nudgeMasterOpacity(dir, minStep, maxStep) {
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
	}'''

if OLD_NUDGE_MASTER in content:
    content = content.replace(OLD_NUDGE_MASTER, NEW_NUDGE_MASTER)
    print('Updated _nudgeMasterOpacity')
else:
    print('WARNING: Could not find _nudgeMasterOpacity')

# _nudgeSpeed
OLD_NUDGE_SPEED = '''	async _nudgeSpeed(dir, minStep, maxStep, smooth = false) {
		const step = this._calcVelocityStep(`speed_${dir}`, minStep, maxStep)
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
		if (smooth) {
			this._smoothFadeFromTo('/composition/speed', fromVal, newVal)
		} else {
			await this._sendOSC('/composition/speed', [{ type: 'f', value: newVal }])
		}
	}'''

NEW_NUDGE_SPEED = '''	async _nudgeSpeed(dir, minStep, maxStep) {
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
	}'''

if OLD_NUDGE_SPEED in content:
    content = content.replace(OLD_NUDGE_SPEED, NEW_NUDGE_SPEED)
    print('Updated _nudgeSpeed')
else:
    print('WARNING: Could not find _nudgeSpeed')

# ================================================================
# 5. Update arena_control_slot_rotate - remove smooth params
# ================================================================
# Remove the smooth=true params from arena_control_slot_rotate
content = content.replace(
    'if (tool.id === \'volume\')    return this._nudgeAudioVolume(dir, minStep, maxStep)\n\t\t\tif (tool.id === \'master\')    return this._nudgeMasterOpacity(dir, minStep * 0.5, maxStep * 0.5)\n\t\t\tif (tool.id === \'speed_ctrl\') return this._nudgeSpeed(dir, minStep * 0.7, maxStep * 0.7)',
    'if (tool.id === \'volume\')     return this._nudgeAudioVolume(dir, minStep, maxStep)\n\t\t\tif (tool.id === \'master\')     return this._nudgeMasterOpacity(dir, minStep * 0.5, maxStep * 0.5)\n\t\t\tif (tool.id === \'speed_ctrl\') return this._nudgeSpeed(dir, minStep * 0.7, maxStep * 0.7)'
)

# ================================================================
# 6. Fix size-adaptive rendering in oscProgressBar
# ================================================================
OLD_PROGRESS_BAR_RENDER = '''				const width = feedback.image?.width ?? 72
				const height = feedback.image?.height ?? 72
				// Looping clips show 100% bar (always full)
				const progressPercent = isLooping ? 100 : Math.max(0, Math.min(100, (progress || 0) * 100))

				const barOptions = {
					width,
					height,
					colors: [{ size: 100, color: barColor, background: barColor, backgroundOpacity: 64 }],
					barLength: width - 10,
					barWidth: 8,
					value: progressPercent,
					type: 'horizontal',
					offsetX: 5,
					offsetY: height > 58 ? height - 10 : height - 12,
					opacity: 255,
				}

				return {
					imageBuffer: graphics.bar(barOptions),
					imageBufferEncoding: { pixelFormat: 'ARGB' },
				}'''

NEW_PROGRESS_BAR_RENDER = '''				const width = feedback.image?.width ?? 72
				const height = feedback.image?.height ?? 72
				// Looping clips show 100% bar (always full)
				const progressPercent = isLooping ? 100 : Math.max(0, Math.min(100, (progress || 0) * 100))
				// Scale bar height with button size (taller buttons → thicker bar)
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
				}'''

if OLD_PROGRESS_BAR_RENDER in content:
    content = content.replace(OLD_PROGRESS_BAR_RENDER, NEW_PROGRESS_BAR_RENDER)
    print('Updated oscProgressBar size-adaptive rendering')
else:
    print('WARNING: Could not find oscProgressBar bar render block')

# ================================================================
# 7. Fix preset_slot progress bar size-adaptive rendering
# ================================================================
OLD_PRESET_BAR = '''						const w = feedback.image?.width ?? 72
						const h = feedback.image?.height ?? 72
						const barOptions = {
							width: w, height: h,
							colors: [{ size: 100, color: barColor, background: barColor, backgroundOpacity: 64 }],
							barLength: w - 10, barWidth: 8, value: progressPercent,
							type: 'horizontal', offsetX: 5,
							offsetY: h > 58 ? h - 10 : h - 12,
							opacity: 255,
						}'''

NEW_PRESET_BAR = '''						const w = feedback.image?.width ?? 72
						const h = feedback.image?.height ?? 72
						const barH = Math.max(4, Math.round(h / 10))
						const barOptions = {
							width: w, height: h,
							colors: [{ size: 100, color: barColor, background: barColor, backgroundOpacity: 64 }],
							barLength: w - Math.round(w / 14), barWidth: barH, value: progressPercent,
							type: 'horizontal', offsetX: Math.round(w / 14),
							offsetY: h - barH - 2,
							opacity: 255,
						}'''

if OLD_PRESET_BAR in content:
    content = content.replace(OLD_PRESET_BAR, NEW_PRESET_BAR)
    print('Updated preset_slot bar size-adaptive rendering')
else:
    print('WARNING: Could not find preset_slot bar render block')

# Also fix the .toString in the preset_slot return
OLD_PRESET_RETURN = '''						return {
							text: line2 ? `${dispLabel}${timerSep}${line2}` : dispLabel,
							bgcolor: bgColor, color: this._rgb(255, 255, 255), size: '14',
							imageBuffer: graphics.bar(barOptions),
							imageBufferEncoding: { pixelFormat: 'ARGB' },
						}'''

NEW_PRESET_RETURN = '''						// Adaptive text size based on button height
						const textSize = h >= 120 ? '24' : h >= 90 ? '18' : '14'
						return {
							text: line2 ? `${dispLabel}${timerSep}${line2}` : dispLabel,
							bgcolor: bgColor, color: this._rgb(255, 255, 255), size: textSize,
							imageBuffer: graphics.bar(barOptions).toString('base64'),
							imageBufferEncoding: { pixelFormat: 'ARGB' },
						}'''

if OLD_PRESET_RETURN in content:
    content = content.replace(OLD_PRESET_RETURN, NEW_PRESET_RETURN)
    print('Updated preset_slot adaptive text size')
else:
    print('WARNING: Could not find preset_slot return block')

# ================================================================
# 8. Remove unused ctx params from boolean feedbacks
# ================================================================
# Clean up callback signatures that declare ctx but don't use it
content = re.sub(r'callback: async \(fb, ctx\) => \{', 'callback: async (fb) => {', content)
content = re.sub(r'callback: async \(feedback, ctx\) => \{', 'callback: async (feedback) => {', content)
print('Cleaned up unused ctx params')

# ================================================================
# 9. Remove stray comment line about smooth parameter
# ================================================================
content = content.replace(
    '	// smooth=true: pre-commits the target value then calls _smoothFadeFromTo so that\n\t//   rapid rotation events accumulate correctly (each event starts from the\n\t//   previously committed target, not from a mid-fade intermediate value).\n\t// staleness: if param was unused for >3s, re-query from Arena to correct drift.',
    '\t// All nudges use velocity-aware smooth interpolation via _smoothNudge.\n\t// staleness: if param was unused for >3s, re-query from Arena to correct drift.'
)

# Fix the comment block before nudge methods
content = content.replace(
    '	// Shared velocity-nudge math for the Control Panel\'s rotary-redirect targets.\n\t// Reused directly by the arena_audio_volume_nudge / arena_master_opacity_nudge\n\t// actions so their "menu active" guard and their normal behavior share one path.\n\t// Smooth nudge helpers for VOL/MASTER/SPEED in panel context.',
    '\t// Shared velocity-nudge with smooth interpolation for VOL/MASTER/SPEED.\n\t// Used by both control panel rotary and direct encoder actions.'
)

# ================================================================
# Verify no _smoothFadeFromTo references remain
# ================================================================
remaining = content.count('_smoothFadeFromTo')
print(f'Remaining _smoothFadeFromTo references: {remaining}')
remaining_base64 = content.count("graphics.bar(barOptions).toString('base64')")
print(f'imageBuffer base64 conversions: {remaining_base64}')

with open('src/index.js', 'w', encoding='utf-8') as f:
    f.write(content)

print('\nAll changes applied successfully')

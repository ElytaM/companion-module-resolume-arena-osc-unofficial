"""
One-time source migration for arena-osc:
1. Remove lock/wait animation code
2. Fix progress polling (don't reset override on reconnect)
3. Change progress_polling_enabled default to false
4. Add multi-relay support (relays 2-5)
5. Fix port 0.0.0.0 relay crash
"""

import re

with open('src/index.js', 'r', encoding='utf-8') as f:
    content = f.read()

# ============================================================
# 1. Remove lock/wait state from constructor
# ============================================================
content = content.replace(
    "\t\t// Lock / Wait-mode animation grid\n\t\tthis._lockModeActive = false\n\t\tthis._lockAnimTimer = null\n",
    ""
)

# ============================================================
# 2. Remove lock/wait cleanup from destroy()
# ============================================================
content = content.replace(
    "\t\t// Clear lock/wait-mode animation timer\n\t\tif (this._lockAnimTimer) { clearInterval(this._lockAnimTimer); this._lockAnimTimer = null }\n",
    ""
)

# ============================================================
# 3. Remove lock_grid field checks in configUpdated
# ============================================================
content = content.replace(
    """\t\t\t\tprevConfig.lock_grid_rows !== config.lock_grid_rows ||
\t\t\t\tprevConfig.lock_grid_cols !== config.lock_grid_cols) {""",
    ""
)

# ============================================================
# 4. Fix progress polling - don't reset override on reconnect
# ============================================================
content = content.replace(
    "\t\t// Reset runtime progress-polling override — a real reconnect should follow the config checkbox again\n\t\tthis._progressPollingOverride = null\n\n",
    ""
)

# ============================================================
# 5. Remove Lock/Wait config fields section
# ============================================================
# Find and remove the lock/wait config section
lock_config_start = "\n\t\t\t// ── Lock / Wait-mode animation grid"
lock_config_end = "\t\t{ type: 'number', id: 'lock_grid_speed_ms', label: 'Speed (ms per step)', width: 4, default: 100, min: 30, max: 1000 },"
idx_start = content.find(lock_config_start)
idx_end = content.find(lock_config_end) + len(lock_config_end)
if idx_start >= 0 and idx_end > idx_start:
    content = content[:idx_start] + "\n" + content[idx_end:]
    print("Removed lock/wait config fields")
else:
    print("WARNING: Could not find lock/wait config fields")

# ============================================================
# 6. Change progress_polling_enabled default to false
# ============================================================
content = content.replace(
    "type: 'checkbox', id: 'progress_polling_enabled',\n\t\t\t\tlabel: 'Enable real-time clip progress polling', width: 12, default: true,",
    "type: 'checkbox', id: 'progress_polling_enabled',\n\t\t\t\tlabel: 'Enable real-time clip progress polling', width: 12, default: false,"
)

# ============================================================
# 7. Remove Lock/Wait methods (_lockGridSize, _lockAnimIntensity, etc.)
# ============================================================
lock_methods_start = "\t// ---------------------------------------------------------------------------\n\t// Lock / Wait-mode animation grid"
lock_methods_end = "\t// Keeps arena_control_panel_active and arena_rotary_target variables"
idx_start = content.find(lock_methods_start)
idx_end = content.find(lock_methods_end)
if idx_start >= 0 and idx_end > idx_start:
    content = content[:idx_start] + "\n\t" + content[idx_end:]
    print("Removed lock/wait methods")
else:
    print("WARNING: Could not find lock/wait methods")

# ============================================================
# 8. Remove lock tool from CONTROL_TOOLS array
# ============================================================
content = content.replace(
    "\t\t{ id: 'lock', label: 'LOCK\\nWAIT' },\n",
    ""
)
# Also try without the lock entry
content = content.replace(
    "\t\t\t{ id: 'lock', label: 'LOCK\\nWAIT' },\n",
    ""
)

# ============================================================
# 9. Remove lock actions (arena_lock_mode_activate, arena_lock_grid_press)
# ============================================================
# Find arena_lock_mode_activate action
lock_action1_marker = "\t\t\tarena_lock_mode_activate: {"
lock_action2_marker = "\t\t\tarena_lock_grid_press: {"
next_action_after_lock = "\t\t\tarena_control_slot_rotate: {"

idx1 = content.find(lock_action1_marker)
idx_next = content.find(next_action_after_lock)
if idx1 >= 0 and idx_next > idx1:
    content = content[:idx1] + content[idx_next:]
    print("Removed lock actions")
else:
    print(f"WARNING: Could not remove lock actions: idx1={idx1}, idx_next={idx_next}")

# ============================================================
# 10. Remove arena_lock_grid_cell feedback
# ============================================================
lock_fb_marker = "\t\t\tarena_lock_grid_cell: {"
next_fb_marker = "\t\t\tarena_lock_grid_cell"  # find it
# Find start and end of this feedback
idx_start = content.find(lock_fb_marker)
if idx_start >= 0:
    # Find the next top-level feedback key at the same indent level
    # Look for next "\t\t\t" entry or end of feedbacks object
    search_from = idx_start + len(lock_fb_marker)
    # Find closing brace of this feedback entry
    depth = 1
    i = content.find('{', idx_start + len(lock_fb_marker))  # find the opening {
    while i < len(content) and depth > 0:
        i += 1
        if content[i] == '{': depth += 1
        elif content[i] == '}': depth -= 1
    # i now points to the closing } of the feedback
    # Find end of this entry (comma + newline)
    end_idx = content.find('\n', i) + 1
    content = content[:idx_start] + content[end_idx:]
    print("Removed arena_lock_grid_cell feedback")
else:
    print("WARNING: Could not find arena_lock_grid_cell feedback")

# ============================================================
# 11. Remove lock/wait presets section
# ============================================================
lock_presets_start = "\t\t// ── Lock / Wait-mode animation grid ─────────────────────────────────────────"
lock_presets_end = "\t\t// ── OSC Transport presets"
idx_start = content.find(lock_presets_start)
idx_end = content.find(lock_presets_end)
if idx_start >= 0 and idx_end > idx_start:
    content = content[:idx_start] + "\t\t" + content[idx_end:]
    print("Removed lock/wait presets")
else:
    print("WARNING: Could not find lock/wait presets section")

# ============================================================
# 12. Remove _lockMode checks in configUpdated
# ============================================================
# Remove the configUpdated block checking lock_grid_rows/cols
content = content.replace(
    """\t\t\tif (prevConfig.osc_num_layers !== config.osc_num_layers ||
\t\t\t\tprevConfig.osc_num_groups !== config.osc_num_groups ||
\t\t\t\tprevConfig.control_slot_count !== config.control_slot_count ||
\t\t\t\t) {""",
    """\t\t\tif (prevConfig.osc_num_layers !== config.osc_num_layers ||
\t\t\t\tprevConfig.osc_num_groups !== config.osc_num_groups ||
\t\t\t\tprevConfig.control_slot_count !== config.control_slot_count) {"""
)

# ============================================================
# 13. Remove lock case in _runControlTool
# ============================================================
content = content.replace(
    "\t\t\tcase 'lock': {\n\t\t\t\tthis._activateLockMode()\n\t\t\t\tbreak\n\t\t\t}\n",
    ""
)

print("\nFinal checks:")
print("Lock mentions remaining:", content.count("lockMode") + content.count("_lockAnim") + content.count("lock_grid"))
print("lock_grid_rows remaining:", content.count("lock_grid_rows"))

with open('src/index.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("Done")

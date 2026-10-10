"""
Transform setPresetDefinitions to v2 format:
1. Change type: 'button' -> type: 'simple'
2. Build structure from categories
3. Update setPresetDefinitions(presets) -> setPresetDefinitions(structure, presets)
"""

with open('src/index.js', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Change type: 'button' -> type: 'simple' in preset definitions
content = content.replace("type: 'button',", "type: 'simple',")

# 2. Replace the setPresetDefinitions call at the end of updatePresets
# Find and replace the final setPresetDefinitions call
old_call = "\t\tthis.setPresetDefinitions(presets)\n\t}"

new_code = """\t\t// Build structure from category metadata (v2 API)
\t\tconst catMap = {}
\t\tfor (const [id, p] of Object.entries(presets)) {
\t\t\tconst cat = p.category || 'Other'
\t\t\tif (!catMap[cat]) catMap[cat] = []
\t\t\tcatMap[cat].push(id)
\t\t\tdelete p.category
\t\t}
\t\tconst structure = Object.entries(catMap).map(([cat, ids]) => ({
\t\t\tid: cat.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
\t\t\tname: cat,
\t\t\tdefinitions: [{ id: 'all', type: 'simple', name: cat, presets: ids }],
\t\t}))
\t\tthis.setPresetDefinitions(structure, presets)
\t}"""

content = content.replace(old_call, new_code)

print("type 'simple' count:", content.count("type: 'simple'"))
print("setPresetDefinitions calls:", content.count("setPresetDefinitions"))

with open('src/index.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("Done")

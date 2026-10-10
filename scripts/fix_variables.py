import re

with open('src/index.js', 'r', encoding='utf-8') as f:
    content = f.read()

start = content.find('this.setVariableDefinitions([')
depth = 0
i = start + len('this.setVariableDefinitions(')
end = i
while i < len(content):
    c = content[i]
    if c in '([{':
        depth += 1
    elif c in ')]}':
        depth -= 1
        if depth == 0:
            end = i + 1
            break
    i += 1

old_block = content[start:end]
new_block = old_block

# Replace { variableId: 'X', name: 'Y' } with 'X': { name: 'Y' }
new_block = re.sub(
    r"\{ variableId: '([^']+)', name: '([^']+)' \}",
    r"'\1': { name: '\2' }",
    new_block
)

# Change opening [ to {
new_block = new_block.replace('this.setVariableDefinitions([', 'this.setVariableDefinitions({', 1)

# Change ...oscLayerVars spread
new_block = new_block.replace(
    '...oscLayerVars,',
    "...Object.fromEntries(oscLayerVars.map(v => [v.variableId, { name: v.name }])),",
    1
)

# Fix closing bracket: ]) -> })
# Find the last ]) in the block
last_bracket = new_block.rfind('])')
if last_bracket >= 0:
    new_block = new_block[:last_bracket] + '})' + new_block[last_bracket+2:]

content = content[:start] + new_block + content[end:]

# Verify
count_old = content.count('variableId:')
print(f'Remaining variableId: {count_old}')

# Also fix the oscLayerVars definition to use variableId
# Find the oscLayerVars flatMap and check it
idx_layer_vars = content.find('const oscLayerVars = layerNums.flatMap')
print(f'oscLayerVars found at: {idx_layer_vars}')

with open('src/index.js', 'w', encoding='utf-8') as f:
    f.write(content)

print('Done')

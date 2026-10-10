// Deploy script — copies built module to Companion's modules folder
const fs = require('fs')
const path = require('path')
const os = require('os')

const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf-8'))
const manifest = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'companion', 'manifest.json'), 'utf-8'))

const moduleId = manifest.id
const version = pkg.version
const moduleDirName = `${moduleId}-${version}`

const companionModulesDir = path.join(os.homedir(), 'AppData', 'Roaming', 'companion', 'modules')
const targetDir = path.join(companionModulesDir, moduleDirName)

if (!fs.existsSync(companionModulesDir)) {
	console.error(`Companion modules directory not found: ${companionModulesDir}`)
	process.exit(1)
}

// Remove old version if exists
if (fs.existsSync(targetDir)) {
	fs.rmSync(targetDir, { recursive: true, force: true })
	console.log(`Removed old: ${targetDir}`)
}

// Create target directory
fs.mkdirSync(targetDir, { recursive: true })
fs.mkdirSync(path.join(targetDir, 'companion'), { recursive: true })

// Copy files
const filesToCopy = [
	['main.js', 'main.js'],
	['package.json', 'package.json'],
	['companion/manifest.json', 'companion/manifest.json'],
	['companion/HELP.md', 'companion/HELP.md'],
]

const rootDir = path.join(__dirname, '..')

for (const [src, dest] of filesToCopy) {
	const srcPath = path.join(rootDir, src)
	const destPath = path.join(targetDir, dest)
	if (fs.existsSync(srcPath)) {
		fs.copyFileSync(srcPath, destPath)
		console.log(`Copied: ${src} -> ${destPath}`)
	} else {
		console.warn(`Warning: source file not found: ${srcPath}`)
	}
}

console.log(`\nDeployed to: ${targetDir}`)
console.log('Restart Companion to load the module.')

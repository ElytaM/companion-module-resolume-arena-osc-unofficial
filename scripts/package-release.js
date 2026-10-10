// Packages the built module into a release ZIP and .tgz, and populates dist/
// dist/ = full source copy for GitHub (no node_modules, no dev tools, no sensitive files)
const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')
const os = require('os')

const root = path.join(__dirname, '..')
const ver = require(path.join(root, 'package.json')).version
const releaseDir = path.join(root, 'release')
const distDir = path.join(root, 'dist')
const staging = path.join(os.tmpdir(), 'arena-osc-' + ver)

// Stage files (minimal bundle for Companion install)
if (fs.existsSync(staging)) fs.rmSync(staging, { recursive: true })
fs.mkdirSync(path.join(staging, 'companion'), { recursive: true })
fs.copyFileSync(path.join(root, 'main.js'), path.join(staging, 'main.js'))
fs.copyFileSync(path.join(root, 'package.json'), path.join(staging, 'package.json'))
fs.copyFileSync(path.join(root, 'companion', 'manifest.json'), path.join(staging, 'companion', 'manifest.json'))
fs.copyFileSync(path.join(root, 'companion', 'HELP.md'), path.join(staging, 'companion', 'HELP.md'))

if (!fs.existsSync(releaseDir)) fs.mkdirSync(releaseDir, { recursive: true })

// Create release ZIP
const zipPath = path.join(releaseDir, 'arena-osc-' + ver + '.zip')
if (fs.existsSync(zipPath)) fs.rmSync(zipPath)
execSync(`powershell Compress-Archive -Path "${staging}" -DestinationPath "${zipPath}"`)
console.log(`Release ZIP: ${zipPath}  (${Math.round(fs.statSync(zipPath).size / 1024)}KB)`)

// Create .tgz for Companion "Install from file"
const tgzPath = path.join(releaseDir, 'arena-osc-' + ver + '.tgz')
if (fs.existsSync(tgzPath)) fs.rmSync(tgzPath)
const stagingParent = path.dirname(staging)
const stagingDirName = path.basename(staging)
execSync(`tar -czf "${tgzPath}" -C "${stagingParent}" "${stagingDirName}"`)
console.log(`Release TGZ: ${tgzPath}  (${Math.round(fs.statSync(tgzPath).size / 1024)}KB)`)

// ── dist/ = full source tree for GitHub publication ─────────────────────────
// Export only tracked project files; never recursively copy local data.
const { execFileSync } = require('child_process')
const sourceFiles = execFileSync('git', ['ls-files', '-z'], { cwd: root })
  .toString().split('\0').filter(Boolean)
if (!sourceFiles.length) throw new Error('No tracked source files to export')

if (fs.existsSync(distDir)) fs.rmSync(distDir, { recursive: true })
fs.mkdirSync(distDir, { recursive: true })
for (const file of sourceFiles) {
  const dest = path.join(distDir, file)
  fs.mkdirSync(path.dirname(dest), { recursive: true })
  fs.copyFileSync(path.join(root, file), dest)
}
const distFiles = execSync(`powershell (Get-ChildItem -Recurse "${distDir}" -File).Count`).toString().trim()
console.log(`dist/  updated  (${distFiles} files, full source for GitHub)`)

// esbuild configuration for Arena OSC module
const esbuild = require('esbuild')
const path = require('path')
const fs = require('fs')

const isWatch = process.argv.includes('--watch')

const buildOptions = {
	entryPoints: ['src/index.js'],
	bundle: true,
	outfile: 'main.js',
	platform: 'node',
	target: 'node22',
	format: 'cjs',
	// Mark native addons as external — they can't be bundled
	external: ['*.node'],
	// osc.js uses these optional transports; exclude those that need native binaries
	plugins: [],
	logLevel: 'info',
}

if (isWatch) {
	esbuild.context(buildOptions).then((ctx) => {
		ctx.watch()
		console.log('Watching for changes...')
	})
} else {
	esbuild
		.build(buildOptions)
		.then(() => {
			console.log('Build complete: main.js')
		})
		.catch((err) => {
			console.error('Build failed:', err)
			process.exit(1)
		})
}

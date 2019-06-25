import stream from 'stream'
import fs from 'fs'
import path from 'path'
import genOutputPath from './genOutputPath'

export default function (options, ctx) {
	return new Promise((resolve, reject) => {
		const outputPath = genOutputPath(options, ctx, 'README.md')
		const writeable = fs.createWriteStream(outputPath, {
			flags: 'w'
		})
		const template = `
			---
			home: true
			actionText: Start
			actionLink: 
			features:
			- title: TEST
				details: A Vue counter developed using Vue is embedded in this doc, now that's the power of VuePress!
			- title: TEST
				details: This entire doc was basically made with VuePress which parsed markdown files and corresponding assets using webpack.
			footer: TEST IERomanov TEST
			---`

		writeable.write(template)

		writeable.on('error', err => {
			reject(new Error(err))
			process.exit(1);
		})
		writeable.end()
		resolve(true)
	})
}
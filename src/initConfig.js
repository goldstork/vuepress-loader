import stream from 'stream'
import fs from 'fs'
import path from 'path'
import genOutputPath from './genOutputPath'

export default function (options, ctx) {
	return new Promise((resolve, reject) => {
		const outputPath = genOutputPath(options, ctx, '.vuepress/config.js')
		const writeable = fs.createWriteStream(outputPath, {
			flags: 'w'
		})
		const template = `
			module.exports = {
				title: 'Test VuePress Docs generation',
				description: "TryTryTryTryTryTryTry",
				themeConfig:{
					nav: [
						{ text: 'Components', link: '/components/' },
					],
					sidebar: [
						{
							title: 'Counter',
							collapsable: false,
							children: [
								'/components'
							]
						}
					]
				}
			}
		`

		writeable.write(template)

		writeable.on('error', err => {
			reject(new Error(err))
			process.exit(1);
		})
		writeable.end()
		resolve(true)
	})
}
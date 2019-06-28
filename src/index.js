import stream from 'stream'
import fs from 'fs'
import path from 'path'
import { parse } from '@vuedoc/parser'

import loaderUtils from 'loader-utils'
import validateOptions from 'schema-utils'

import schema from './options.json'
import { createFile, createFolder } from './helpers/creator.js';

const ReadmeFile = `
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

const ConfigFile = `
module.exports = {
	title: 'Test VuePress Docs generation',
	description: "TryTryTryTryTryTryTry",
	themeConfig:{
		nav: [
			{ text: 'Components', link: '/components/' },
		],
		sidebar: [
			{
				title: 'Home',
				collapsable: false,
				children: [
					'/'
				]
			},
			{
				title: 'Counter',
				collapsable: false,
				children: [
					'/components'
				]
			}
		]
	}
}`

const appRootPath = process.cwd()

export default async function loader(source) {
	try {
		const options = loaderUtils.getOptions(this) || {}
		const context = options.context || this.rootContext
		const fileName = loaderUtils.interpolateName(this, options.name, { context })

		validateOptions(schema, options, 'VuePress Loader')

		await Promise.all([
			// Create root docs folder
			createFolder(options.outputPath),
			// Create folder for components
			createFolder(`${options.outputPath}/components`),
			// Create .vuepress folder for config
			createFolder(`${options.outputPath}/.vuepress`),

			// Create default config files
			createFile(options.outputPath, 'README.md', ReadmeFile),
			createFile([options.outputPath, '.vuepress'], 'config.js', ConfigFile),
		])

		const componentData = await parse({ filecontent: source.toString('utf8') })

		createFile(
			[options.outputPath, 'components'],
			fileName,
			JSON.stringify(componentData, null, 4)
		)
	} catch (err) {
		process.stdout.cursorTo(0)
		console.error('\nError: ', err)
		process.exit(1)
	}
}

export const raw = true

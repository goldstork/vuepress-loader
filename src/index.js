import stream from 'stream'
import fs from 'fs'
import path from 'path'
import { parse } from '@vuedoc/parser'

import loaderUtils from 'loader-utils'
import validateOptions from 'schema-utils'

import schema from './options.json'
import defaultConfig from './data/vuepressConfig.json'

import { createFile, createFolder } from './helpers/creator'
import Configurator from './helpers/configurator'
import checkPathToExist from './helpers/checkPathToExist'
import configurator from './helpers/configurator'

const config = `
import config from './config.json'
module.exports = config
`

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

const appRootPath = process.cwd()

const Tra

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
			createFile(`${options.outputPath}/.vuepress`, 'config.js', config),
			createFile(`${options.outputPath}/.vuepress`, 'config.json', defaultConfig),
		])

		// const componentData = await parse({ filecontent: source.toString('utf8') })

		// Gen and update default config
		configurator([options.outputPath, '.vuepress', 'config.js'])

		// await createFile(
		// 	[options.outputPath, 'components'],
		// 	fileName,
		// 	JSON.stringify(componentData, null, 4)
		// )
	} catch (err) {
		process.stdout.cursorTo(0)
		console.error('\nError: ', err)
		process.exit(1)
	}
}

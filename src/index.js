import stream from 'stream'
import fs from 'fs'
import path from 'path'
import { parse } from '@vuedoc/parser'

import loaderUtils from 'loader-utils'
import validateOptions from 'schema-utils'

import logger from './utils/logger.js'

import schema from './options.json'
import defaultConfig from './data/vuepressConfig.json'

import { createFile, createFolder } from './helpers/creator'
import checkPathToExist from './helpers/checkPathToExist'
import Configurator from './helpers/configurator.js';

const config = `
const config = require('./config.json');
module.exports = config;
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
let configurator = new Configurator()

export default async function loader(source) {
	try {
		const options = loaderUtils.getOptions(this) || {}
		const context = options.context || this.rootContext
		const fileName = loaderUtils.interpolateName(this, options.name, { context })

		validateOptions(schema, options, 'VuePress Loader')

		// Create root docs folder
		createFolder(options.outputPath)
		// Create folder for components
		createFolder(`${options.outputPath}/components`)
		// Create .vuepress folder for config
		createFolder(`${options.outputPath}/.vuepress`)

		// Create default config files
		createFile(options.outputPath, 'README.md', ReadmeFile)
		createFile(`${options.outputPath}/.vuepress`, 'config.js', config)
		createFile(`${options.outputPath}/.vuepress`, 'config.json', JSON.stringify(defaultConfig, null, 4))

		const componentData = await parse({ filecontent: source.toString('utf8') })
		
		if (!configurator.config) {
			configurator.read([options.outputPath, '.vuepress', 'config.json'])
		}
		configurator.edit(config => {
			config.themeConfig.sidebar.push(fileName)
			return config
		})

		// Create markdown file for component
		createFile(`${options.outputPath}/components`, fileName, JSON.stringify(componentData, null, 4))
	} catch (err) {
		process.stdout.cursorTo(0)
		logger.error(err)
		process.exit(1)
	}
}

export const raw = true

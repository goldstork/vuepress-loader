import fs from 'fs'
import path from 'path'
import { StringDecoder } from 'string_decoder'

import logger from '../utils/logger'

import arrayPathToString from './arrayPathToString'

const decoder = new StringDecoder('utf-8')

class Configurator {
	constructor(initialConfig = {}) {
		this.configContent = initialConfig
	}

	get config() {
		return this.configContent
	}

	reset() {
		this.configContent = {}
	}

	edit(fn) {
		let config = JSON.parse(JSON.stringify(this.configContent)) // Create new nested object
		config = fn(config)
		if (config && config.constructor === Object) {
			this.configContent = config
			return this
		} else {
			const err = new Error('Action should return the modified content of the config type Object!')
			logger.fatal(err)
			throw err
		}
	}

	read(inputPathToFile) {
		if (Array.isArray(inputPathToFile)) {
			inputPathToFile = arrayPathToString(inputPathToFile)
		}
		const fileInfo = path.parse(inputPathToFile)
		if (fileInfo.ext !== '.json') {
			throw new Error('Can read only .json format')
		}
		const bufferConfig = fs.readFileSync(inputPathToFile)
		this.configContent = JSON.parse(decoder.write(bufferConfig))
		logger.success(`File «${fileInfo.base}» read successfully!`)
		return this
	}

	write(outputPathToFile) {
		if (Object.entries(this.configContent).length === 0) throw new Error('First you need to read the file using the Configurator.read() methods. OR pass initial config in constructor')
		if (Array.isArray(outputPathToFile)) {
			outputPathToFile = arrayPathToString(outputPathToFile)
		}
		const fileInfo = path.parse(outputPathToFile)
		if (fileInfo.ext !== '.json') {
			throw new Error('Can read only .json format')
		}
		fs.writeFileSync(outputPathToFile, this.configContent)
		logger.success(`File «${fileInfo.base}» was written successfully!`)
		return this
	}
}

export default Configurator
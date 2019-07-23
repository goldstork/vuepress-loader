import fs from 'fs'
import path from 'path'
import { StringDecoder } from 'string_decoder'

import logger from '../utils/logger'

import arrayPathToString from './arrayPathToString'

const decoder = new StringDecoder('utf-8')

class Configurator {
	constructor(inputPathToFile) {
		this.inputPathToFile = null
		this.configContent = null
		this.fileInfo = null
	}

	get config() {
		let config = this.configContent ? decoder.write(this.configContent) : null
		return JSON.parse(config)
	}

	get configBuffer() {
		return this.configContent
	}

	reset() {
		this.inputPathToFile = null
		this.configContent = null
		this.fileInfo = null
	}

	edit(fn) {
		if (this.outputPathToFile === null || this.configContent === null) throw new Error('First you need to read the file using the Configurator.read() methods.')
		let config = decoder.write(this.configContent)

		config = fn(JSON.parse(config))

		if (config && config.constructor === Object) {
			this.configContent = Buffer.from(JSON.stringify(config))
			return this
		} else {
			const err = new Error('Action should return the modified content of the config type Object!')
			logger.fatal(err)
			throw err
		}
	}

	read(inputPathToFile) {
		try {
			this.inputPathToFile = inputPathToFile
			if (Array.isArray(inputPathToFile)) {
				this.inputPathToFile = arrayPathToString(inputPathToFile)
			}
			this.fileInfo = path.parse(this.inputPathToFile)
			this.configContent = fs.readFileSync(this.inputPathToFile)
			logger.success(`File «${this.fileInfo.base}» read successfully!`)
			return this
		} catch (err) {
			logger.fatal(new Error(err))
		}
	}

	write(outputPathToFile) {
		if (this.configContent === null) throw new Error('First you need to read the file using the Configurator.read() methods.')
		try {
			if (Array.isArray(outputPathToFile)) {
				outputPathToFile = arrayPathToString(outputPathToFile)
			}
			fs.writeFileSync(outputPathToFile, this.configContent)
			logger.success(`File «${this.fileInfo.base}» was written successfully!`)
			return this
		} catch (err) {
			logger.fatal(new Error(err))
		}
	}
}

export default Configurator
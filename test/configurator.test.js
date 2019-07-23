import path from 'path'
import fs from 'fs'
import rimraf from 'rimraf'

import Configurator from '../src/helpers/configurator'

import { pathToTMPFolder, pathToConfig, configName } from './constants/ways'
const outputPath = `${pathToTMPFolder}/${configName}`

const configurator = new Configurator()

describe('Configurator', () => {
	test('should Configurator instance of Configurator', () => {
		expect(configurator).toBeInstanceOf(Configurator)
	})

	test('should get config data after read json file', () => {
		expect(configurator.configBuffer).toStrictEqual(fs.readFileSync(pathToConfig))
	})

	test('should read and Write json file', () => {
		configurator.write(outputPath)
		expect(fs.existsSync(outputPath)).toEqual(true)
	})

	test('should config be edited', () => {
		configurator.edit(config => {
			config.input.name = 'NAme'
			return config
		})
		const prop = configurator.config.input.name
		expect(prop).toEqual('NAme')
	})

	test('should throw error if not return config on edit', () => {
		const err = () => configurator.edit(config => {})
		expect(err).toThrow()
	})

	test('should throw error if return not Object type', () => {
		const err = () => configurator.edit(config => [])
		expect(err).toThrow()
	})

	test('should reset data configurator', () => {
		configurator.reset()
		expect(configurator.config).toEqual(null)
	})
})

beforeAll(() => {
	fs.mkdirSync(pathToTMPFolder)
})

beforeEach(() => {
	configurator.read(pathToConfig)
})

afterAll(() => {
	rimraf.sync(pathToTMPFolder);
	configurator.reset()
})
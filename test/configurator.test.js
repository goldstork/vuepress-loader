import path from 'path'
import fs from 'fs'
import rimraf from 'rimraf'

import Configurator from '../src/helpers/configurator'

import { pathToTMPFolder, pathToConfig, configName } from './constants/ways'

import demoConfig from './data/config.json'

const outputPath = `${pathToTMPFolder}/${configName}`
const initConfig = {
	name: 'name',
	age: 12,
	work: true,
	broken: false,
	obj: {
		one: 1,
		two: 2
	}
}
const configurator = new Configurator(initConfig)

describe('Configurator', () => {
	test('should Configurator instance of Configurator', () => {
		expect(configurator).toBeInstanceOf(Configurator)
	})

	test('should config equal initial config', () => {
		expect(configurator.config).toStrictEqual(initConfig)
	})

	test('should read only .json format', () => {
		const err = () => configurator.read(path.resolve(__dirname, '../data/config.js'))
		expect(err).toThrow()
	})

	test('should get config data after read json file', () => {
		configurator.read(pathToConfig)
		expect(configurator.config).toStrictEqual(demoConfig)
	})

	test('should write file', () => {
		configurator.write(outputPath)
		expect(fs.existsSync(outputPath)).toEqual(true)
	})

	
	test('should write only .json format', () => {
		const err = () => configurator.write(path.resolve(__dirname, '../__tmp__/config.js'))
		expect(err).toThrow()
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
		expect(configurator.config).toStrictEqual({})
	})
})

beforeAll(() => {
	!fs.existsSync(pathToTMPFolder) && fs.mkdirSync(pathToTMPFolder)
})

afterAll(() => {
	rimraf.sync(pathToTMPFolder);
	configurator.reset()
})
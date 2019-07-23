import path from 'path'
import fs from 'fs'
import rimraf from 'rimraf'

import { createFile, createFolder } from '../src/helpers/creator'

import { pathToTMPFolder, pathToConfig, demoFolderName } from './constants/ways'
const filename = 'creatorTest.json'
const outputFolderPath = `${pathToTMPFolder}/${demoFolderName}`

describe('Creator', () => {
	describe('Create Folder', () => {
		test('should create folder', () => {
			createFolder(outputFolderPath)
			expect(fs.existsSync(outputFolderPath)).toEqual(true)
		})

		test('should throw error if path to folder not string', () => {
			const err = () => createFolder(['sss'])
			expect(err).toThrow()
		})
	})

	describe('Create File', () => {
		test('should create file', () => {
			const demoJSON = {
				firstName: 'Ilya',
				lastName: 'Romanov'
			}
			createFile(pathToTMPFolder, filename, JSON.stringify(demoJSON))
			expect(fs.existsSync(`${pathToTMPFolder}/${filename}`)).toEqual(true)
		})

		test('should throw error if path to file not string or not exist', () => {
			const err = () => createFile(['sss'], filename, 'test')
			expect(err).toThrow()
		})
	})

})

beforeAll(() => {
	!fs.existsSync(pathToTMPFolder) && fs.mkdirSync(pathToTMPFolder)
})

afterAll(() => {
	rimraf.sync(pathToTMPFolder);
})
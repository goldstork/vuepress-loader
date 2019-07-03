import stream from 'stream'
import fs from 'fs'
import path from 'path'

import requiredArg from './requiredArg'
import checkPathToExist from './checkPathToExist'
import arrayPathToString from './arrayPathToString'

const createFolderByStringPath = (pathToFolder = requireArg('pathToFolder')) =>
	new Promise((resolve, reject) => {
		try {
			if (!fs.existsSync(pathToFolder)) {
				fs.mkdirSync(pathToFolder, { recursive: true })
			}
			resolve(pathToFolder)
		} catch (err) {
			reject(err)
		}
	})

export const createFolder = (pathToFolder = requireArg('pathToFolder')) =>
	new Promise((resolve, reject) => {
		let outputPath

		if (!checkPathToExist(pathToFolder)) {
			outputPath = createFolderByStringPath(pathToFolder)
		}

		if (outputPath && checkPathToExist(outputPath)) resolve(true)
		// ToDo: change it
		else reject(`Unknown error! ${outputPath} not created`)
	})

export const createFile = (
	pathToFolder = requireArg('pathToFolder'),
	filename = requireArg('filename'),
	fileSource = requireArg('fileSource')
) =>
	new Promise((resolve, reject) => {
		let outputPath

		!checkPathToExist(pathToFolder) && createFolderByStringPath(pathToFolder)
		outputPath = path.resolve(pathToFolder, filename)

		if (checkPathToExist(outputPath)) resolve(true) // ToDo: change it

		const writable = fs.createWriteStream(outputPath, {
			flags: 'w',
		})

		writable.write(fileSource)

		writable.on('error', err => {
			reject(new Error(err)) // ToDo: change it
		})
		writable.end()
		resolve(true) // ToDo: change it
	})

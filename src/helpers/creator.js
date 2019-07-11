import stream from 'stream'
import fs from 'fs'
import path from 'path'

import requiredArg from './requiredArg'
import checkPathToExist from './checkPathToExist'
import arrayPathToString from './arrayPathToString'

export const createFolder = (pathToFolder = requireArg('pathToFolder')) => {
	let outputPath

	if (!checkPathToExist(pathToFolder)) {
		if (typeof pathToFolder === 'string') {
			fs.mkdirSync(pathToFolder, { recursive: true })
			outputPath = pathToFolder
		} else {
			throw new Error('Expected string argument')
		}
	} else {
		outputPath = pathToFolder
	}
	return outputPath
}

export const createFile = (
	pathToFolder = requireArg('pathToFolder'),
	filename = requireArg('filename'),
	fileSource = requireArg('fileSource')
) => {
		let outputPath
		const pathToFile = `${pathToFolder}/${filename}`
		if (checkPathToExist(pathToFolder) && typeof pathToFile === 'string') {
			outputPath = path.parse(pathToFile)
		} else {
			throw new Error('Path not exist or expected string argument')
		}

		fs.writeFileSync(`${outputPath.dir}/${outputPath.base}`, fileSource)
		return outputPath
	}

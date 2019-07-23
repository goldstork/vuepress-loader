import stream from 'stream'
import fs from 'fs'
import path from 'path'

import checkPathToExist from './checkPathToExist'
import arrayPathToString from './arrayPathToString'

const createFolder = pathToFolder => {
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

const createFile = (pathToFolder, filename, fileSource) => {
	let outputPath
	const pathToFile = `${pathToFolder}/${filename}`

	if (typeof pathToFile === 'string' && checkPathToExist(pathToFolder)) {
		outputPath = path.parse(pathToFile)
	} else {
		throw new Error('Path not exist or expected string argument')
	}

	fs.writeFileSync(`${outputPath.dir}/${outputPath.base}`, fileSource)
	return outputPath
}

export { createFile, createFolder }

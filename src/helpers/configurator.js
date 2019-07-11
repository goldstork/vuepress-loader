import fs from 'fs'
import path from 'path'
import checkPathToExist from './checkPathToExist'
import { createFolder, createFile } from './creator'
import Transformer from './Transformer'

import arrayPathToString from './arrayPathToString'
import addDataToObject from './addDataToObject'
import { Duplex } from 'stream'


export default async (pathToFile) => {
	let pathInfo
	if (Array.isArray(pathToFile)) {
		pathToFile = arrayPathToString(pathToFile)
		pathInfo = path.parse(pathToFile)
	} else {
		throw new Error('The argument "pathToFile" was expected to be type "Array<String>".')
	}

	const readable = fs.createReadStream(pathToFile)
	const writable = fs.createWriteStream(pathToFile, {
		flags: 'w',
	})

	readable.on('error', err => {
		throw new Error(err)
	})
	writable.on('error', err => {
		throw new Error(err)
	})

	readable
		.pipe(new Transformer(addDataToObject, pathInfo.name ))
		.pipe(writable)
}

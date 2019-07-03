import fs from 'fs'
import path from 'path'
import checkPathToExist from './checkPathToExist'
import { createFolder } from './creator'
import Transformer from './Transformer'

import { ADD_TO_SIDEBAR } from '../constant/configuratorMethods'
import arrayPathToString from './arrayPathToString'

export default (pathToFile, method) => {
	if (Array.isArray(pathToFile)) {
		const pathInfo = path.parse(arrayPathToString(pathToFile))
		pathToFile = arrayPathToString(pathToFile)
	} else if (typeof pathToFile === 'string') {
		const pathInfo = path.parse(pathToFile)
	} else {
		throw new Error(
			'The argument "pathToFile" was expected to be type "String" or "Array<String>".'
		)
	}
	if (!checkPathToExist(pathInfo.dir)) {
		createFolder(pathInfo.dir)
	}
	const readable = fs.createReadStream(pathToFile)
	const writable = fs.createWriteStream(pathToFile, {
		flags: 'w',
	})

	switch (method) {
		case ADD_TO_SIDEBAR:
			readable
				.pipe(new Transformer(addToObject, { prop: 'sidebar', data: pathInfo.name }))
				.pipe(writable)
		default:
			throw new Error('Unknown transform method in Transformer!')
	}
}

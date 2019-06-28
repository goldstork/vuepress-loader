import stream from 'stream'
import fs from 'fs'
import path from 'path'

import requiredArg from "./requiredArg"
import checkPathToExist from "./checkPathToExist"

export const createFolder = (pathToFolder = requireArg('pathToFolder')) =>
	new Promise((resolve, reject) => {
		let outputPath

		if (Array.isArray(pathToFolder)) {
			outputPath = path.resolve(...pathToFolder.filter(path => typeof path === 'string'))
		} else if (typeof pathToFolder === 'string') {
			if (!fs.existsSync(pathToFolder)) {
				fs.mkdirSync(pathToFolder, { recursive: true })
			}
			outputPath = pathToFolder
		} else {
			reject('The argument was expected to be an argument of type String or Array<String>.')
		}

		if (checkPathToExist(outputPath)) resolve(true)// ToDo: change it
		else reject(`Unknown error! ${outputPath} not created `)
	})


export const createFile = (
	pathToFolder = requireArg('pathToFolder'),
	filename = requireArg('filename'),
	fileSource = requireArg('fileSource')
) =>
	new Promise((resolve, reject) => {
		let outputPath

		if (Array.isArray(pathToFolder)) {
			outputPath = path.resolve(
				...pathToFolder.filter(path => typeof path === 'string'),
				filename
			)
		} else if (typeof pathToFolder === 'string') {
			checkPathToExist(pathToFolder)
				? (outputPath = path.resolve(pathToFolder, filename))
				: reject(`${pathToFolder} not exist!`)
		} else {
			reject()
		}

		if (checkPathToExist(outputPath)) resolve(true) // ToDo: change it

		const writeable = fs.createWriteStream(outputPath, {
			flags: 'w',
		})

		writeable.write(fileSource)

		writeable.on('error', err => {
			reject(new Error(err)) // ToDo: change it
		})
		writeable.end()
		resolve(true) // ToDo: change it
	})
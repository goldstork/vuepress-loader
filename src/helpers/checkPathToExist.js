import fs from 'fs'

import requiredArg from "./requiredArg"
import arrayPathToString from './arrayPathToString'

export default (path = requireArg('path')) =>
	new Promise((resolve, reject) => {
		if (Array.isArray(path)) {
			resolve(!fs.existsSync(arrayPathToString(path)))
		} else if (typeof path === 'string') {
			resolve(!fs.existsSync(path))
		}
		throw new Error('The argument was expected to be type "String" or "Array<String>".')
	})

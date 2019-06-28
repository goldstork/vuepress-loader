export default (path = requireArg('path')) =>
	new Promise((resolve, reject) => {
		if (path && typeof path === 'string') {
			resolve(null)
		}
		resolve(!fs.existsSync(path))
	})

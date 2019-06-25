import loaderUtils from 'loader-utils'

export default function (options, fileName = null) {
	const context = options.context || this.rootContext

	const url = loaderUtils.interpolateName(this, fileName ? fileName : options.name, {
		context,
		content: source,
		regExp: options.regExp,
	})

	let outputPath = url

	if (options.outputPath) {
		if (typeof options.outputPath === 'function') {
			outputPath = options.outputPath(url, this.resourcePath, context)
		} else {
			outputPath = path.posix.join(options.outputPath, url)
		}
	}
	return outputPath
}
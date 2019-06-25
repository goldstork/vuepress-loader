import loaderUtils from 'loader-utils'

export default function (options, ctx, fileName = null) {
	const context = options.context || ctx.rootContext

	const url = loaderUtils.interpolateName(ctx, fileName ? fileName : options.name, {
		context,
		content: source,
		regExp: options.regExp,
	})

	let outputPath = url

	if (options.outputPath) {
		if (typeof options.outputPath === 'function') {
			outputPath = options.outputPath(url, ctx.resourcePath, context)
		} else {
			outputPath = path.posix.join(options.outputPath, url)
		}
	}
	return outputPath
}
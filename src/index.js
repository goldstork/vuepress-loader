import stream from 'stream'
import fs from 'fs'
import path from 'path'
import { parse } from '@vuedoc/parser'
import ora from 'ora'

import loaderUtils from 'loader-utils'
import validateOptions from 'schema-utils'

import schema from './options.json'

export default function loader(source) {
	const spinner = ora('Generate docs').start();
	spinner.color = 'green'
	const options = loaderUtils.getOptions(this) || {}

	validateOptions(schema, options, 'VuePress Loader')

	const context = options.context || this.rootContext

	const url = loaderUtils.interpolateName(this, options.name, {
		context,
		source,
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
	
	const componentData = parse(source.toString('utf8'))

	const writeable = fs.createWriteStream(JSON.stringify(outputPath))

	writeable.on('error', err => {
		process.stdout.cursorTo(0);
		process.stdout.write(err);
		spinner.fail('Docs generation faild!!!')
	})

	writeable.on('end', () => {
		process.stdout.cursorTo(0);
		process.stdout.write('Successfully generate docs!');
		spinner.succeed('Successfully generate docs!')
	})

	const componentKeys = []
	JSON.parse(componentData).keys().forEach(key => componentKeys.push(key))
	
	componentKeys.forEach(key => writeable.write(`${key}\n`));
	writeable.end()

	// let publicPath = `__webpack_public_path__ + ${JSON.stringify(outputPath)}`

	// if (options.publicPath) {
	// 	if (typeof options.publicPath === 'function') {
	// 		publicPath = options.publicPath(url, this.resourcePath, context)
	// 	} else {
	// 		publicPath = `${
	// 			options.publicPath.endsWith('/') ? options.publicPath : `${options.publicPath}/`
	// 		}${url}`
	// 	}

	// 	publicPath = JSON.stringify(publicPath)
	// }

	//   if (typeof options.emitFile === 'undefined' || options.emitFile) {
	//     this.emitFile(outputPath, source);
	//   }

	//   return `module.exports = ${publicPath};`;
}

export const raw = true

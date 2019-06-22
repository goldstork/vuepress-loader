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

	try {
		const options = loaderUtils.getOptions(this) || {}	
		validateOptions(schema, options, 'VuePress Loader')
	
		const context = options.context || this.rootContext

		const url = loaderUtils.interpolateName(this, options.name, {
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

		const componentData = parse(source.toString('utf8'))

		if (fs.existsSync(outputPath)) {
			fs.mkdirSync(outputPath);
		}
		const writeable = fs.createWriteStream(outputPath)
		const componentKeys = []
		JSON.parse(componentData).keys().forEach(key => componentKeys.push(key))
		
		componentKeys.forEach(key => writeable.write('test'));

		writeable.on('error', err => {
			process.stdout.cursorTo(0);
			process.stdout.write(err);
			spinner.fail('Docs generation faild!!!')
		})
	
		writeable.on('end', () => {
			process.stdout.cursorTo(0);
			spinner.succeed('Successfully generate docs!')
		})
		writeable.end()
	} catch (err) {
		process.stdout.cursorTo(0);
		console.log("Error: ", err)
		spinner.fail('Docs generation faild!');
		spinner.stop();
		process.exit(1);
	}
}

export const raw = true

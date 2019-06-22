import stream from 'stream'
import fs from 'fs'
import path from 'path'
import { parse } from '@vuedoc/parser'
import ora from 'ora'

import loaderUtils from 'loader-utils'
import validateOptions from 'schema-utils'

import schema from './options.json'

export default function loader(source) {
	try {
		const spinner = ora('Generate docs').start();
		spinner.color = 'green'
	
		const options = loaderUtils.getOptions(this) || {}
	
		validateOptions(schema, options, 'VuePress Loader')
	
		const context = options.context || this.rootContext

		console.log('NAME: ', `${options.name}\n`)
	
		const url = loaderUtils.interpolateName(this, options.name, {
			context,
			content: source,
			regExp: options.regExp,
		})
	
		let outputPath = url

		console.log('outputPath: ', `${outputPath}\n`)
	
		if (options.outputPath) {
			if (typeof options.outputPath === 'function') {
				outputPath = options.outputPath(url, this.resourcePath, context)
			} else {
				outputPath = path.posix.join(options.outputPath, url)
			}
		}
		
		const componentData = parse(source.toString('utf8'))
	
		console.log('outputPath in writeble: ', JSON.stringify(outputPath))
		const writeable = fs.createWriteStream(JSON.stringify(outputPath))
	
		writeable.on('error', err => {
			process.stdout.cursorTo(0);
			process.stdout.write(err);
			spinner.fail('Docs generation faild!!!')
		})
	
		writeable.on('end', () => {
			process.stdout.cursorTo(0);
			spinner.succeed('Successfully generate docs!')
		})
	
		const componentKeys = []
		JSON.parse(componentData).keys().forEach(key => componentKeys.push(key))
		
		componentKeys.forEach(key => writeable.write('test'));
		writeable.end()
	} catch (err) {
		process.stdout.cursorTo(0);
		process.stdout.write(err);
		spinner.fail('Docs generation faild!')
	}
}

export const raw = true

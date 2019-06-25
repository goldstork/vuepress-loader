import stream from 'stream'
import fs from 'fs'
import path from 'path'
import { parse } from '@vuedoc/parser'
import ora from 'ora'

import loaderUtils from 'loader-utils'
import validateOptions from 'schema-utils'

import schema from './options.json'

import genOutputPath from './genOutputPath'
import createMainReadme from './createMainReadme.js'
import initConfig from './initConfig.js';

export default async function loader(source) {
	const spinner = ora('Generate docs').start();
	spinner.color = 'green'

	try {
		const options = loaderUtils.getOptions(this) || {}

		let mainReadmeCreated
		let initConfigCreated

		validateOptions(schema, options, 'VuePress Loader')

		if (!fs.existsSync(options.outputPath)) fs.mkdirSync(options.outputPath);
		if (!fs.existsSync(path.resolve(options.outputPath, 'README.md'))) mainReadmeCreated = await createMainReadme(options, this)
		if (!fs.existsSync(path.resolve(options.outputPath, '.vuepress/config.js'))) initConfigCreated = await initConfig(options, this)

		const outputPath = genOutputPath(options, this)

		const componentData = await parse({filecontent: source.toString('utf8')})

		const writeable = fs.createWriteStream(outputPath, {
			flags: 'w'
		})

		Object.keys(componentData).forEach(key => writeable.write(`#${key}\n`));

		writeable.on('error', err => {
			process.stdout.cursorTo(0);
			process.stdout.write(err);
			spinner.fail('Docs generation faild!!!')
		})
	
		writeable.on('end', () => {
			process.stdout.cursorTo(0);
			spinner.succeed('Successfully generate docs!')
			process.exit(0);
		})
		writeable.end()
	} catch (err) {
		process.stdout.cursorTo(0);
		console.log("Error: ", err)
		spinner.fail('Docs generation faild!');
		process.exit(1);
	}
}

export const raw = true

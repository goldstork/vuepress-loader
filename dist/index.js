"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = loader;
exports.raw = void 0;

var _stream = _interopRequireDefault(require("stream"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _parser = require("@vuedoc/parser");

var _ora = _interopRequireDefault(require("ora"));

var _loaderUtils = _interopRequireDefault(require("loader-utils"));

var _schemaUtils = _interopRequireDefault(require("schema-utils"));

var _options = _interopRequireDefault(require("./options.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ReadmeFile = `
---
home: true
actionText: Start
actionLink: 
features:
- title: TEST
details: A Vue counter developed using Vue is embedded in this doc, now that's the power of VuePress!
- title: TEST
details: This entire doc was basically made with VuePress which parsed markdown files and corresponding assets using webpack.
footer: TEST IERomanov TEST
---`;
const ConfigFile = `
module.exports = {
	title: 'Test VuePress Docs generation',
	description: "TryTryTryTryTryTryTry",
	themeConfig:{
		nav: [
			{ text: 'Components', link: '/components/' },
		],
		sidebar: [
			{
				title: 'Home',
				collapsable: false,
				children: [
					'/'
				]
			},
			{
				title: 'Counter',
				collapsable: false,
				children: [
					'/components'
				]
			}
		]
	}
}`;
const appRootPath = process.cwd();

async function loader(source) {
  const spinner = (0, _ora.default)('Generate docs').start();
  spinner.color = 'green';

  try {
    const options = _loaderUtils.default.getOptions(this) || {};
    const context = options.context || this.rootContext;

    const fileName = _loaderUtils.default.interpolateName(this, options.name, {
      context
    });

    (0, _schemaUtils.default)(_options.default, options, 'VuePress Loader');
    await Promise.all([// Create root docs folder
    createFolder(options.outputPath), // Create folder for components
    createFolder(`${options.outputPath}/components`), // Create .vuepress folder for config
    createFolder(`${options.outputPath}/.vuepress`), // Create default config files
    createFile(options.outputPath, 'README.md', ReadmeFile), createFile([options.outputPath, '.vuepress'], 'config.js', ConfigFile)]);
    const componentData = await (0, _parser.parse)({
      filecontent: source.toString('utf8')
    });
    createFile([options.outputPath, 'components'], fileName, JSON.stringify(componentData, null, 4));
  } catch (err) {
    process.stdout.cursorTo(0);
    console.error('\nError: ', err);
    spinner.fail('Docs generation faild!');
    process.exit(1);
  }
}

const raw = true;
exports.raw = raw;
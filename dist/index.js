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

var _loaderUtils = _interopRequireDefault(require("loader-utils"));

var _schemaUtils = _interopRequireDefault(require("schema-utils"));

var _logger = _interopRequireDefault(require("./utils/logger.js"));

var _options = _interopRequireDefault(require("./options.json"));

var _vuepressConfig = _interopRequireDefault(require("./data/vuepressConfig.json"));

var _creator = require("./helpers/creator");

var _checkPathToExist = _interopRequireDefault(require("./helpers/checkPathToExist"));

var _configurator = _interopRequireDefault(require("./helpers/configurator.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const config = `
const config = require('./config.json');
module.exports = config;
`;
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
const appRootPath = process.cwd();
let configurator = new _configurator.default();

async function loader(source) {
  try {
    const options = _loaderUtils.default.getOptions(this) || {};
    const context = options.context || this.rootContext;

    const fileName = _loaderUtils.default.interpolateName(this, options.name, {
      context
    });

    (0, _schemaUtils.default)(_options.default, options, 'VuePress Loader'); // Create root docs folder

    (0, _creator.createFolder)(options.outputPath); // Create folder for components

    (0, _creator.createFolder)(`${options.outputPath}/components`); // Create .vuepress folder for config

    (0, _creator.createFolder)(`${options.outputPath}/.vuepress`); // Create default config files

    (0, _creator.createFile)(options.outputPath, 'README.md', ReadmeFile);
    (0, _creator.createFile)(`${options.outputPath}/.vuepress`, 'config.js', config);
    (0, _creator.createFile)(`${options.outputPath}/.vuepress`, 'config.json', JSON.stringify(_vuepressConfig.default, null, 4));
    const componentData = await (0, _parser.parse)({
      filecontent: source.toString('utf8')
    });

    if (!configurator.config) {
      configurator.read([options.outputPath, '.vuepress', 'config.json']);
    }

    configurator.edit(config => {
      config.themeConfig.sidebar.push(fileName);
      return config;
    }); // Create markdown file for component

    (0, _creator.createFile)(`${options.outputPath}/components`, fileName, JSON.stringify(componentData, null, 4));
  } catch (err) {
    process.stdout.cursorTo(0);

    _logger.default.error(err);

    process.exit(1);
  }
}

const raw = true;
exports.raw = raw;
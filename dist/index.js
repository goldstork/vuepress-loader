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

var _genOutputPath = _interopRequireDefault(require("./genOutputPath"));

var _createMainReadme = _interopRequireDefault(require("./createMainReadme.js"));

var _initConfig = _interopRequireDefault(require("./initConfig.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function loader(source) {
  const spinner = (0, _ora.default)('Generate docs').start();
  spinner.color = 'green';

  try {
    const options = _loaderUtils.default.getOptions(this) || {};
    let mainReadmeCreated;
    let initConfigCreated;
    (0, _schemaUtils.default)(_options.default, options, 'VuePress Loader');
    if (!_fs.default.existsSync(options.outputPath)) _fs.default.mkdirSync(options.outputPath);
    if (!_fs.default.existsSync(_path.default.resolve(options.outputPath, 'README.md'))) mainReadmeCreated = await (0, _createMainReadme.default)(options, this);
    if (!_fs.default.existsSync(_path.default.resolve(options.outputPath, '.vuepress/config.js'))) initConfigCreated = await (0, _initConfig.default)(options, this);
    const outputPath = (0, _genOutputPath.default)(options, this);
    const componentData = await (0, _parser.parse)({
      filecontent: source.toString('utf8')
    });

    const writeable = _fs.default.createWriteStream(outputPath, {
      flags: 'w'
    });

    Object.keys(componentData).forEach(key => writeable.write(`#${key}\n`));
    writeable.on('error', err => {
      process.stdout.cursorTo(0);
      process.stdout.write(err);
      spinner.fail('Docs generation faild!!!');
    });
    writeable.on('end', () => {
      process.stdout.cursorTo(0);
      spinner.succeed('Successfully generate docs!');
      process.exit(0);
    });
    writeable.end();
  } catch (err) {
    process.stdout.cursorTo(0);
    console.log("Error: ", err);
    spinner.fail('Docs generation faild!');
    process.exit(1);
  }
}

const raw = true;
exports.raw = raw;
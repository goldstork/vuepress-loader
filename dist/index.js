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

async function loader(source) {
  const spinner = (0, _ora.default)('Generate docs').start();
  spinner.color = 'green';

  try {
    const options = _loaderUtils.default.getOptions(this) || {};
    (0, _schemaUtils.default)(_options.default, options, 'VuePress Loader');
    const context = options.context || this.rootContext;

    if (!_fs.default.existsSync(options.outputPath)) {
      _fs.default.mkdirSync(options.outputPath);
    }

    const url = _loaderUtils.default.interpolateName(this, options.name, {
      context,
      content: source,
      regExp: options.regExp
    });

    let outputPath = url;

    if (options.outputPath) {
      if (typeof options.outputPath === 'function') {
        outputPath = options.outputPath(url, this.resourcePath, context);
      } else {
        outputPath = _path.default.posix.join(options.outputPath, url);
      }
    }

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
    spinner.stop();
    process.exit(1);
  }
}

const raw = true;
exports.raw = raw;
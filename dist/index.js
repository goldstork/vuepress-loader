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

function loader(source) {
  const spinner = (0, _ora.default)('Generate docs').start();
  spinner.color = 'green';
  const options = _loaderUtils.default.getOptions(this) || {};
  (0, _schemaUtils.default)(_options.default, options, 'VuePress Loader');
  const context = options.context || this.rootContext;

  const url = _loaderUtils.default.interpolateName(this, options.name, {
    context,
    source,
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

  const componentData = (0, _parser.parse)(source.toString('utf8'));

  const writeable = _fs.default.createWriteStream(JSON.stringify(outputPath));

  writeable.on('error', err => {
    process.stdout.cursorTo(0);
    process.stdout.write(err);
    spinner.fail('Docs generation faild!!!');
  });
  writeable.on('end', () => {
    process.stdout.cursorTo(0);
    process.stdout.write('Successfully generate docs!');
    spinner.succeed('Successfully generate docs!');
  });
  const componentKeys = [];
  JSON.parse(componentData).keys().forEach(key => componentKeys.push(key));
  componentKeys.forEach(key => writeable.write(`${key}\n`));
  writeable.end(); // let publicPath = `__webpack_public_path__ + ${JSON.stringify(outputPath)}`
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

const raw = true;
exports.raw = raw;
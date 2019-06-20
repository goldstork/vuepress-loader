"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = loader;
exports.raw = void 0;

var _path = _interopRequireDefault(require("path"));

var _loaderUtils = _interopRequireDefault(require("loader-utils"));

var _schemaUtils = _interopRequireDefault(require("schema-utils"));

var _options = _interopRequireDefault(require("./options.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function loader(source) {
  const options = _loaderUtils.default.getOptions(this) || {};
  (0, _schemaUtils.default)(_options.default, options, 'VuePress Loader');
  const context = options.context || this.rootContext;

  const url = _loaderUtils.default.interpolateName(this, options.name, {
    context,
    source,
    regExp: options.regExp
  });

  console.log(source); //   let outputPath = url;
  //   if (options.outputPath) {
  //     if (typeof options.outputPath === 'function') {
  //       outputPath = options.outputPath(url, this.resourcePath, context);
  //     } else {
  //       outputPath = path.posix.join(options.outputPath, url);
  //     }
  //   }
  //   let publicPath = `__webpack_public_path__ + ${JSON.stringify(outputPath)}`;
  //   if (options.publicPath) {
  //     if (typeof options.publicPath === 'function') {
  //       publicPath = options.publicPath(url, this.resourcePath, context);
  //     } else {
  //       publicPath = `${
  //         options.publicPath.endsWith('/')
  //           ? options.publicPath
  //           : `${options.publicPath}/`
  //       }${url}`;
  //     }
  //     publicPath = JSON.stringify(publicPath);
  //   }
  //   if (typeof options.emitFile === 'undefined' || options.emitFile) {
  //     this.emitFile(outputPath, source);
  //   }
  //   return `module.exports = ${publicPath};`;
}

const raw = true;
exports.raw = raw;
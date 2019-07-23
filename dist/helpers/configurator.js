"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _string_decoder = require("string_decoder");

var _logger = _interopRequireDefault(require("../utils/logger"));

var _arrayPathToString = _interopRequireDefault(require("./arrayPathToString"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const decoder = new _string_decoder.StringDecoder('utf-8');

class Configurator {
  constructor(initialConfig = {}) {
    this.configContent = initialConfig;
  }

  get config() {
    return this.configContent;
  }

  reset() {
    this.configContent = {};
  }

  edit(fn) {
    let config = JSON.parse(JSON.stringify(this.configContent)); // Create new nested object

    config = fn(config);

    if (config && config.constructor === Object) {
      this.configContent = config;
      return this;
    } else {
      const err = new Error('Action should return the modified content of the config type Object!');

      _logger.default.fatal(err);

      throw err;
    }
  }

  read(inputPathToFile) {
    if (Array.isArray(inputPathToFile)) {
      inputPathToFile = (0, _arrayPathToString.default)(inputPathToFile);
    }

    const fileInfo = _path.default.parse(inputPathToFile);

    if (fileInfo.ext !== '.json') {
      throw new Error('Can read only .json format');
    }

    const bufferConfig = _fs.default.readFileSync(inputPathToFile);

    this.configContent = JSON.parse(decoder.write(bufferConfig));

    _logger.default.success(`File «${fileInfo.base}» read successfully!`);

    return this;
  }

  write(outputPathToFile) {
    if (Object.entries(this.configContent).length === 0) throw new Error('First you need to read the file using the Configurator.read() methods. OR pass initial config in constructor');

    if (Array.isArray(outputPathToFile)) {
      outputPathToFile = (0, _arrayPathToString.default)(outputPathToFile);
    }

    const fileInfo = _path.default.parse(outputPathToFile);

    if (fileInfo.ext !== '.json') {
      throw new Error('Can read only .json format');
    }

    _fs.default.writeFileSync(outputPathToFile, this.configContent);

    _logger.default.success(`File «${fileInfo.base}» was written successfully!`);

    return this;
  }

}

var _default = Configurator;
exports.default = _default;
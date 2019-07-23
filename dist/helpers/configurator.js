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
  constructor(inputPathToFile) {
    this.inputPathToFile = null;
    this.configContent = null;
    this.fileInfo = null;
  }

  get config() {
    let config = this.configContent ? decoder.write(this.configContent) : null;
    return JSON.parse(config);
  }

  get configBuffer() {
    return this.configContent;
  }

  reset() {
    this.inputPathToFile = null;
    this.configContent = null;
    this.fileInfo = null;
  }

  edit(fn) {
    if (this.outputPathToFile === null || this.configContent === null) throw new Error('First you need to read the file using the Configurator.read() methods.');
    let config = decoder.write(this.configContent);
    config = fn(JSON.parse(config));

    if (config && config.constructor === Object) {
      this.configContent = Buffer.from(JSON.stringify(config));
      return this;
    } else {
      const err = new Error('Action should return the modified content of the config type Object!');

      _logger.default.fatal(err);

      throw err;
    }
  }

  read(inputPathToFile) {
    try {
      this.inputPathToFile = inputPathToFile;

      if (Array.isArray(inputPathToFile)) {
        this.inputPathToFile = (0, _arrayPathToString.default)(inputPathToFile);
      }

      this.fileInfo = _path.default.parse(this.inputPathToFile);
      this.configContent = _fs.default.readFileSync(this.inputPathToFile);

      _logger.default.success(`File «${this.fileInfo.base}» read successfully!`);

      return this;
    } catch (err) {
      _logger.default.fatal(new Error(err));
    }
  }

  write(outputPathToFile) {
    if (this.configContent === null) throw new Error('First you need to read the file using the Configurator.read() methods.');

    try {
      if (Array.isArray(outputPathToFile)) {
        outputPathToFile = (0, _arrayPathToString.default)(outputPathToFile);
      }

      _fs.default.writeFileSync(outputPathToFile, this.configContent);

      _logger.default.success(`File «${this.fileInfo.base}» was written successfully!`);

      return this;
    } catch (err) {
      _logger.default.fatal(new Error(err));
    }
  }

}

var _default = Configurator;
exports.default = _default;
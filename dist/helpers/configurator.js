"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _checkPathToExist = _interopRequireDefault(require("./checkPathToExist"));

var _creator = require("./creator");

var _Transformer = _interopRequireDefault(require("./Transformer"));

var _arrayPathToString = _interopRequireDefault(require("./arrayPathToString"));

var _addDataToObject = _interopRequireDefault(require("./addDataToObject"));

var _stream = require("stream");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = async pathToFile => {
  let pathInfo;

  if (Array.isArray(pathToFile)) {
    pathToFile = (0, _arrayPathToString.default)(pathToFile);
    pathInfo = _path.default.parse(pathToFile);
  } else {
    throw new Error('The argument "pathToFile" was expected to be type "Array<String>".');
  }

  const readable = _fs.default.createReadStream(pathToFile);

  const writable = _fs.default.createWriteStream(pathToFile, {
    flags: 'w'
  });

  readable.on('error', err => {
    throw new Error(err);
  });
  writable.on('error', err => {
    throw new Error(err);
  });
  readable.pipe(new _Transformer.default(_addDataToObject.default, pathInfo.name)).pipe(writable);
};

exports.default = _default;
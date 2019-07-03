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

var _configuratorMethods = require("../constant/configuratorMethods");

var _arrayPathToString = _interopRequireDefault(require("./arrayPathToString"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = (pathToFile, method) => {
  if (Array.isArray(pathToFile)) {
    const pathInfo = _path.default.parse((0, _arrayPathToString.default)(pathToFile));

    pathToFile = (0, _arrayPathToString.default)(pathToFile);
  } else if (typeof pathToFile === 'string') {
    const pathInfo = _path.default.parse(pathToFile);
  } else {
    throw new Error('The argument "pathToFile" was expected to be type "String" or "Array<String>".');
  }

  if (!(0, _checkPathToExist.default)(pathInfo.dir)) {
    (0, _creator.createFolder)(pathInfo.dir);
  }

  const readable = _fs.default.createReadStream(pathToFile);

  const writable = _fs.default.createWriteStream(pathToFile, {
    flags: 'w'
  });

  switch (method) {
    case _configuratorMethods.ADD_TO_SIDEBAR:
      readable.pipe(new _Transformer.default(addToObject, {
        prop: 'sidebar',
        data: pathInfo.name
      })).pipe(writable);

    default:
      throw new Error('Unknown transform method in Transformer!');
  }
};

exports.default = _default;
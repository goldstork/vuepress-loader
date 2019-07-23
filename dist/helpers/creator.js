"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createFolder = exports.createFile = void 0;

var _stream = _interopRequireDefault(require("stream"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _checkPathToExist = _interopRequireDefault(require("./checkPathToExist"));

var _arrayPathToString = _interopRequireDefault(require("./arrayPathToString"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const createFolder = pathToFolder => {
  let outputPath;

  if (!(0, _checkPathToExist.default)(pathToFolder)) {
    if (typeof pathToFolder === 'string') {
      _fs.default.mkdirSync(pathToFolder, {
        recursive: true
      });

      outputPath = pathToFolder;
    } else {
      throw new Error('Expected string argument');
    }
  } else {
    outputPath = pathToFolder;
  }

  return outputPath;
};

exports.createFolder = createFolder;

const createFile = (pathToFolder, filename, fileSource) => {
  let outputPath;
  const pathToFile = `${pathToFolder}/${filename}`;

  if (typeof pathToFile === 'string' && (0, _checkPathToExist.default)(pathToFolder)) {
    outputPath = _path.default.parse(pathToFile);
  } else {
    throw new Error('Path not exist or expected string argument');
  }

  _fs.default.writeFileSync(`${outputPath.dir}/${outputPath.base}`, fileSource);

  return outputPath;
};

exports.createFile = createFile;
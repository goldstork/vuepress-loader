"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createFile = exports.createFolder = void 0;

var _stream = _interopRequireDefault(require("stream"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _requiredArg = _interopRequireDefault(require("./requiredArg"));

var _checkPathToExist = _interopRequireDefault(require("./checkPathToExist"));

var _arrayPathToString = _interopRequireDefault(require("./arrayPathToString"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const createFolderByStringPath = (pathToFolder = requireArg('pathToFolder')) => new Promise((resolve, reject) => {
  try {
    if (!_fs.default.existsSync(pathToFolder)) {
      _fs.default.mkdirSync(pathToFolder, {
        recursive: true
      });
    }

    resolve(pathToFolder);
  } catch (err) {
    reject(err);
  }
});

const createFolder = (pathToFolder = requireArg('pathToFolder')) => new Promise((resolve, reject) => {
  let outputPath;

  if (!(0, _checkPathToExist.default)(pathToFolder)) {
    outputPath = createFolderByStringPath(pathToFolder);
  }

  if (outputPath && (0, _checkPathToExist.default)(outputPath)) resolve(true); // ToDo: change it
  else reject(`Unknown error! ${outputPath} not created`);
});

exports.createFolder = createFolder;

const createFile = (pathToFolder = requireArg('pathToFolder'), filename = requireArg('filename'), fileSource = requireArg('fileSource')) => new Promise((resolve, reject) => {
  let outputPath;
  !(0, _checkPathToExist.default)(pathToFolder) && createFolderByStringPath(pathToFolder);
  outputPath = _path.default.resolve(pathToFolder, filename);
  if ((0, _checkPathToExist.default)(outputPath)) resolve(true); // ToDo: change it

  const writable = _fs.default.createWriteStream(outputPath, {
    flags: 'w'
  });

  writable.write(fileSource);
  writable.on('error', err => {
    reject(new Error(err)); // ToDo: change it
  });
  writable.end();
  resolve(true); // ToDo: change it
});

exports.createFile = createFile;
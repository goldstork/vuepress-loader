"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createFile = exports.createFolder = void 0;

var _requiredArg = _interopRequireDefault(require("./requiredArg"));

var _checkPathToExist = _interopRequireDefault(require("./checkPathToExist"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const createFolder = (pathToFolder = requireArg('pathToFolder')) => new Promise((resolve, reject) => {
  let outputPath;

  if (Array.isArray(pathToFolder)) {
    outputPath = path.resolve(...pathToFolder.filter(path => typeof path === 'string'));
  } else if (typeof pathToFolder === 'string') {
    if (!fs.existsSync(pathToFolder)) {
      fs.mkdirSync(pathToFolder, {
        recursive: true
      });
    }

    outputPath = pathToFolder;
  } else {
    reject('The argument was expected to be an argument of type String or Array<String>.');
  }

  if ((0, _checkPathToExist.default)(outputPath)) resolve(true); // ToDo: change it
  else reject(`Unknown error! ${outputPath} not created `);
});

exports.createFolder = createFolder;

const createFile = (pathToFolder = requireArg('pathToFolder'), filename = requireArg('filename'), fileSource = requireArg('fileSource')) => new Promise((resolve, reject) => {
  let outputPath;

  if (Array.isArray(pathToFolder)) {
    outputPath = path.resolve(...pathToFolder.filter(path => typeof path === 'string'), filename);
  } else if (typeof pathToFolder === 'string') {
    (0, _checkPathToExist.default)(pathToFolder) ? outputPath = path.resolve(pathToFolder, filename) : reject(`${pathToFolder} not exist!`);
  } else {
    reject();
  }

  if ((0, _checkPathToExist.default)(outputPath)) resolve(true); // ToDo: change it

  const writeable = fs.createWriteStream(outputPath, {
    flags: 'w'
  });
  writeable.write(fileSource);
  writeable.on('error', err => {
    reject(new Error(err)); // ToDo: change it
  });
  writeable.end();
  resolve(true); // ToDo: change it
});

exports.createFile = createFile;
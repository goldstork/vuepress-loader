"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _requiredArg = _interopRequireDefault(require("./requiredArg"));

var _arrayPathToString = _interopRequireDefault(require("./arrayPathToString"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = (path = requireArg('path')) => {
  if (Array.isArray(path)) {
    return _fs.default.existsSync((0, _arrayPathToString.default)(path));
  } else if (typeof path === 'string') {
    return _fs.default.existsSync(path);
  }

  throw new Error('The argument was expected to be type "String" or "Array<String>".');
};

exports.default = _default;
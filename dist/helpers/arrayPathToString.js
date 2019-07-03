"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = arrPath => {
  if (Array.isArray(arrPath)) {
    const strArr = arrPath.filter(value => typeof value === 'string');
    return _path.default.resolve(...strArr);
  }

  throw new Error('Expected array argument!');
};

exports.default = _default;
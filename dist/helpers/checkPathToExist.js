"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = (path = requireArg('path')) => new Promise((resolve, reject) => {
  if (path && typeof path === 'string') {
    resolve(null);
  }

  resolve(!fs.existsSync(path));
});

exports.default = _default;
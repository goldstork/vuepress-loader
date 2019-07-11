"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = (source, data) => {
  const obj = { ...source
  };
  obj.themeConfig.sidebar.push(data);
  return obj;
};

exports.default = _default;
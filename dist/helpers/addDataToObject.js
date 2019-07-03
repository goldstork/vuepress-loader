"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = (source, {
  prop,
  data
}) => {
  if (typeof source === 'object' && !Array.isArray(source)) {
    if (source.hasOwnProperty(prop) && Array.isArray(source[prop])) {
      const obj = { ...source
      };
      obj[prop].push(data);
      return obj;
    } else {
      throw new Error(`Object not contain property ${prop} or ${prop} not array`);
    }
  } else {
    throw new Error('The argument "source" was expected to be type "Object".');
  }
};

exports.default = _default;
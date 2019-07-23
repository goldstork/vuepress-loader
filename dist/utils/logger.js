"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _signale = require("signale");

const logger = new _signale.Signale({
  displayFilename: true,
  displayTimestamp: true
});
var _default = logger;
exports.default = _default;
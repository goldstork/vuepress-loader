"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _configurator = _interopRequireDefault(require("../helpers/configurator"));

var _logger = _interopRequireDefault(require("./logger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let configuratorAlreadyInit = false;

const initConfigurator = outputPath => {
  try {
    if (!configuratorAlreadyInit) {
      const configurator = new _configurator.default();
      configurator.read([outputPath, '.vuepress', 'config.json']);
      configuratorAlreadyInit = true;
    }

    return configurator;
  } catch (err) {
    _logger.default.fatal(new Error(err));
  }
};

var _default = initConfigurator;
exports.default = _default;
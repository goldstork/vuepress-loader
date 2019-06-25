"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _stream = _interopRequireDefault(require("stream"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _genOutputPath = _interopRequireDefault(require("./genOutputPath"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(options) {
  return new Promise((resolve, reject) => {
    const outputPath = (0, _genOutputPath.default)(options, 'README.md');

    const writeable = _fs.default.createWriteStream(outputPath, {
      flags: 'w'
    });

    const template = `
			---
			home: true
			actionText: Start
			actionLink: 
			features:
			- title: TEST
				details: A Vue counter developed using Vue is embedded in this doc, now that's the power of VuePress!
			- title: TEST
				details: This entire doc was basically made with VuePress which parsed markdown files and corresponding assets using webpack.
			footer: TEST IERomanov TEST
			---`;
    writeable.write(template);
    writeable.on('error', err => {
      reject(new Error(err));
      process.exit(1);
    });
    writeable.end();
    resolve(true);
  });
}
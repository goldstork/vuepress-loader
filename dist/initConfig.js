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

function _default(options, ctx) {
  return new Promise((resolve, reject) => {
    const outputPath = (0, _genOutputPath.default)(options, ctx, '.vuepress/config.js');

    const writeable = _fs.default.createWriteStream(outputPath, {
      flags: 'w'
    });

    const template = `
			module.exports = {
				title: 'Test VuePress Docs generation',
				description: "TryTryTryTryTryTryTry",
				themeConfig:{
					nav: [
						{ text: 'Components', link: '/components/' },
					],
					sidebar: [
						{
							title: 'Counter',
							collapsable: false,
							children: [
								'/components'
							]
						}
					]
				}
			}
		`;
    writeable.write(template);
    writeable.on('error', err => {
      reject(new Error(err));
      process.exit(1);
    });
    writeable.end();
    resolve(true);
  });
}
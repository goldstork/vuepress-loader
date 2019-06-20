import path from 'path';

import loaderUtils from 'loader-utils';
import validateOptions from 'schema-utils';

import schema from './options.json';

export default function loader(source) {
  const options = loaderUtils.getOptions(this) || {};

  validateOptions(schema, options, 'VuePress Loader');

  const context = options.context || this.rootContext;

  const url = loaderUtils.interpolateName(this, options.name, {
    context,
    source,
    regExp: options.regExp,
  });

  console.log(source);

//   let outputPath = url;

//   if (options.outputPath) {
//     if (typeof options.outputPath === 'function') {
//       outputPath = options.outputPath(url, this.resourcePath, context);
//     } else {
//       outputPath = path.posix.join(options.outputPath, url);
//     }
//   }

//   let publicPath = `__webpack_public_path__ + ${JSON.stringify(outputPath)}`;

//   if (options.publicPath) {
//     if (typeof options.publicPath === 'function') {
//       publicPath = options.publicPath(url, this.resourcePath, context);
//     } else {
//       publicPath = `${
//         options.publicPath.endsWith('/')
//           ? options.publicPath
//           : `${options.publicPath}/`
//       }${url}`;
//     }

//     publicPath = JSON.stringify(publicPath);
//   }

//   if (typeof options.emitFile === 'undefined' || options.emitFile) {
//     this.emitFile(outputPath, source);
//   }

//   return `module.exports = ${publicPath};`;
}

export const raw = true;
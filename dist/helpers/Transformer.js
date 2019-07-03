"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const {
  Transform
} = require('stream');

const {
  StringDecoder
} = require('string_decoder');

class Transformer extends Transform {
  constructor(transformer, transformerArgs, opt = {}) {
    super(opt);
    this.transformer = transformer;
    this.transformerArgs = transformerArgs;
    this.on('close', () => {
      console.log('\n------ Transform on close');
    });
    this.on('drain', () => {
      console.log('\n------ Transform on drain');
    });
    this.on('error', err => {
      console.log('\n------ Transform on error', err);
    });
    this.on('finish', () => {
      console.log('\n------ Transform on finish');
    });
    this.on('end', () => {
      console.log('\n------ Transform on end');
    });
    this.on('pipe', () => {
      console.log('\n------ Transform on pipe');
    });
  }

  _transform(chunk, encoding, done) {
    try {
      const source = new StringDecoder('utf-8').end(chunk);
      source = this.transformer(JSON.parse(source), this.transformerArgs);
      done(null, Buffer.from(source));
    } catch (err) {
      done(err, null);
    }
  }

}

var _default = Transformer;
exports.default = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _stream = require("stream");

var _logger = _interopRequireDefault(require("../utils/logger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Transformer extends _stream.Transform {
  constructor(concurrency, {
    handler,
    args
  }, opt = {}) {
    super(opt);
    this.transformer = handler;
    this.transformerArgs = args;
    this.running = 0;
    this.terminateCallback = null;
    this.concurrency = concurrency;
    this.continueCallback = null; // this.on('close', () => {
    // 	logger.info('Transform on close')
    // })

    this.on('error', err => {
      _logger.default.fatal(new Error(err));
    }); // this.on('finish', () => {
    // 	logger.info('Transform on finish')
    // })

    this.on('end', () => {
      _logger.default.success('Transform file successfully!');
    });
  }

  _transform(chunk, encoding, done) {
    this.running++;

    try {
      source = this.transformer(chunk, encoding, this._onComplete.bind(this), this.transformerArgs);

      if (this.running < this.concurrency) {
        done(null, source);
      } else {
        this.continueCallback = done;
      }
    } catch (err) {
      done(err, null);
    }
  }

  _flush(done) {
    if (this.running > 0) {
      this.terminateCallback = done;
    } else {
      done();
    }
  }

  _onComplete(err) {
    this.running--;

    if (err) {
      this.emit('error', err);
    }

    const tmpCallback = this.continueCallback;
    this.continueCallback = null;
    tmpCallback && tmpCallback();

    if (this.running === 0) {
      this.terminateCallback && this.terminateCallback();
    }
  }

}

var _default = Transformer;
exports.default = _default;
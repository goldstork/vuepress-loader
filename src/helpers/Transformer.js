const { Transform } = require('stream')
const { StringDecoder } = require('string_decoder');

class Transformer extends Transform {
	constructor(concurrency, transformer, transformerArgs, opt = {}) {
		super(opt)
		this.transformer = transformer
		this.transformerArgs = transformerArgs

		this.running = 0
		this.terminateCallback = null
		this.concurrency = concurrency
		this.continueCallback = null

		this.on('close', () => {
			console.log('\n------ Transform on close ------\n')
		})
		this.on('drain', () => {
			console.log('\n------ Transform on drain ------\n')
		})
		this.on('error', err => {
			console.log('\n------ Transform on error ------\n', err)
		})
		this.on('finish', () => {
			console.log('\n------ Transform on finish ------\n')
		})
		this.on('end', () => {
			console.log('\n------ Transform on end ------\n')
		})
		this.on('pipe', () => {
			console.log('\n------ Transform on pipe ------\n')
		})
	}
	_transform(chunk, encoding, done) {
		this.running++
		try {
			source = this.transformer(chunk, encoding, this._onComplete.bind(this), ...this.transformerArgs)
			if (this.running < this.concurrency) {
				done(null, source)
			} else {
				this.continueCallback = done
			}
		} catch (err) {
			done(err, null)
		}
	}

	_flush(done) {
		if (this.running > 0) {
			this.terminateCallback = done
		} else {
			done()
		}
	}

	_onComplete(err) {
		this.running--
		if (err) {
			this.emit('error', err)
		}
		const tmpCallback = this.continueCallback
		this.continueCallback = null
		tmpCallback && tmpCallback()
		if (this.running === 0) {
			this.terminateCallback && this.terminateCallback()
		}
	}
}

export default Transformer

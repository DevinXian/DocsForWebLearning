'use strict';
/**
 * A parser for a simple data protocol.
 * The "header" is a JSON object, followed by 2 \n characters, and
 * then a message body.
 */
const Readable = require('stream').Readable;
const util = require('util');

util.inherits(SimpleProtocol, Readable);

function SimpleProtocol(source, options) {
	if (!(this instanceof SimpleProtocol)) {
		return new SimpleProtocol(source, options);
	}

	Readable.call(this, options);
	this._inBody = false;
	this._sawFirstCr = false;

	// source is a readable stream, such as a socket or file
	this._source = source;

	const self = this;

	source.on('end', () => {
		self.push(null);
	});

	source.on('readable', () => {
		self.read(0);
	});

	this._rawHeader = [];
	this.header = null;
}

SimpleProtocol.prototype._read = (n) => {
	if (!this._inBody) {
		let chunk = this._source.read();

		//source has no data, neither are we.
		if (chunk === null) {
			return this.push('');
		}

		let split = -1;

		for (let i = 0; i < chunk.length; i++) {
			if (chunk[i] === 10) {// '\n'
				if (this._sawFirstCr) {
					split = i;
					break;
				} else {
					this._sawFirstCr = true;
				}
			} else {
				this._sawFirstCr = false;
			}
		}

		if (split === -1) {
			this._rawHeader.push(chunk);
			this.push('');
		} else {
			this._inBody = true;
			const h = chunk.slice(0, split);
			this._rawHeader.push(h);
			const header = Buffer.concat(this._rawHeader).toString();
			try {
				this.header = JSON.parse(header);
			} catch (er) {
				this.emit('error', new Error('invalid simple protocol data'));
				return;
			}

			const b = chunk.slice(split);
			this.unshift(b);
			// calling unshift by itself does not reset the reading state
			// of the stream; since we're inside _read, doing an additional
			// push('') will reset the state appropriately.
			this.push('');

			this.emit('header', this.header);
		}


	} else {
		let chunk = this._source.read();
		if (chunk) this.push(chunk);
	}
};

/**
 * Usage:
 * var parser = new SimpleProtocol(source);
 * Now parser is a readable stream that will emit 'header'
 * with the parsed header data.
 */

module.exports = SimpleProtocol;
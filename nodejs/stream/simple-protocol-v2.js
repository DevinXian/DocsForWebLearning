'use strict';

const util = require('util');
const Transform = require('stream').Transform;

util.inherits(SimpleProtocol2, Transform);

function SimpleProtocol2(options) {
	if (!(this instanceof  SimpleProtocol2)) {
		return new SimpleProtocol2(options);
	}

	Transform.call(this, options);
	this._inBody = false;
	this._sawFirstCr = false;
	this._rawHeader = [];
	this.header = null;
}

SimpleProtocol2.prototype.transform = function (chunk, encoding, done) {
	if (!this._inBody) {
		let split = -1;
		for (let i = 0; i < chunk.length; i++) {
			if (chunk[i] === 10) {
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
			this.emit('header', this.header);
			this.push(chunk.slice(split));
		}
	} else {
		this.push(chunk);
	}
	done();
};

// Usage:
// var parser = new SimpleProtocol();
// source.pipe(parser)
// Now parser is a readable stream that will emit 'header'
// with the parsed header data.

module.exports = SimpleProtocol2;
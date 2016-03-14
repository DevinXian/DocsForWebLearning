const Readable = require('stream').Readable;
const util = require('util');
util.inherits(Counter, Readable);

function Counter(opt) {
	Readable.call(this, opt);
	this._max = 1000000;
	this._index = 1;
}

Counter.prototype._read = ()=> {
	const i = this.index++;
	if (i > this._max) {
		this.push(null);
	} else {
		let str = '' + i;
		let buf = new Buffer(str, 'ascii');
		this.push(buf);
	}
};
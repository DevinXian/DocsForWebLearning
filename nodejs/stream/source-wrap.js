/**
 * low level source object wrapping
 */
const util = require('util');
const Readable = require('stream').Readable;

util.inherits(SourceWrapper, Readable);

function SourceWrapper(options) {
	Readable.call(this, options);

	this._source = function getLowLevelSourceObject() {
		return {
			readStop: ()=> {
			},
			readStart: ()=> {
			}
		};
	};

	this._source.ondata = (chunk) => {
		if (!this.push(chunk)) {
			this._source.readStop();
		}
	};

	this._source.onend = () => {
		this.push(null);
	};

}

SourceWrapper.prototype._read = (size) => {
	this._source.readStart();
};

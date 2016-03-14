'use strict';

const SimpleProtocol = require('../simple-protocol-v2');

function MockSource() {
}

//TODO not completed!!!
MockSource.prototype.pipe = ()=> {
	return new Buffer('{"Content-Type":"application/json"}\n\nHere is message body');
};

const simpleProtocol = new SimpleProtocol();

simpleProtocol.on('header', (chunk) => {
	console.log(chunk);
});

//TODO uncorrect

new MockSource().pipe(simpleProtocol);

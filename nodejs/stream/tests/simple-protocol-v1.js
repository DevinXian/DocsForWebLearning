'use strict';

const SimpleProtocol = require('../simple-protocol-v1');

function MockSource() {
}


//TODO not completed!!!
MockSource.prototype.read = ()=> {
	return new Buffer('{"Content-Type":"application/json"}\n\nHere is message body');
};

const simpleProtocol = new SimpleProtocol(
	new MockSource()
);

simpleProtocol.on('header', (chunk) => {
	console.log(chunk);
});

simpleProtocol._read();

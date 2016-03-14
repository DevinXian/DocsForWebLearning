'use strict';

const fs = require('fs');
const SimpleProtocol = require('../simple-protocol-v1');

function MockSource() {
}


//TODO not completed!!!
MockSource.prototype.read = ()=> {
	return 'Content-Type=application/json;\n\nHere is message body';
};

const sp = new SimpleProtocol(
	new MockSource()
	//fs.createReadStream('mock-file.txt')
);

sp._read();

sp.on('header', (chunk) => {
	console.log(chunk);
});
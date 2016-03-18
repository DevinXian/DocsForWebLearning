'use strict';

//basic http
const http = require('http');

http.createServer((req, res)=> {
	let data = '';
	req.setEncoding('utf8');

	req.on('data', (chunk) => {
		data += chunk;
	});

	req.on('end', () => {
		console.log(data);
		res.end('OK');
	});
});
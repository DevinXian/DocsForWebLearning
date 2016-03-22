'use strict';

((name, definition) => {
	const hasDefine = typeof define === 'function';
	const hasExports = typeof module !== 'undefined' && module.exports;
	if (hasDefine) {
		//AMD or CMD
		define(name, definition);
	} else if (hasExports) {
		//common node module
		module.exports = definition();
	} else {
		//window
		this[name] = definition();
	}
})('test', () => {
	return () => {
		console.log('test');
	};
});
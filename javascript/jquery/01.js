//jQuery = window.jQuery = window.$ = function (selector, context) {
//	return new jQuery.fn.init(selector, context);
//};
//
//jQuery.fn = jQuery.prototype = {
//	init: function () {
//		//do sth. with selector, context
//	}
//};
//
//jQuery.fn.init.prototype = jQuery.fn;

function a(){}

a.prototype = {
	name: 'name'
}

console.log(new a())

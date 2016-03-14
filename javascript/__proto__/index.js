/**
 * 构造函数的Prototype通过new操作符会传递给每一个对象的__proto__
 */
Function.prototype.method = function (name, fn) {
	this.prototype[name] = fn;
	return this;
};

function Anim(a) {
	this.value = 1;
}

Anim.method('hello', function () {
	console.log(this.value);
}).method('hi', function () {
	console.log('hi');
});


console.log((new Anim()).__proto__);
console.log((new Anim()).__proto__);//undefined
(new Anim).hello();
(new Anim).hi();
var adder = {
	base: 1,

	add: function (a) {
		//var f = v => v + this.base;
		//return f(a);
		return a + this.base;
	},

	addThruCall: function (a) {
		function f(v){//3
			return v + this.base;
		}
		//var f = v => v + this.base;//2
		var b = {
			base: 2
		};

		return f.call(b, a);
	}
};

console.log(adder.add(1));         // This would log to 2
console.log(adder.addThruCall(1)); // This would log to 2 still
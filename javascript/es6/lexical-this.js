var a = 1;
var b = {
	a: 2,
	c: function () {
		console.log(this.a);
	}
};
//b.c();//2
//(b.c)();//2
(0, b.c)();//1
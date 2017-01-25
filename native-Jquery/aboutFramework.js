

//jQ构建开始new的问题
;(function(){
var aquery1 = function(a,b) {

} 
var aquery = function(a, b) {
	return new aquery1(a,b)
}

aquery1.prototype = {
	name:function(a) {
		console.log(a)
	}
}
aquery(1)
})()


//或者 ：

;(function(){

var aquery = function(a, b) {
	return aquery.prototype.init(a,b);
}

aquery.prototype = {
	init : function() {
		console.log(this)   //this 就是包含些方法的一个对象
		return this
	},
	name: function() {
		console.log(1);
		return this   //链式调用
	},
	age : function() {
		console.log(2);
		return this
	}

}

aquery(1).name().age();

})()


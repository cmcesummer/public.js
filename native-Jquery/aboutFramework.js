

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
	return aquery.prototype.init(a,b);    //这个就省去在创建一个麻烦了，也不用return new aquery()死循环, 下面this代替了
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

console.log(aquery(1))

})()


//
;(function() {

var aquery = function(a, b) {
	return new aquery.prototype.init(a,b);    
}

aquery.prototype = {
	init : function() {
		console.log(this)   
		return this
	},
	name: function() {
		console.log(1);
		return this   
	},
	age : function() {
		console.log(2);
		return this
	}

}

aquery.prototype.init.prototype = aquery.prototype;   //把aq的原型赋给aq.init的原型 好让init使用aq方法
//原型传递解决问题

})()


//关于 $.extend()
;(function() {

//这个就是合并吧
//var result=$.extend({username:"zhang",age:26},{sex:"男",age:27},{sex:"女",address:"china"})
//result={username:"zhang",age:27,sex:"女",address:"china"}
//
//$.extend({minValue:function(a,b){return a<b?a:b;}})
//$.minValue(3,4)
//
//var result = $.extend(boolean,{}, { username: "zhang", address: {city: "qingdao",county:"china"} },  { age: "26", address: {xian: "mengyin",county:"England"} })
//
//result={username:"zhang",age:26, address:{city:"qingdao",xian:"mengyin",county:"England"}}
//
//result={username:"zhang",age:26, address: {xian: "mengyin",county:"England"}}
//
//如果是$.fn.extend();那就是在原型上拓展
//$.fn.extend({minValue:function(a,b)(return a<b?a:b)})
//$('#id').minValue(1,2)
//

})()

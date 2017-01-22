
//
//true false 转换成数字 是 1 0
//有且只有一个为真
function onlyOne(...arg) {
	let sum = 0;
	for(let item of arg) {
		sum += Number(!!item)   //先强制转换成Boolean
	}
	return sum === 1
}

//-----
var str = 'asdfghj';
console.log(str.substr(1, 3))  //sdf     这个第二个参数是长度
console.log(str.substring(1, 3)) //sd    这个第二个参数是结束位置索引（非自包含），3-1 = 2， 2是长度


//---
//由于浏览器演进的历史遗留问题， 在创建带有 id 属性的 DOM 元素时也会创建同名的全局变量。 
//这就很蛋疼了
console.log(we); //<div id="we">id</div>   


//如果处理的资源太多就要弄一个循环列队的并发，异步的处理这些结果，每次处理之后返回事件循环，让其他等待的事件有机会运行
(function() {

var res = [];

function response(data) {
	//一次处理1000个
	var chunk = data.splice(0, 1000);

	res = res.concat(
		chunk.map(function(item) {
			return item * 2
		})
	)

	if(data.length > 0) {
		setTimeout(function() {
			response(data)
		}, 0)
	}

}

//$.ajax('url').done(function(data){response(data)})

})();


//事件循环 和 任务列队
//事件循环 是 在下一轮开始前  
//任务列队 是 在这一轮结尾处


(function() {

function asyncify(fn) {
	var orig_fn = fn,
		index = setTimout(function() {
			index = null;
			if(fn) fn();
		}, 0)

	fn = null;

	return function() {  // 这个返回的函数放在回调中 arguments就是回调返回的数据 data
		if(index) {
			fn = orig_fn.bind.apply(orig_fn, [this].concat([].slice.call(arguments)))
		} else {
			orig_fn.apply(this, arguments);
		}
	}	
}

})();


// 关于call apply bind  不过上边那个fn.bind.apply(this,[arr])还是没看懂  this是谁就把谁穿进去
(function() {

	var fn = function (a,b) {
		console.log(this,a,b)
	}
	var fx = function(){}
	fn(1,2); //window ,1, 2
	fn.call(null,1,2);  //window ,1, 2
	fn.call(fx,1,2);	//fx 1,2	
	fn.apply(fx,[5,6]);  //fx,1,2
	fn.apply(null,[5,6])//window ,1, 2
	fn.bind(undefined,7,8)();  //window 7, 8
	fn.bind(fx,7,8)();	//fx,7,8

	var shoppingCart = (function(){
		var _calculatePrice = function () {
			return this.price * this.amount;
		};
		return {
			calculatePrice : _calculatePrice
		}
	})();
	var goods = {
		name : 'hammer',
		price: 199,
		amount : 2
	};
	console.log(shoppingCart.calculatePrice.call(goods)); //398

})();

//看下 下面的效率  
//基本上还是第一个效率略高，但是Opera是第二个

(function() {

console.time('str')
var s = '0123456789asdfghjklqwertyuiopzxcvbnm0123456789asdfghjklqwertyuiopzxcvbnm0123456789asdfghjklqwertyuiopzxcvbnm0123456789asdfghjklqwertyuiopzxcvbnm';
for(var i = 0; i < s.length; i++) {
  s.charAt(i);
}
console.timeEnd('str')

console.time('new');
var s = new String('0123456789asdfghjklqwertyuiopzxcvbnm0123456789asdfghjklqwertyuiopzxcvbnm0123456789asdfghjklqwertyuiopzxcvbnm0123456789asdfghjklqwertyuiopzxcvbnm');
for(var i = 0; i < s.length; i++) {
  s.charAt(i);
}
console.timeEnd('new')

})();



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

$.ajax('url').done(function(data){response(data)})

})();


//



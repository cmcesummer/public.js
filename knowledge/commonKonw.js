
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




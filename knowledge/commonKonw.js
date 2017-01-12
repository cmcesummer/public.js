
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


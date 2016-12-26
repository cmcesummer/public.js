'use strict'

//第一个next方法的value属性，返回表达式x + 2的值（3）。
//第二个next方法带有参数2，这个参数可以传入 Generator 函数，作为上个阶段异步任务的返回结果，被函数体内的变量y接收。
//因此，这一步的 value 属性，返回的就是2（变量y的值）。
function* gen(x) {
	let y = yield x + 2;
	let g = yield y + 2
	return g
}

let g = gen(1);
let g1 = g.next();
console.log(g1);
let g2 = g.next(g1.value)
console.log(g2);
console.log(g.next(g2.value));
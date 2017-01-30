'use strict'

//第一个next方法的value属性，返回表达式x + 2的值（3）， 也就是yield这行后面的表达式的值。
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

//异步转换为两次调用
var Thunk = fn => {
	return (...args) => {
		return callback => {
			return fn.call(this, ...args, callback)
		}
	}
}

var fs = Thunk(fs.readFile);
fs('a.text')(callback)

//--start
//Thunk自动流程管理
let run = fn => {  // fn 是generator
	let g = fn();

	let next = (err, data) => {
		//先移动到下一步
		var result = g.next(data);
		if(result.done) return;
		//有下一步的话， 调用回调
		resule.value(next);
	}
}

function* g(){
	//...var r1 = yield readFile('/etc/fstab');  这里yield后面只能是跟 Thunk 函数
}

next(g)
//--end

//--start
//基于Promise的对象自动执行
//var fs = require('fs');
var readFile = function(filename) {
	return new Promise(function(resolve, reject) {
		fs.readFile(filename, function(err, data) {
			err ? reject(err) : resolve(data)
		})
	})
}
var gen = function* () {
	var f1 = yield readFile('f1.txt');
	console.log(f1.toString);
	var f2 = yield readFile('f2.txt');
	console.log(f2.toString);
}
var g = gen();
g.next().value.then(function(data) {
	g.next(data).then(function() {
		g.next(data);
	})
})
	//上边可以换成
function run(fn) {
	var g = fn();

	function next(data) {
		var result = g.next(data);
		if(result.done) return result.value;
		result.value.then(function(data) {
			next(data);
		})
	}
	next();
}
run(g);	
//--end





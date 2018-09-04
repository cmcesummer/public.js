'use strict'

$ready(function() {

(function() {

//js 如果遇到一个执行时间很长的东西不能让他阻塞，手动让它异步，
//比如 f1()耗时很长 ，f2还需要f1的结果，最简单的方法：
//先改写f1()
function f2() {
	console.log('这是回调');
}
function f1(callback) {
	setTimeout(function() {
		//f1的原任务代码
		callback();
	},0)
}
f1(f2);

})();


(function() {
//用了promise,不管是同步还是异步，都会变成异步
function getPromise() {
	return new Promise(function(resolve, reject) {
		if (true) {
			var data = 2;
			resolve(data)
		}
	})
}

getPromise().then(function(data){
	console.log(data)
})

console.log(1)    //  这里先输出1，再2，再‘这是回调’  、、  promise 是在这轮事件循环结束时加上去的事件列队，setTimeout是下轮事件开始前

})();

var sd = Math.max.apply.bind(null,2,1,4,8);
console.log(sd());

(function() {

	let pr = Promise.reject('err');
	let prok = Promise.resolve('ok');
	let allPro = Promise.race([pr, prok])
	allPro.then(data => {
		console.log(2,data)
	}).catch(err => {
		console.log(1,err)
	})


})();

// 复习一下 promise 的实现：
;(function() {
	'use strict';
	function promise(fn) {
		this.status = 'pending';
		this._doneValue = null,
		this._failValue = null,
		this._doneArray = [],
		this._failArray = [];
		const context = this;
		function resolve(val) {
			setTimeout(() => {
				context._doneValue = value;
				context._doneArray.forEach(item => item(val))
			})
		};
		function reject(e) {
			setTimeout(() => {
				context._failValue = e;
				context._failArray.forEach(item => item(e))
			})
		}	

		try {
			fn(resolve, reject)
		} catch(e) {
			reject(e)
		}
	}

	promise.prototype.then = function(resFn, rejFn) {
		const context = this;
		const p2 = new promise(function(res, rej) {
			context._doneArray.push(function(value) {
				const resResult = resFn(value);
				_middleWare(resResult, res, rej);
			});
			context._failArray.push(function(e) {
				const resResult = resFn(e);
				_middleWare(resResult, res, rej);
			})
		});
		
		return p2;
	}

	function _middleWare(result, res, rej) {
		if(result && (typeof result === 'object' || typeof result === 'function')) {
			if(typeof result.then === 'function') {
				result.then(function(val) {
					res(val);
				})
			} else {
				res(result)
			}
		} else {
			res(result)
		}
	}




})();






















});
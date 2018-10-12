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




// restart

!(function() {
	'use strict';

	const PENDING = 'pending';
	const REJECTED = 'rejected';
	const FULFILLED = 'fulfilled';

	function MyPromise(fn) {
		// const context = this;
		this.state = PENDING;
		this.value = null;
		this.reason = null;
		this.fulfilledCallback = [];
		this.rejectedCallback = [];

		const resolve = val => {
			if (this.state === PENDING) {
				setTimeout(() => {
					this.state = FULFILLED;
					this.value = val;
					this.fulfilledCallback.forEach(item => item());
				})
			}
		}

		const reject = reason => {
			if (this.state === PENDING) {
				setTimeout(() => {
					this.state = REJECTED;
					this.reason = reason;
					this.rejectedCallback.forEach(item => item());
				})
			}
		}

		try {
			fn(resolve, reject) 
		} catch(_) {
			reject(_)
		}
	}

	function middlePromiseThen(promise2, x, resolve, reject) {
		if (promise2 === x) {
			return reject(new Error('loop'));
		}

		if (x !== null && (Object.prototype.toString.call(x) === '[object Object]' || Object.prototype.toString.call(x) === '[object Function]')) {
			try {
				const then = x.then;
				if (typeof then === 'function') {
					then(value => {
						middlePromiseThen(promise2, value, resolve, reject);
					}, reason => {
						reject(reason);
					})
				} else {
					resolve(x);
				}
			} catch(_) {
				reject(_);
			}
		} else {
			resolve(x);
		}
	}

	MyPromise.prototype.then = function(resFn, rejFn) {
		resFn = typeof resFn === 'function' ? resFn : value => value;
		rejFn = typeof rejFn === 'function' ? rejFn : reason => { throw reason };
		let promise2 = null;
		promise2 = new MyPromise((resolve, reject) => {
			if(this.state === PENDING) {
				this.fulfilledCallback.push(() => {
					try {
						const returnValue = resFn(this.value);
						middlePromiseThen(promise2, returnValue, resolve, reject);
					} catch(_) {
						reject(_);
					}
				});
				this.rejectedCallback.push(() => {
					try {
						const returnValue = rejFn(this.reason);
						middlePromiseThen(promise2, returnValue, resolve, reject);
					} catch(_) {
						reject(_);
					}
				});
			} else if (this.state === FULFILLED) {
				try {
					const returnValue = resFn(this.value);
					middlePromiseThen(promise2, returnValue, resolve, reject);
				} catch(_) {
					reject(_);
				}
			} else {
				try {
					const returnValue = rejFn(this.reason);
					middlePromiseThen(promise2, returnValue, resolve, reject);
				} catch(_) {
					reject(_);
				}
			}
		})

		return promise2
	}

	MyPromise.prototype.catch = function(rejFn) {
		return this.then(null, rejFn)
	}

	MyPromise.prototype.finally = function(fn) {
		return this.then(value => {
			fn(value);
			return value
		}, reason => {
			fn(reason);
			return reason
		})
	}

	MyPromise.all = function(promiseArray) {
		const resolveArray = [];
		return new MyPromise((reslove, reject) => {
			promiseArray.forEach((item, index) => {
				item.then(res => {
					resolveArray[index] = res;
					if(resolveArray.length === promiseArray.length) reslove(resolveArray) ;
				}, reject)
			})
		})
	}

	MyPromise.race = function(promiseArray) {
		return new MyPromise((reslove, reject) => {
			promiseArray.forEach(item => {
				item.then(res => {
					reslove(res)
				}, reject)
			})
		})
	}

	MyPromise.resolve = function(reason) {
		return new MyPromise((resolve, reject) => {
			reject(reason)
		})
	}

	// MyPromise.prototype.then = function(resFn, rejFn) {
	// 	if (this.state === PENDING) {
	// 		this.fulfilledCallback.push(() => resFn(this.value));
	// 		this.rejectedCallback.push(() => rejFn(this.reason));
	// 	} else if (this.state === FULFILLED) {
	// 		resFn(this.value)
	// 	} else {
	// 		rejFn(this.reason)
	// 	}
	// }



	setTimeout(function() {
		console.log(5)
	})

	var chan = new Promise(function(resolve) {
		resolve(1)
	})

	chan.then(v => {
		setTimeout(function() {
			console.log(v)
		})
		return new Promise(function(res) {
			res(v + 9)
		})
	}).then(console.log)

	console.log(2)

})();



(function() {
	'use strict';

	const PENDING = 'pending';
	const FULFILLED = 'fulfilled';
	const REJECTED = 'rejected';
	
	function Promise(fn) {
		this.state = PENDING;
		this.value = null;
		this.reason = null;
		this.resloveArray = [];
		this.rejectArray = [];

		const reslove = value => {
			if(this.state === PENDING) {
				setTimeout(() => {
					this.value = value;
					this.state = FULFILLED;
					this.resloveArray.forEach(item => item());
				})
			}
		}

		const reject = reason => {
			if(this.state === PENDING) {
				setTimeout(() => {
					this.reason = reason;
					this.state = REJECTED;
					this.rejectArray.forEach(item => item());
				})
			}
		}

		try {
			fn(reslove, reject);
		} catch(e) {
			reject(e);
		}
	}

	const promiseMiddleThen = (promise2, x, resolve, reject) => {
		if(x === promise2) {
			reject(new TypeError('loop'))
		}
		if(x !== null && ({}.toString.call(x) === '[object Object]' || {}.toString.call(x) === '[object Function]')) {
			try {
				const then = x.then;
				if(typeof then === 'function') {
					then(value => promiseMiddleThen(promise2, value, reslove, reject), reason => reject(reason))
				} else {
					resolve(x)
				}
			} catch(e) {
				reject(e)
			}
		} else {
			resolve(x);
		}
	}

	Promise.prototype.then = function(resFn, rejFn) {
		const promise2 = new Promise((resolve, reject) => {
			if(this.state === PENDING) {
				this.resloveArray.push(() => {
					try {
						const value = resolve(this.value);
						promiseMiddleThen(promise2, value, resolve, reject);
					} catch (e) {
						reject(e);
					}
				})
				this.rejectArray.push(() => {
					try {
						const reason = resolve(this.reason);
						promiseMiddleThen(promise2, reason, resolve, reject);
					} catch (e) {
						reject(e);
					}
				})
			} else if (this.state === FULFILLED) {
				try {
					const value = resolve(this.value);
					promiseMiddleThen(promise2, value, resolve, reject);
				} catch (e) {
					reject(e);
				}
			} else {
				try {
					const reason = resolve(this.reason);
					promiseMiddleThen(promise2, reason, resolve, reject);
				} catch (e) {
					reject(e);
				}
			}
		});

		return promise2
	}






































})();






















});
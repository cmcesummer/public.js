# async await

async 函数，就是将 generator 函数的\*换成 async，将 yield 替换成 await

## async 函数对 generator 的改进

1. 内置执行器，不需要使用 next()手动执行
2. await 命令后面可以是 Promise 对象或原始类型的值，yield 命令后面只能是 Thunk 函数或 Promise 对象
3. 返回值是 Promise。返回非 Promise 时，async 函数会把它包装成 Promise 返回。(Promise.resolve(value))

## await 执行细节

1. 当这个函数返回非 promise：  
   **await 后面的代码被压入 microtask 队列**。当主线程执行完毕，取出这个回调，执行。
2. 当这个函数返回 promise：  
   **await 后面的代码被压入 microtask 队列**。当主线程执行完毕，取出这个回调，发现 await 语句等待的函数返回了 promise，把后续代码赋给这个 promise 对象的 then，并把这个 promise 的回调再压入 microtask 队列，重新排队。当它前面的回调函数都被取出执行后，再取出它，执行.  
   **也就是说 如果 await 后是 promise 的话，实际上是 微进程中再出现微进程，就又排到最后去了**  
   **async 函数默认返回的是一个 promise**  
   **await 后如果不是 promise 就转换成 promise， await 下边的函数都放到这个 promise 的 then 中去。**  
   所以 当 async2 不是返回 pormise 时， 相当于 await promise.then(), 第一个放到微进程中  
   当 async2 是返回 promise 时，相当于 await promise.then().then(), 第一个 then 先放到微进程中，第二个 then 在执行微进程时再放入进程队尾

🌰

```js
async function async1() {
    console.log("async1 start");
    await async2();
    console.log("async1 end"); // 放到 async2 的 then 中
}
async function async2() {
    console.log("async2");
}
//  function async2() {
//         console.log("3");
//         return new Promise(function(res) {
//             console.log("9");
//             res();
//         })
//             .then(res => {
//                 console.log(101);
//             })
//             .then(res => {
//                 console.log(55);
//             });
//     }
console.log("script start");
setTimeout(function() {
    console.log("settimeout");
}, 0);
async1();
new Promise(function(resolve) {
    console.log("promise1");
    resolve();
})
    .then(function() {
        console.log("promise2");
    })
    .then(res => {
        console.log(33);
    });
console.log("script end");
/*
script start
async1 start
async2
promise1
script end
promise2
async1 end
settimeout
*/
async function func1() {
    console.log("func1");
    var a = await func2(); //当await返回非promise
    console.log("func1 return");
}
function func2() {
    console.log("func2");
} //返回undefined
func1();
new Promise(function(resolve) {
    console.log("promise1");
    resolve("resolved");
}).then(function(data) {
    console.log(data);
});
/*
func1
func2
promise1
func1 return
resolved
*/
```

还有一个例子：

```js
async function asyncFn() {
    console.log("asyncFn");
    let res = await asyncFn2();
    console.log(res);
}

async function asyncFn2() {
    console.log("asyncFn2");
    let res = await fn3();
    console.log(res);
    return "asyncFn2 return";
}

async function fn3() {
    console.log("fn3");
    return "555555";
}

setTimeout(() => {
    console.log("setTimeout");
}, 0);

console.log("script start");

asyncFn();

let promise = new Promise(resolve => {
    console.log("promise");
    resolve("promise resolved");
    console.log("after promise resolved");
}).then(res => {
    console.log(res);
});
```

其实这个相当于：
这个是 v8 新版本的转化

```js
// 相当于
function asyncFn() {
    console.log("asyncFn");
    console.log("asyncFn2");
    Promise.resolve(fn3())
        .then(res => {
            console.log(res);
            return Promise.resolve("asyncFn2 return");
        })
        .then(res => {
            console.log(res);
        });
}

async function fn3() {
    console.log("fn3");
    return "555555";
}
asyncFn();

new Promise(resolve => {
    console.log("promise");
    resolve("promise resolved");
    console.log("after promise resolved");
}).then(res => {
    console.log(res);
});
```

可以参考这个文章： [async/awaiy promise](https://juejin.im/post/5c0f73e4518825689f1b5e6c)
上个版本 v8 的转化：

```js
async function async1() {
    console.log("async1 start");
    await async2();
    console.log("async1 end"); // 放到 async2 的 then 中
}
async function async2() {
    console.log("async2");
}
new Promise(function(resolve) {
    console.log("promise1");
    resolve("resolved");
}).then(function(data) {
    console.log(data);
});
// ============ change =====
function async1() {
    console.log("async1 start");
    Promise.resolve(async2())
        .then(() => {})
        .then(() => {})
        .then(res => {
            console.log("async1 end");
        });
}
new Promise(function(resolve) {
    console.log("promise1");
    resolve("resolved");
}).then(function(data) {
    console.log(data);
});
```

```js
new Promise((resolve, reject) => {
    resolve(); //resolve_1
})
    .then(() => {
        // then_task_1
        console.log("promise1 resolved");
    })
    .then(() => {
        // then_task_2
        console.log("promise2 resolved");
    })
    .then(() => {
        // then_task_3
        console.log("promise3 resolved");
    });

new Promise((resolve, reject) => {
    resolve(); //resolve_2
})
    .then(() => {
        // then_task_x
        console.log("promisex resolved");
    })
    .then(() => {
        // then_task_y
        console.log("promisey resolved");
    })
    .then(() => {
        // then_task_z
        console.log("promisez resolved");
    });

console.log("main");

//result:
//main
//promise1 resolved
//promisex resolved
//promise2 resolved
//promisey resolved
//promise3 resolved
//promisez resolved

new Promise((resolve, reject) => {
    resolve(Promise.resolve()); //这里的Promise.resolve会添加一个null任务到job queue，外层resolve对应async1_end_task
}).then(() => {
    //async1_end_task
    console.log("async1 end");
});

new Promise(function(resolve) {
    resolve(); //对应promise2_task
})
    .then(function() {
        //promise2_task
        console.log("promise2");
    })
    .then(function() {
        //promise3_task
        console.log("promise3");
    })
    .then(function() {
        //promise4_task
        console.log("promise4");
    });
// VM11068:11 promise2
// VM11068:13 promise3
// VM11068:4 async1 end
// VM11068:15 promise4
```

## 怎么做到的

### 先看下 generator

**表达式 `const x = yield 2` 并不会赋值给 x ;**

```js
function* foo(x) {
    const y = 2 * (yield x + 1);
    console.log(y);
    const z = yield y / 3;
    return x + y + z;
}
var a = foo(5);
a.next(); // {value: 6, done: false}
a.next(); // undefined {value: NaN, done: false}
a.next(); // {value: NaN, done: true}

const b = foo(5);
const c = a.next();
const d = a.next(a.value);
const e = a.next(d.value);
```

```js
function P() {
    return new Promise((reslove, reject) => {
        setTimeout(() => {
            reslove(5);
        }, 3000);
    });
}
function* foo() {
    const v = yield P();
    return v;
}
const a = foo();
// a.next().value 是一个 Promise 实例
a.next().value.then(console.log);
```

`async/await`需要达到下边的效果

```js
function P() {
    return new Promise((reslove, reject) => {
        setTimeout(() => {
            reslove(5);
        }, 3000);
    });
}
co(function*() {
    const v = yield P();
    console.log(v);
});
```

所以需要一个 `co` 函数;

```js
function co(gFn) {
    const g = gFn();
    mid(g);
}
// 第一个 g.next() 参数传不传都没啥影响好像
function mid(g, val) {
    const v = g.next(val);
    if (!v.done) {
        v.value.then(val => {
            mid(g, val);
        });
    } else {
        return v.value;
    }
}
```

这就是一个最简单的实现了。

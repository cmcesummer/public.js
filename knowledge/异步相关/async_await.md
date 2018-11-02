# async await

async 函数，就是将 generator 函数的\*换成 async，将 yield 替换成 await

## async 函数对 generator 的改进

1. 内置执行器，不需要使用 next()手动执行
2. await 命令后面可以是 Promise 对象或原始类型的值，yield 命令后面只能是 Thunk 函数或 Promise 对象
3. 返回值是 Promise。返回非 Promise 时，async 函数会把它包装成 Promise 返回。(Promise.resolve(value))

## await 执行细节

1. 当这个函数返回非 promise：  
   await 后面的代码被压入 microtask 队列。当主线程执行完毕，取出这个回调，执行。
2. 当这个函数返回 promise：  
   await 后面的代码被压入 microtask 队列。当主线程执行完毕，取出这个回调，发现 await 语句等待的函数返回了 promise，把后续代码赋给这个 promise 对象的 then，并把这个 promise 的回调再压入 microtask 队列，重新排队。当它前面的回调函数都被取出执行后，再取出它，执行

🌰

```js
async function async1() {
    console.log("async1 start");
    await async2();
    console.log("async1 end");
}
async function async2() {
    console.log("async2");
}
console.log("script start");
setTimeout(function() {
    console.log("settimeout");
}, 0);
async1();
new Promise(function(resolve) {
    console.log("promise1");
    resolve();
}).then(function() {
    console.log("promise2");
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

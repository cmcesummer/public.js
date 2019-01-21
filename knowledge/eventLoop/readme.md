# EventLoop

## macrotask microtask

macrotask:

-   setTimeout
-   setInterval
-   setImmediate (Node 独有)
-   requestAnimationFrame (浏览器独有)
-   I/O
-   UI rendering (浏览器独有)

microtask:

-   process.nextTick (Node 独有)
-   Promise
-   Object.observe
-   MutationObserver

## browser-loop

1. 执行全局 Script 同步代码，这些同步代码有一些是同步语句，有一些是异步语句（比如 setTimeout 等）；
2. 全局 Script 代码执行完毕后，调用栈 Stack 会清空；
3. 从微队列 microtask queue 中取出位于队首的回调任务，放入调用栈 Stack 中执行，执行完后 microtask queue 长度减 1；
4. 继续取出位于队首的任务，放入调用栈 Stack 中执行，以此类推，直到直到把 microtask queue 中的所有任务都执行完毕。注意，**如果在执行 microtask 的过程中，又产生了 microtask，那么会加入到队列的末尾，也会在这个周期被调用执行**；
5. microtask queue 中的所有任务都执行完毕，此时 microtask queue 为空队列，调用栈 Stack 也为空；
6. 取出宏队列 macrotask queue 中位于队首的任务，放入 Stack 中执行；
7. 执行完毕后，调用栈 Stack 为空；
8. 重复第 3-7 个步骤；
9. 重复第 3-7 个步骤；

**可以看到，这就是浏览器的事件循环 Event Loop**

#### 这里归纳 3 个重点：

1. 宏队列 macrotask 一次只从队列中取一个任务执行，执行完后就去执行微任务队列中的任务；
2. 微任务队列中所有的任务都会被依次取出来执行，直到 microtask queue 为空，如果在执行 microtask 的过程中，又产生了 microtask，那么会加入到队列的末尾，也会在这个周期被调用执行；
3. 图中没有画 UI rendering 的节点，因为这个是由浏览器自行判断决定的，但是只要执行 UI rendering，它的节点是在执行完所有的 microtask 之后，下一个 macrotask 之前，紧跟着执行 UI render。

#### 图示

![browser-loop](https://github.com/cmcesummer/public.js/blob/master/knowledge/eventLoop/img/browserloop.png)

看代码：

```js
console.log(1);

setTimeout(() => {
    console.log(2);
    Promise.resolve().then(() => {
        console.log(3);
    });
});

new Promise((resolve, reject) => {
    console.log(4);
    resolve(5);
}).then(data => {
    console.log(data);

    Promise.resolve()
        .then(() => {
            console.log(6);
        })
        .then(() => {
            console.log(7);

            setTimeout(() => {
                console.log(8);
            }, 0);
        });
});

setTimeout(() => {
    console.log(9);
});

console.log(10);
```

## node-loop

node 上的 eventloop 比较复杂：

#### 宏队列的回调任务有 6 个阶段：

-   **timers 阶段**：这个阶段执行 setTimeout 和 setInterval 预定的 callback
-   **I/O callback 阶段**：执行除了 close 事件的 callbacks、被 timers 设定的 callbacks、setImmediate()设定的 callbacks 这些之外的 callbacks
-   **idle, prepare 阶段**：仅 node 内部使用
-   **poll 阶段**：获取新的 I/O 事件，适当的条件下 node 将阻塞在这里
-   **check 阶段**：执行 setImmediate()设定的 callbacks
-   **close callbacks 阶段**：执行 socket.on('close', ....)这些 callbacks

#### NodeJS 中宏队列主要有 4 个

由上面的介绍可以看到，回调事件主要位于 4 个 macrotask queue 中：

1. Timers Queue
2. IO Callbacks Queue
3. Check Queue
4. Close Callbacks Queue
   这 4 个都属于宏队列，但是 **在浏览器中，可以认为只有一个宏队列** ，所有的 macrotask 都会被加到这一个宏队列中，但是 **在 NodeJS 中，不同的 macrotask 会被放置在不同的宏队列中**。

#### NodeJS 中微队列主要有 2 个：

1. Next Tick Queue：是放置 process.nextTick(callback)的回调任务的
2. Other Micro Queue：放置其他 microtask，比如 Promise 等
   在浏览器中，也可以认为只有一个微队列，所有的 microtask 都会被加到这一个微队列中，但是在 NodeJS 中，不同的 microtask 会被放置在不同的微队列中。

#### NodeJS 的 Event Loop 过程(大致)：

1. 执行全局 Script 的同步代码
2. 执行 microtask 微任务，先执行所有 Next Tick Queue 中的所有任务，再执行 Other Microtask Queue 中的所有任务
3. 开始执行 macrotask 宏任务，共 6 个阶段，从第 1 个阶段开始执行相应每一个阶段 macrotask 中的所有任务，注意，这里是所有每个阶段宏任务队列的所有任务，在浏览器的 Event Loop 中是只取宏队列的第一个任务出来执行，每一个阶段的 macrotask 任务执行完毕后，开始执行微任务，也就是步骤 2
4. Timers Queue -> 步骤 2 -> I/O Queue -> 步骤 2 -> Check Queue -> 步骤 2 -> Close Callback Queue -> 步骤 2 -> Timers Queue ......
5. Node 规定，`process.nextTick` 和 `Promise` 的回调函数，追加在本轮循环，即同步任务一旦执行完成，就开始执行它们。而 `setTimeout`、`setInterval`、`setImmediate` 的回调函数，追加在次轮循环。本轮循环一定早于次轮循环执行。 也就是说**宏任务追加在次轮循环，微任务追加在本轮循环**。

#### 图示

![node-micro-loop](https://github.com/cmcesummer/public.js/blob/master/knowledge/eventLoop/img/nodemicloop.png)

![node-macro-loop](https://github.com/cmcesummer/public.js/blob/master/knowledge/eventLoop/img/nodemacloop.png)

看代码：

```js
// fs.readFile(path.join(__dirname, "./README.md"), "utf-8", function() {
console.log("start");

setTimeout(() => {
    // callback1
    console.log(1);
    setTimeout(() => {
        // callback2
        console.log(2);
    }, 0);
    setImmediate(() => {
        // callback3
        console.log(3);
    });
    process.nextTick(() => {
        // callback4
        console.log(4);
    });
}, 0);

setImmediate(() => {
    // callback5
    console.log(5);
    setImmediate(() => {
        // callback3
        console.log(10);
    });
    process.nextTick(() => {
        // callback6
        console.log(6);
    });
});

setTimeout(() => {
    // callback7
    console.log(7);
    process.nextTick(() => {
        // callback8
        console.log(8);
    });
}, 0);

process.nextTick(() => {
    // callback9
    console.log(9);
});

console.log("end");
// });
```

#### setTimeout 对比 setImmediate

两者的执行顺序要根据当前的执行环境才能确定：

-   如果两者都在主模块(main module)调用，那么执行先后取决于进程性能，顺序随机
-   如果两者都不在主模块调用，即在一个 I/O Circle 中调用，那么 setImmediate 的回调永远先执行，因为会先到 Check 阶段

例子：

```js
fs.readFile("test.js", () => {
    setTimeout(() => console.log(1));
    setImmediate(() => console.log(2));
});
// 先 2 再 1
```

#### setImmediate 对比 process.nextTick

-   setImmediate(fn)的回调任务会插入到宏队列 Check Queue 中
-   process.nextTick(fn)的回调任务会插入到微队列 Next Tick Queue 中
-   process.nextTick(fn)调用深度有限制，上限是 1000，而 setImmedaite 则没有

[link](https://segmentfault.com/a/1190000016278115)

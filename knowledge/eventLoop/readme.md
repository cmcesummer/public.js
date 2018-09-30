# EventLoop

## macrotask microtask

macrotask:   

- setTimeout
- setInterval
- setImmediate (Node独有)
- requestAnimationFrame (浏览器独有)
- I/O
- UI rendering (浏览器独有)

microtask:  

- process.nextTick (Node独有)
- Promise
- Object.observe
- MutationObserver

## browser-loop

1. 执行全局Script同步代码，这些同步代码有一些是同步语句，有一些是异步语句（比如setTimeout等）；
2. 全局Script代码执行完毕后，调用栈Stack会清空；
3. 从微队列microtask queue中取出位于队首的回调任务，放入调用栈Stack中执行，执行完后microtask queue长度减1；
4. 继续取出位于队首的任务，放入调用栈Stack中执行，以此类推，直到直到把microtask queue中的所有任务都执行完毕。注意，**如果在执行microtask的过程中，又产生了microtask，那么会加入到队列的末尾，也会在这个周期被调用执行**；
5. microtask queue中的所有任务都执行完毕，此时microtask queue为空队列，调用栈Stack也为空；
6. 取出宏队列macrotask queue中位于队首的任务，放入Stack中执行；
7. 执行完毕后，调用栈Stack为空；
8. 重复第3-7个步骤；
9. 重复第3-7个步骤；

**可以看到，这就是浏览器的事件循环Event Loop**   

这里归纳3个重点：
1. 宏队列macrotask一次只从队列中取一个任务执行，执行完后就去执行微任务队列中的任务；
2. 微任务队列中所有的任务都会被依次取出来执行，直到microtask queue为空；
3. 图中没有画UI rendering的节点，因为这个是由浏览器自行判断决定的，但是只要执行UI rendering，它的节点是在执行完所有的microtask之后，下一个macrotask之前，紧跟着执行UI render。

#### 图示
![browser-loop](https://github.com/cmcesummer/public.js/blob/master/knowledge/eventLoop/img/browserloop.png)

看代码：
```js
console.log(1);

setTimeout(() => {
  console.log(2);
  Promise.resolve().then(() => {
    console.log(3)
  });
});

new Promise((resolve, reject) => {
  console.log(4)
  resolve(5)
}).then((data) => {
  console.log(data);
  
  Promise.resolve().then(() => {
    console.log(6)
  }).then(() => {
    console.log(7)
    
    setTimeout(() => {
      console.log(8)
    }, 0);
  });
})

setTimeout(() => {
  console.log(9);
})

console.log(10);
```

## node-loop

node上的eventloop比较复杂：   

#### 宏队列的回调任务有6个阶段：  
- **timers阶段**：这个阶段执行setTimeout和setInterval预定的callback
- **I/O callback阶段**：执行除了close事件的callbacks、被timers设定的callbacks、setImmediate()设定的callbacks这些之外的callbacks
- **idle, prepare阶段**：仅node内部使用
- **poll阶段**：获取新的I/O事件，适当的条件下node将阻塞在这里
- **check阶段**：执行setImmediate()设定的callbacks
- **close callbacks阶段**：执行socket.on('close', ....)这些callbacks

#### NodeJS中宏队列主要有4个
由上面的介绍可以看到，回调事件主要位于4个macrotask queue中：   
1. Timers Queue
2. IO Callbacks Queue
3. Check Queue
4. Close Callbacks Queue
这4个都属于宏队列，但是 **在浏览器中，可以认为只有一个宏队列** ，所有的macrotask都会被加到这一个宏队列中，但是 **在NodeJS中，不同的macrotask会被放置在不同的宏队列中**。

#### NodeJS中微队列主要有2个：
1. Next Tick Queue：是放置process.nextTick(callback)的回调任务的
2. Other Micro Queue：放置其他microtask，比如Promise等
在浏览器中，也可以认为只有一个微队列，所有的microtask都会被加到这一个微队列中，但是在NodeJS中，不同的microtask会被放置在不同的微队列中。

#### NodeJS的Event Loop过程(大致)：
1. 执行全局Script的同步代码
2. 执行microtask微任务，先执行所有Next Tick Queue中的所有任务，再执行Other Microtask Queue中的所有任务
3. 开始执行macrotask宏任务，共6个阶段，从第1个阶段开始执行相应每一个阶段macrotask中的所有任务，注意，这里是所有每个阶段宏任务队列的所有任务，在浏览器的Event Loop中是只取宏队列的第一个任务出来执行，每一个阶段的macrotask任务执行完毕后，开始执行微任务，也就是步骤2
4. Timers Queue -> 步骤2 -> I/O Queue -> 步骤2 -> Check Queue -> 步骤2 -> Close Callback Queue -> 步骤2 -> Timers Queue ......

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

- 如果两者都在主模块(main module)调用，那么执行先后取决于进程性能，顺序随机
- 如果两者都不在主模块调用，即在一个I/O Circle中调用，那么setImmediate的回调永远先执行，因为会先到Check阶段

#### setImmediate 对比 process.nextTick
- setImmediate(fn)的回调任务会插入到宏队列Check Queue中
- process.nextTick(fn)的回调任务会插入到微队列Next Tick Queue中
- process.nextTick(fn)调用深度有限制，上限是1000，而setImmedaite则没有


[link](https://segmentfault.com/a/1190000016278115)
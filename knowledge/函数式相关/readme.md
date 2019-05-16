# 函数

## compose

```js
function aCompose(...args) {
    let length = args.length;
    let count = length - 1;
    let result;
    return function f1(...arg1) {
        result = args[count].apply(this, arg1);
        if (count <= 0) {
            count = length - 1;
            return result;
        }
        count--;
        return f1.call(null, result);
    };
}
```

```js
function compose(...args) {
    return result => {
        return args.reduceRight((result, fn) => {
            return fn(result);
        }, result);
    };
}
```

https://segmentfault.com/a/1190000010608477
柯里化

```ts
(window as any).add = function(...arg: any) {
    return arg.reduce((a: number, b: number) => {
        return a + b;
    });
};

/**
 * var a = crry(add);
 * a(1)(2,3)(4)
 */
(window as any).crry = function(fn: any) {
    const cache: any = [];
    function a(...arg: any) {
        cache.push(...arg);
        return a;
    }
    a.toString = function() {
        const res = [...cache];
        cache.length = 0;
        return fn(...res);
    };

    return a;
};

// kelihua
(window as any).crruy = function(fn: any, ...arg: any) {
    if (arg.length > fn.length) {
        return fn(...arg);
    }
    return function(...args: any) {
        return (window as any).crruy(fn, ...arg, ...args);
    };
};
```

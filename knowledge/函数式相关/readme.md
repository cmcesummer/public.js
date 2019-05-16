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

http://www.taoweng.site/index.php/archives/250/

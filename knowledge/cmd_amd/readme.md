# CommonJS 中的 require/exports 和 ES6 中的 import/export 区别

- import 只能在逻辑代码顶部
- require 支持动态引入，可以运用在代码的任何地方
- import是编译时的
- require是运行时的
- eES6 Module 中导入模块的属性或者方法是强绑定的，包括基础类型；而 `CommonJS 则是普通的值传递或者引用传递`,所以其他模块修改对象成功，但是修改基础类型不成功. 例如`a.js b.js c.js`

https://funteas.com/topic/5a98cce637621be1429268ee

```js
// ????
app.use(async (ctx, next) => {
    setTimeout(() => {
        ctx.body = "555";
    }, 1000);
});
```

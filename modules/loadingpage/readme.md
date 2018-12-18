# loading page

## CHANGELOG

-   1.0.0:  
    第一版 `loadingPage`
-   1.1.0：  
    解决 `auto` 返回函数调用时机的问题
-   1.2.0:  
    添加支持 MP3 预加载的功能， 并 拓展接口： 用户可自己添加支持的 load 格式以及 load 函数。
    目前支持的格式有： `jpg png gif jpeg mp3`， 用户可通过 `change_load_fn` 重写 或者 添加新的支持格式。

## 使用指引

-   对于极其简单的页面，建议使用 [无脑使用方法](#无脑使用方法)
-   使用高级功能时，建议先看看[interface](#interface)
-   对于一般活动页面， 建议使用 [normal 使用方法](#一般使用方法)
-   或者你只想预加载图片，不需要 loading, 不需要其他方法，参照[normal 使用方法](#一般使用方法)中的示例
-   或者你想要自由 ←.← , 参照[自由度最高的使用](#自由度最高的使用)
-   或者你想拓展加载的文件， 参考 [拓展你的预加载文件](#拓展你的预加载文件)
-   如果你想 debug 看一下，参考[debug](#debug)
-   如果你觉得平台统一的 loading 丑爆了，需要换肤，参考[换肤](#换肤)

## 无脑使用方法

1. 引入 js : `./loading_page.js`;
2. 立即调用 `loading_page.auto()();`
3. 引用位置建议： 建议放在页面的 `head` 中， 最好该页面 css 之前。

大概示例

```html
<html>
    <head>
        <script type="text/javascript" src="./loading_page.js?v=1.2"></script>
        <script>
            loading_page.auto()();
        </script>
    </head>
    <body></body>
</html>
```

## interface

在介绍其他非无脑使用方法前，先说一下接口，以及参数吧。
整个组件的实现依赖一个基类`Loading`， 初始化 `Loading` 所需参数如下：

```js
const space_fn = () => {};

export const interface = {
    // 缓存天数
    day: 0,
    // 页面name  设置缓存天数时用
    name: "",
    // 不使用默认html
    no_use_default_html: false,
    // loading 元素上用到的 loading 图
    loading_arr: [],
    // 首屏需要加载的图片数组
    page_arr: [],
    // 需要预加载的图片的包含元素  设置这个后就不需要设置 page_arr，
    // 而是会 读取 all_image_container 内的所有元素的背景图和image
    all_image_container: false,
    // 非首屏加载数组
    after_load_arr: [],
    // 在 所有 load 开始之前 可以拿到 dom
    before_load_callback: space_fn,
    // loading_arr 数组中的图片 load 完一张图片调用一次
    loading_single_callback: space_fn,
    // loading_arr load 完的回调
    loading_all_callback: space_fn,
    // page_arr 数组中的图片 load 完一张图片调用一次
    page_single_callback: space_fn,
    // page_arr load 完的回调  此时就可以展示业务页面了
    page_all_callback: space_fn,
    // 没有图片loading时的回调 设置缓存天数时用
    no_loading_callback: space_fn
};
```

`loading_page` 对外提供了 6 个方法，1 个属性。

```js
const { auto, preload, change_default_loading, after_load_fn, debug, change_load_fn } = loading_page;
const { version } = loading_page;
```

## 一般使用方法

```js
const { auto } = loading_page;

/**
 * 一般加载方法， 返回的是一个 fire, 调用 fire 后即可完成loading
 * interface 均可自定义
 * 不过 all_image_container 这个属性会重写为 all_image_container = document
 */
const load_fire = auto(interface);

// 然后再在需要的地方执行,  比如 ajax 回调里
load_fire();
```

一般与这个配合的还有个方法

```js
const { after_load_fn } = loading_page;

/**
 * 载入完毕后的预加载函数
 * @param {*} arr 加载的数组
 * @param {*} finish 所有完成后的回调
 */
after_load_fn([], () => {});
```

这个就可以在底部 预加载非首屏需要的文件。

## 自由度最高的使用

估计这个没人会用，我也不多说了。 看 demo

```js
const { preload } = loading_page;
/**
 * 最基础的loading, 一切都靠自己定义， 自由度最大
 * 返回一个 监听者实例
 */
const handler = preload(interface);
```

## 拓展你的预加载文件

虽然我觉得这个肯定也没有人会用，但我还是想多介绍一下这个功能。~~（毕竟是 OCP 原则，我信了你的邪）~~

先看 demo

```js
const { change_load_fn } = loading_page;

/**
 * 这是组件内置支持MP3格式的 实现方式
 * @param {string} files 文件类型
 * @param {function} fn 加载函数 。
 * 加载函数的两个参数是 当前加载文件的 url ,以及当前文件加载完成的 回调函数
 * 需要 return 出这个dom
 */
change_load_fn("mp3", (url, cb) => {
    const mp = new Audio();
    mp.onload = mp.onerror = e => {
        e.stopPropagation();
        cb && cb();
    };
    mp.autoplay = false;
    mp.src = url;
    return mp;
});
```

目前内置支持的格式有 `jpg` `png` `gif` `jpeg` `mp3`, 大小写敏感。你可以拓展，随便怎么加载，只要你想，并且浏览器支持。
比如 `js, css, video`, 加载完成添加到哪，看你回调怎么写了。

## debug

虽说是 debug, 也没那么强大，你自己试一下就知道是哪种 debug 了 =。=

```js
const { debug } = loading_page;
debug();
```

要确保的一点是， 这个方法的调用，要在正式方法（`auto preload`）调用 **之前**。

## 换肤

这个我同样觉得没人觉得统一的丑，毕竟设计的好看 ~~毕竟你也懒~~ 。可是万一换呢：

```js
const { change_default_loading } = loading_page;

/**
 * 更换
 * @param {string} type 替换的类型   type: css | html,  二选一
 * @param {function} fn 加载函数 。  参数是当前这个loading的id, 其实也用不到，但就是想传给你 =。=
 */
change_default_loading("html", num => `<div>${num}</div>`);
```

要确保的一点是， 这个方法的调用，要在正式方法（`auto preload`）调用 **之前**。

## version

版本号。。鸡肋。。

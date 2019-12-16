# browser cache

## 缓存的判断策略

浏览器对于所请求资源的缓存处理有一套完整的机制，主要包含以下三个策略：存储策略、过期策略、协商策略.

-   存储策略发生在收到请求响应后，用于决定是否缓存相应资源
-   过期策略发生在请求前，用于判断缓存是否过期
-   协商策略发生在请求中，用于判断缓存资源是否更新

## 缓存方法

强缓存包括 Expires 和 Cache-Control，主要是在过期策略生效时应用的缓存。弱缓存包括 Last-Modified 和 ETag，是在协商策略后应用的缓存。强弱缓存之间的主要区别在于获取资源时是否会发送请求。  
![缓存方法](https://github.com/cmcesummer/public.js/blob/master/knowledge/browserCache/image/cache1.png)

### Expires

Expires 指定缓存的过期时间，为绝对时间，即某一时刻。参考 **本地时间** 进行比对，在指定时刻后过期。RFC 2616 建议最大值不要超过 1 年。  
Expire 头字段是响应头字段，格式如下：Expires: Sat Oct 20 2018 00:00:00 GMT+0800 (CST)。

```js
app.use(async (ctx, next) => {
    // 在此处设置缓存策略
    ctx.set("Expires", new Date("2018-10-20 00:00:00"));
    next();
});
```

### Cache-Control

`Cache-Control`用于指定资源的缓存机制，可以同时在请求头和响应头中设定，涉及上述三个策略中的两个策略：**存储策略、过期策略**。

Cache-Control 的语法如下：Cache-Control: cache-directive[,cache-directive]。cache-directive 为缓存指令，**大小写不敏感**，共有 12 个与 HTTP 缓存标准相关，如下表所示。其中请求指令 7 种，响应指令 9 种。Cache-Control 可以设置多个缓存指令，以逗号,分隔。

![缓存方法](https://github.com/cmcesummer/public.js/blob/master/knowledge/browserCache/image/cache2.png)

-   max-age 在请求头中的主要应用为 max-age=0 表示不使用缓存。
-   max-age 指令用于指定缓存过期的相对时间。**其优先级高于 Expires**，如果同时设置 max-age 和 Expires，max-age 生效，忽略 Expires。
-   no-cache 并不是指不缓存文件，no-store 才是指不缓存文件。no-cache 仅仅是表明跳过强缓存，强制进入协商策略。

```js
app.use(async (ctx, next) => {
    // 在此处设置缓存策略
    ctx.set("Cache-Control", "no-store");
    ctx.set("Cache-Control", "max-age=86400");
    // ...
    next();
});
```

### Pragma

通常设置为`Pragma:no-cache`, 作用与`Cache-Control:no-cache`相同。  
当在浏览器进行强刷（Comand + Shift + R / Ctrl + F5）或在 NetWork 面板内勾选禁用缓存（Disable Caches）时，`request headers`会自动带上 Pragma:no-cache 和 Cache-Control:no-cache。并且不会带上协商策略中所涉及的信息（下面介绍的 If-Modified-Since/If-None-Match）。这时不会使用任何缓存，重新获取资源。

### Last-Modified/If-Modified-Since/If-Unmodified-Since

-   `Last-Modified`用于标记请求资源的最后一次修改时间;
-   返回的资源带有`Last-Modified`标识时，再次请求该资源，浏览器会自动带上`If-Modified-Since`，值为返回的`Last-Modified`值。请求到达服务器后，服务器进行判断，如果从上次更新后没有再更新，则返回 304。如果更新了则重新返回.
-   如果`Expires，Cache-Control: max-age`，或 `Cache-Control:s-maxage`都没有在响应头中出现，这个才生效

```js
app.use(async (ctx, next) => {
    // 在此处设置缓存策略
    const stat = fs.statSync(ctx.filePath);
    const mtime = new Date(stat.mtime).toGMTString();
    const lastMod = ctx.get("If-Modified-Since");
    if (lastMod === mtime) {
        ctx.status = 304;
        return;
    }
    ctx.set("Last-Modified", mtime);
    next();
});
```

### ETag/If-Match/If-None-Match

-   `ETag`是请求资源在服务器的唯一标识，浏览器可以根据`ETag`值缓存数据。在再次请求时通过`If-None-Match`携带上次的`ETag`值，如果值不变，则返回 304，如果改变你则返回新的内容。
-   ETag 和 If-None-Match 的值均为双引号包裹的。
-   `If-Match`判断逻辑逻辑与`If-None-Match`相反

```js
app.use(async (ctx, next) => {
    const tag = `"${ctx.filemd5}"`; // 文件的md5 也可以是别的
    const matchTag = ctx.get("If-None-Match");
    if (matchTag === tag) {
        ctx.status = 304;
        log("ETag生效");
        return;
    }
    ctx.set("ETag", tag);
    next();
});
```

-   当`ETag`和`Last-Modified`，`ETag`优先级更高，但不会忽略`Last-Modified`, 需要服务端实现;

```js
app.use(async (ctx, next) => {
    // 设置ETag
    const tag = `"${ctx.filemd5}"`;
    ctx.set("ETag", tag);
    const matchTag = ctx.get("If-None-Match");
    // 设置Last-Modified
    const lastMod = ctx.get("If-Modified-Since");
    const stat = fs.statSync(ctx.filePath);
    const mtime = new Date(stat.mtime).toGMTString();
    ctx.set("Last-Modified", mtime);
    if (matchTag) {
        // etag 缓存判断
        if (matchTag === tag) {
            ctx.status = 304;
            log("ETag 生效");
            return;
        }
    } else if (lastMod) {
        // last-modified缓存
        if (lastMod === mtime) {
            ctx.status = 304;
            log("Last-Modified 生效");
            return;
        }
    }
    next();
});
```

## 优缺点

![优缺点](https://github.com/cmcesummer/public.js/blob/master/knowledge/browserCache/image/cache2.png)

## 最佳实践

1. 不要缓存 HTML，避免缓存后用户无法及时获取到更新内容。

2. 使用`Cache-Control`和`ETag`来控制`HTML`中所使用的静态资源的缓存。一般是将`Cache-Control`的`max-age`设成一个比较大的值，然后用`ETag`进行验证。

3. 使用签名或者版本来区分静态资源。这样静态资源会生成不同的资源访问链接，不会产生修改之后无法感知的情况

[from](https://mp.weixin.qq.com/s/b_vo_epjycDsGvczU6ol3Q)
[code](https://github.com/verymuch/learning-web-cache)

[other](https://juejin.im/post/5df5bcea6fb9a016091def69)

# browser cache

## 缓存的判断策略

浏览器对于所请求资源的缓存处理有一套完整的机制，主要包含以下三个策略：存储策略、过期策略、协商策略.  

- 存储策略发生在收到请求响应后，用于决定是否缓存相应资源 
- 过期策略发生在请求前，用于判断缓存是否过期
- 协商策略发生在请求中，用于判断缓存资源是否更新

## 缓存方法
强缓存包括Expires和Cache-Control，主要是在过期策略生效时应用的缓存。弱缓存包括Last-Modified和ETag，是在协商策略后应用的缓存。强弱缓存之间的主要区别在于获取资源时是否会发送请求。  
![缓存方法](https://github.com/cmcesummer/public.js/blob/master/knowledge/browserCache/image/cache1.png)  

### Expires

Expires指定缓存的过期时间，为绝对时间，即某一时刻。参考 __本地时间__ 进行比对，在指定时刻后过期。RFC 2616建议最大值不要超过1年。   
Expire头字段是响应头字段，格式如下：Expires: Sat Oct 20 2018 00:00:00 GMT+0800 (CST)。   

```js
app.use(async (ctx, next) => {
    // 在此处设置缓存策略
    ctx.set("Expires", new Date("2018-10-20 00:00:00"));
    next();
});
```

### Cache-Control

`Cache-Control`用于指定资源的缓存机制，可以同时在请求头和响应头中设定，涉及上述三个策略中的两个策略：**存储策略、过期策略**。    

Cache-Control的语法如下：Cache-Control: cache-directive[,cache-directive]。cache-directive为缓存指令，**大小写不敏感**，共有12个与HTTP缓存标准相关，如下表所示。其中请求指令7种，响应指令9种。Cache-Control可以设置多个缓存指令，以逗号,分隔。

![缓存方法](https://github.com/cmcesummer/public.js/blob/master/knowledge/browserCache/image/cache2.png) 

- max-age在请求头中的主要应用为max-age=0表示不使用缓存。
- max-age指令用于指定缓存过期的相对时间。**其优先级高于Expires**，如果同时设置max-age和Expires，max-age生效，忽略Expires。
- no-cache并不是指不缓存文件，no-store才是指不缓存文件。no-cache仅仅是表明跳过强缓存，强制进入协商策略。

```js
app.use(async (ctx, next) => {
    // 在此处设置缓存策略
    ctx.set("Cache-Control", 'no-store');
    ctx.set("Cache-Control", 'max-age=86400');
    // ...
    next();
});
```

### Pragma

通常设置为`Pragma:no-cache`, 作用与`Cache-Control:no-cache`相同。  
当在浏览器进行强刷（Comand + Shift + R / Ctrl + F5）或在NetWork面板内勾选禁用缓存（Disable Caches）时，`request headers`会自动带上Pragma:no-cache和Cache-Control:no-cache。并且不会带上协商策略中所涉及的信息（下面介绍的If-Modified-Since/If-None-Match）。这时不会使用任何缓存，重新获取资源。

### Last-Modified/If-Modified-Since/If-Unmodified-Since



















[from](https://mp.weixin.qq.com/s/b_vo_epjycDsGvczU6ol3Q)
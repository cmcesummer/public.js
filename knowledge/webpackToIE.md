# webpack 打包到 ie 出现的问题

## ES3 中保留字问题

`default extends class catch` 是保留字  
添加 `es3ify-loader`;

```javascript
module: {
    rules: [
        {
            test: /.js$/,
            enforce: "post", // post-loader处理
            loader: "es3ify-loader"
        }
    ];
}
```

或者 `es3ify-webpack-plugin`;

```javascript
const es3ifyPlugin = require("es3ify-webpack-plugin");
plugins: [new es3ifyPlugin()];
```

## 压缩产生问题

可能是 `a['default'] => a.default` 又造成了关键字问题。

```javascript
/** May the source-map be with you! **/
new webpack.optimize.UglifyJsPlugin({
    compress: {
        properties: false // optimize property access: a["foo"] → a.foo
    },
    output: {
        beautify: true, // beautify output?
        quote_keys: true // {'a': 5} {a: 5}  quote all keys in object literals?
    }
});
```

## ES5 的 API 兼容报错

在 webpack 的 entry 入口文件 top 引入 es5-shim :

```javascript
require("es5-shim");
require("es5-shim/es5-sham");
```

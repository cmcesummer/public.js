# 正则

先 mark https://juejin.im/post/5bda4e6fe51d45681f245274

## 开始与结束

```js
"regex".match(/^r/);
```

-   作为匹配文本开始元字符的时候必须是正则主体的第一个符号，否则正则无效。
-   它匹配的是一个位置，而不是具体的文本。
-   它在其他规则中有另外的含义。

## 带反斜杠的元字符

| 元字符 | 含义                                         |
| ------ | -------------------------------------------- |
| \d     | 匹配一个数字字符(digit)                      |
| \D     | 匹配一个非数字字符                           |
| \s     | 匹配一个空白字符(space)                      |
| \S     | 匹配一个非空白字符                           |
| \w     | 匹配一个字母或者一个数字或者一个下划线(word) |
| \W     | 匹配一个字母、数字和下划线之外的字符         |
| \b     | 匹配一个单词边界(boundary)                   |
| \B     | 匹配一个非单词边界                           |

### \b

```js
"hello regex s".match(/\bregex/);
// ["regex", index: 6, input: "hello regex", groups: undefined]
"hello regex s".match(/\Bregex/);
// null
"helloregex s".match(/\Bregex/);
// ["regex", index: 5, input: "helloregex s", groups: undefined]
```

`\b` 匹配的也是一个位置，而不是一个字符。单词和空格之间的位置，就是所谓单词边界。

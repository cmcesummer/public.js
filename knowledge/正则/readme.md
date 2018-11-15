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

### 匹配所有字符

`[\s\S]` 或者 `[\w\W]` 等类似的 `(.|\n)`;  
`.` 在正则中 它匹配换行符之外的任意单个字符。

## 量词

| 量词  | 含义                                         |
| ----- | -------------------------------------------- |
| ?     | 重复零次或者一次                             |
| +     | 重复一次或者多次，也就是至少一次             |
| \*    | 重复零次或者多次，也就是任意次数             |
| {n}   | 重复 n 次                                    |
| {n,}  | 重复 n 次或者更多次                          |
| {n,m} | 重复 n 次到 m 次之间的次数，包含 n 次和 m 次 |

有三点需要注意：

-   `?`在诸如匹配 `http 协议`的时候非常有用，就像这样：`/http(s)?/`。它在正则中除了是量词还有别的含义，后面会提到。 非贪婪。

*   我们习惯用`/.*/`来匹配若干对我们没有价值的文本，它的含义是若干除换行符之外的字符。比如我们需要文本两头的格式化信息，中间是什么无所谓，它就派上用场了。不过它的性能可不好。

-   `{n,m}`之间不能有空格，空格在正则中是有含义的。

## 贪婪模式与非贪婪模式

`/\/\/i\.alicdn\.com/.*?(\/font\/)/`  
取第一个遇到的 `/font/`  
贪婪模式在正则中是默认的模式，就是在既定规则之下匹配尽可能多的文本。因为正则中有量词，它的重复次数可能是一个区间，这就有了取舍。  
紧跟在量词之后加上?就可以开启非贪婪模式。怎么省事怎么来。  
这里的要点是，?必须紧跟着量词，否则的话它自己就变成量词了。

## 字符组

```js
"grey or gray".match(/gr[ae]y/);
// ["grey", index: 0, input: "grey or gray", groups: undefined]
```

方括号在正则中表示一个区间，我们称它为字符组。  
首先，字符组中的字符集合只是所有的可选项，最终它只能匹配一个字符。  
然后，字符组是一个独立的世界，元字符`不需要转义`。
最后，有两个字符在字符组中有特殊含义。  
`^`在字符组中表示取反，不再是文本开始的位置了。  
`-`本来是一个普通字符，在字符组中摇身一变成为连字符。

```js
"$".match(/$/);
// ["", index: 1, input: "$", groups: undefined]
"$".match(/\$/);
// ["$", index: 0, input: "$", groups: undefined]
"$".match(/[$]/);
// ["$", index: 0, input: "$", groups: undefined]
"1^1".match(/[^]/);
// ["1", index: 0, input: "1^1", groups: undefined]
"1^1".match(/[\^]/);
// ["^", index: 1, input: "1^1", groups: undefined]
"abc-3".match(/[0-z]/);
// ["a", index: 0, input: "abc-3", groups: undefined]
"regex".match(/[^re]/);
// ["g", index: 2, input: "regex", groups: undefined]
```

## 捕获组与非捕获组

圆括号

```js
"i love you very very very much".match(/i love you (very )+much/);
// ["i love you very very very much", "very ", index: 0, input: "i love you very very very much", groups: undefined]
```

圆括号的意思是将它其中的字符集合打包成一个整体，然后量词就可以操作这个整体了。这和方括号的效果是完全不一样的。

而且默认的，圆括号的匹配结果是可以捕获的。

### 正则内捕获

```js
"<App>hello regex</App>".match(/<([a-zA-Z]+)>.*<\/\1>/);
// ["<App>hello regex</App>", "App", index: 0, input: "<App>hello regex</App>", groups: undefined]
```

这时候就要用到正则的捕获特性。正则内捕获使用`\数字`的形式，分别对应前面的圆括号捕获的内容。这种捕获的引用也叫**反向引用**。

```js
"<App>hello regex</App><p>A</p><p>hello regex</p>".match(/<((A|a)pp)>(hello regex)+<\/\1><p>\2<\/p><p>\3<\/p>/);
// ["<App>hello regex</App><p>A</p><p>hello regex</p>", "App", "A", "hello regex", index: 0, input: "<App>hello regex</App><p>A</p><p>hello regex</p>", groups: undefined]
```

如果有嵌套的圆括号，那么捕获的引用是先递归的，然后才是下一个顶级捕获。所以这里`/2`是`A`

### 正则外捕获

看代码

```js
"hello **regex**".match(/(\*{2})(.*)\*{2}/);
//  ["**regex**", "**", "regex", index: 6, input: "hello **regex**", groups: undefined]
RegExp.$1;
// "**"
RegExp.$2;
// "regex"
RegExp.$3;
// ""
```

还有一个也支持正则捕获 `replace`:

```js
"hello **regex**".replace(/\*{2}(.*)\*{2}/, "<strong>$1</strong>");
// "hello <strong>regex</strong>"
```

### 捕获命名

> es2018 新特性

```js
"<App>hello regex</App>".match(/<(?<tag>[a-zA-Z]+)>.*<\/\k<tag>>/);
// ["<App>hello regex</App>", "App", index: 0, input: "<App>hello regex</App>", groups: {…}]
```

开始的时候加上 `?<tag>` 命名，`<>`中是名称， 下一个从 `\k<tag>` 表示对上一个命名的捕获。

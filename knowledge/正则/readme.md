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

### 非捕获组

只要在圆括号内最前面加上`?:`标识，就是告诉正则引擎：我只要这个整体，不需要它的引用，你就别费劲了。
示例：
`/fs(?:q|c)/`:  
![非捕获组](https://github.com/cmcesummer/public.js/blob/master/knowledge/%E6%AD%A3%E5%88%99/img/image.png)

`/fs(q|c)/`:  
![捕获组](https://github.com/cmcesummer/public.js/blob/master/knowledge/%E6%AD%A3%E5%88%99/img/image1.png)

## 分支 | 或者

```js
"abc".match(/a(b|d)/);
// ["ab", "b", index: 0, input: "abc", groups: undefined]
```

## 零宽断言

### 零宽肯定先行断言

我要匹配一段文本，但是这段文本后面必须紧跟着另一段特定的文本。零宽肯定先行断言就是一个界碑，**我要满足前面和后面所有的条件，但是我只要前面的文本**。

```js
"CoffeeScript JavaScript javascript".match(/\b\w{4}(?=Script\b)/);
// ["Java", index: 13, input: "CoffeeScript JavaScript javascript", groups: undefined]
```

```js
"CoffeeScript JavaScript javascript".match(/\b\w{4}(Script\b)/);
// ["JavaScript", "Script", index: 13, input: "CoffeeScript JavaScript javascript", groups: undefined]
```

```js
"CoffeeScript JavaScript javascript".match(/\b\w{4}(?=Script\b)\w+/);
// ["JavaScript", index: 13, input: "CoffeeScript JavaScript javascript", groups: undefined]
```

上面的例子更加直观，零宽肯定先行断言已经匹配过`Script`一次了，后面的`\w+`却还是能匹配`Script`成功，足以说明它的`零宽`特性。它为紧贴在它前面的规则服务，并且不影响后面的匹配规则。

### 零宽肯定后行断言

先行是向前看，那后行就是向后看。语法是**圆括号内最左边加上`?<=`标识**。

```js
"11 2gonguzo2 1gonguzo1".match(/(?<=1)gonguzo\d/);
// ["gonguzo1", index: 14, input: "11 2gonguzo2 1gonguzo1", groups: undefined]
```

是 `gonguzo1` 不是 `gonguzo2` 是因为前边必须是`1`开头的

### 零宽否定先行断言

语法是**圆括号内最左边加上`?!`标识**。

### 零宽否定后行断言

语法是**圆括号最左边加上`?<!`标识。**

## 修饰符

### g 修饰符

```js
"abc bbc acd".match(/(?<=a)\S+/);
// ["bc", index: 1, input: "abc bbc acd", groups: undefined]
"abc bbc acd".match(/(?<=a)\S+/g);
// ["bc", "cd"]
```

### i 修饰符

`i`是`ignoreCase`的缩写。默认情况下，`/z/`是无法匹配 Z 的，所以我们有时候不得不这样写：`/[a-zA-Z]/`。`i`修饰符可以全局忽略大小写。

```js
"javascript is great".match(/JavaScript/);
// null
"javascript is great".match(/JavaScript/i);
// ["javascript", index: 0, input: "javascript is great", groups: undefined]
```

### m 修饰符

它要和`^`和`$`搭配起来使用。默认情况下，`^`和`$`匹配的是文本的开始和结束，加上`m`修饰符，它们的含义就变成了行的开始和结束。

```js
`
abc
xyz
`.match(/xyz/);
// ["xyz", index: 5, input: "↵abc↵xyz↵", groups: undefined]
`
abc
xyz
`.match(/^xyz$/);
// null
`
abc
xyz
`.match(/^xyz$/m);
// ["xyz", index: 5, input: "↵abc↵xyz↵", groups: undefined]
```

### u 修饰符

`u`是`unicode`的缩写。有一些`Unicode`字符超过一个字节，正则就无法正确的识别它们。`u`修饰符就是用来处理这些不常见的情况的。

```js
"𠮷".match(/^.$/);
// null
"𠮷".match(/^.$/u);
// ["𠮷", index: 0, input: "𠮷", groups: undefined]
```

---

---

## RegExp

```js
new RegExp("abc", "gi");
// /abc/gi
```

## match

`match`是`String`实例方法。

-   匹配失败返回`null`
-   非全局匹配

    -   数组的第一项是匹配结果。如果不传参则匹配结果为空字符串。
    -   如果正则参数中有`捕获组`，捕获的结果在数组中从`第二项`开始依次排列。有捕获组但是没有捕获内容则显示`undefined`。
    -   数组有一个`index`属性，标明匹配结果在文本中的起始位置
    -   数组有一个`groups`属性，它存储的不是捕获组的信息，而是捕获命名的信息.

-   全局匹配 返回一个数组。

## replace

`replace`是`String`实例方法。 第二个参数可以是字符串或者函数，它的作用是替换。

### 第二个参数是 String

```js
// $数字 代表相应顺序的捕获组
"@abc-xyz-$abc".replace(/([^-]+)abc/g, "$1biu");
// "@biu-xyz-$biu"

// $& 代表匹配结果。
"@abc-xyz-$abc".replace(/([^-]+)abc/g, "{$&}");
// "{@abc}-xyz-{$abc}"

// $`代表匹配结果左边的文本。
"@abc-xyz-$abc".replace(/([^-]+)abc/g, "{$`}");
// "{}-xyz-{@abc-xyz-}"

// $'代表匹配结果右边的文本。
"@abc-xyz-$abc".replace(/([^-]+)abc/g, "{$'}");
// "{-xyz-$abc}-xyz-{}"

// 有些时候我要的是变量的符号本身，而不是它的变量值，怎么办？加一个$转义一下。
"@abc-xyz-$abc".replace(/([^-]+)abc/g, "$$1biu");
// "$1biu-xyz-$1biu"
```

### 第二个参数是函数

函数的返回值就是要替换的内容。函数如果没有返回值，默认返回 undefined，所以替换内容就是 undefined。

1. 函数的第一个参数，是匹配结果。

```js
"abc-xyz-abc".replace(/abc/g, match => `{${match}}`);
// "{abc}-xyz-{abc}"
"abc-xyz-abc".replace(/abc/g, match => {});
// "undefined-xyz-undefined"
```

2. 如果有捕获组，函数的后顺位参数与捕获组一一对应。

```js
"@abc3-xyz-$abc5".replace(/([^-]+)abc(\d+)/g, (match, $1, $2) => `{${$1}${match}${$2}}`);
// "{@@abc33}-xyz-{$$abc55}"
```

3. 倒数第二个参数是匹配结果在文本中的位置。

```js
"@abc-xyz-$abc".replace(/([^-]+)abc/g, (match, $1, index) => `{${match}是位置是${index}}`);
// "{@abc是位置是0}-xyz-{$abc是位置是9}"
```

4. 倒数第一个参数是源文本。

## search

`search`是`String`实例方法。  
它的作用是找出首次匹配项的索引。它的功能较单一，性能也更好。

```js
"abc-xyz-abc".search(/xyz/);
// 4
"abc-xyz-abc".search(/ac/);
// -1
```

-   它接受一个正则表达式作为唯一参数。
-   因为只能返回首次匹配的位置，所以全局匹配对它无效。
-   如果匹配失败，返回-1。

## split

`split`是`String`实例方法。

```js
"abc-def_mno+xyz".split(/[-_+]/);
// ["abc", "def", "mno", "xyz"]
"abc-def_mno+xyz".split(/[-_+]/, 3);
// ["abc", "def", "mno"]
"abc-def_mno+xyz".split(/[-_+]/, 5);
// ["abc", "def", "mno", "xyz"]
```

## exec

`exec`是`RegExp`实例方法。它的作用是根据参数返回匹配结果，与字符串方法 match 相似。

```js
/xyz/.exec("abc-xyz-abc");
// ["xyz", index: 4, input: "abc-xyz-abc", groups: undefined]
/mno/.exec("abc-xyz-abc");
// null
/xyz/.exec();
// null
```

它们俩最大的区别在于全局匹配的场景。

```js
const reg = /abc/g;
const str = "abc-xyz-abc";
reg.lastIndex;
// 0
reg.exec(str);
// ["abc", index: 0, input: "abc-xyz-abc", groups: undefined]
reg.lastIndex;
// 3
reg.exec(str);
// ["abc", index: 8, input: "abc-xyz-abc", groups: undefined]
reg.lastIndex;
// 11
reg.exec(str);
// null
reg.lastIndex;
// 0
reg.exec(str);
// ["abc", index: 0, input: "abc-xyz-abc", groups: undefined]
```

-   因为`lastIndex`会不断更新，最终又会归于`0`，所以这个匹配过程是可以无限重复的。
-   `lastIndex`属性是属于正则实例的。只有同一个实例的`lastIndex`才会不断更新。

```js
/abc/g.exec("abc-xyz-abc");
// ["abc", index: 0, input: "abc-xyz-abc", groups: undefined]
/abc/g.exec("abc-xyz-abc");
// ["abc", index: 0, input: "abc-xyz-abc", groups: undefined]
/abc/g.exec("abc-xyz-abc");
// ["abc", index: 0, input: "abc-xyz-abc", groups: undefined]
```

如果不把正则提取出来，获得它的引用，exec 方法就一直在原地打转，因为每次都是一个新的正则实例，每次 lastIndex 都要从 0 开始。

## test

```js
/abc/.test("abc-xyz-abc");
// true
/mno/.test("abc-xyz-abc");
// false
```

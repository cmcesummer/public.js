# xss csrf

## xss
`Cross Site Scripting`   跨站脚本攻击   
- XSS 的本质是：恶意代码未经过滤，与网站正常的代码混在一起；浏览器无法分辨哪些脚本是可信的，导致恶意脚本被执行。

| 字符 |  	转义后的字符 |
|------|-----------|
| `&` |  `&amp;` |
| `<` |  `&lt;` |
| `>` |  `&gt;` |
| `"` |  `&quot;` |
| `'` |  `&#x27;` |
| `/` |  `&#x2F;` |

- 做了 HTML 转义，并不等于高枕无忧。
- 对于链接跳转，如 `<a href="xxx"` 或 `location.href="xxx"`，要检验其内容，禁止以 `javascript:` 开头的链接，和其他非法的 `scheme`。   

在处理输入时，以下内容都不可信：  

- 来自用户的 UGC 信息
- 来自第三方的链接
- URL 参数
- POST 参数
- Referer （可能来自不可信的来源）
- Cookie （可能来自其他子域注入）

防范
- HTTP-only Cookie: 禁止 JavaScript 读取某些敏感 Cookie，攻击者完成 XSS 注入后也无法窃取此 Cookie。
- 验证码：防止脚本冒充用户提交危险操作。
- 利用模板引擎 开启模板引擎自带的 HTML 转义功能
- 避免内联事件。尽量不要使用 onLoad="onload('{{data}}')"、onClick="go('{{action}}')" 这种拼接内联事件的写法。
- 避免拼接 HTML ，采用比较成熟的渲染框架，如 Vue/React 等。


## csrf
`Cross-site request forgery`  



//计划 jQ源码 抓紧把这个看完 之后去看 不知道的js promise部分
//之后找个react看，我还想看一遍高程，快速浏览一遍几个重要章节就得了，穿插进行
//看一部分nodejs，python一起进行
//


//attribute是特性： 直接写在标签上的属性  setAttribute('a','b') getAttribute('a')
//property是属性： 通过'.'进行设置、读取属性 	

//e.className 
//ie opera
//e.setAttribute('className','value');

//tabindex 属性可设置或返回按钮的 tab 键控制次序

//readonly 属性规定输入字段为只读。

//maxlength 属性规定输入字段的最大长度，以字符个数计。

//cellspacing 属性规定单元格之间的空间

//cellpadding 属性规定单元边沿与其内容之间的空白。

//rowspan 属性规定单元格可横跨的行数。

//colspan 属性规定单元格可横跨的列数。


//通过selectedIndex 属性可设置或返回下拉列表中被选选项的索引号
//

//var red = document.getElement
var select = document.getElementsByTagName('select')[0]
var option = select.options;
//select.value = 2;  //设置selector的value
//选中的文本
var index = select.selectedIndex;
console.log(select.options[index].text)

console.log(select.value);


//对于 .html() 来说 就是  innerHTML = ;
//对于 .text() 来说 是 ele.textContent ; DOM 3 才有的方法
//

//这个是多选的
console.log(select.length)
for(var i = 0; i < select.length; i++) {
	if(select.options[i].selected) {
		console.log(select.options[i].value)
	}
}

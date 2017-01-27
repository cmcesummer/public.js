

(function() {

var qu = function() {
	this.name = 'a'
}
qu.prototype = {
	init : function() {
		
		this.length = 1;
		this[0] = 'a';

	}
}

qu.prototype.init();

})()


//css 选择器
//div p 选择 <div> 元素内部的所有 <p> 元素。
//div>p  选择父元素为 <div> 元素的所有 <p> 元素。
//这两个区别：<div> <p></p> <span><p></p></span>	</div>
//div+p 选择紧接在 <div> 元素之后的所有 <p> 元素。
//p:first-child	选择属于父元素的第一个子元素的每个 <p> 元素。
//p:nth-child(2)  p:nth-last-child(1);
//
//
//对于js来讲

document.getElementById('test');
document.getElementsByTagName('input');
document.getElementsByName('checkbox');  //获取name为checkbox的DOM节点

document.getElementsByClassName('red');
//document.querySelector(); //querySelector() 方法返回文档中匹配指定 CSS 选择器的一个元素。
//document.querySelectorAll(); //如果你需要返回所有的元素，请使用 querySelectorAll() 方法替代。
//

//实现$('.selector span')  className的时候要加0的，注意这个点
console.log(document.getElementsByClassName('selector')[0].getElementsByTagName('span'))
console.log(document.getElementById('sele'))
//选择同时拥有red和selector的
console.log(document.getElementsByClassName('selector red')[0])


//这是js针对监听多个checkbox或者radio循环添加方法
console.log(document.querySelectorAll('input[name="as"]'));
[...document.querySelectorAll('input[name="as"]')].forEach(function(item) {
	item.addEventListener('change', function() {
		console.log(this.value)
	})
})



//效率问题
document.getElementById('sele') //效率最高 所以
//$("#container").find("div.robotarm"); 
//$("#container div.robotarm")  上边就比下边效率高很多   所以可以这么写
document.getElementById('sele').querySelectorAll('.robotarm');
//querySelector() ie8+   

console.log(document.querySelector('.red span:nth-child(1)'));


//
var $sele = document.getElementById('sele');
console.log($sele.children);        // ie9+ childNodes 一般是没用的，会包含很多空节点nodeType=3的text
									//nodetype 1 元素 2属性 3 文本内容 这个就要遍历了
console.log($sele.parentNode);		//Element的父节点可能是Element，Document或DocumentFragment。
console.log($sele.parentElement);  //返回元素的父元素节点，与parentNode的区别在于，其父节点必须是一个Element，如果不是，则返回null

console.log($sele.previousSibling); //注意有可能拿到的节点是文本节点或注释节点，与预期的不符，要进行处理一下。
console.log($sele.previousElementSibling);//ie9+

console.log($sele.getBoundingClientRect())  //感觉这个没多少用

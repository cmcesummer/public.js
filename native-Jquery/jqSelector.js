

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
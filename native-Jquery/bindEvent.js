//事件绑定相关

//冒泡3阶段：捕获、事件目标、冒泡    捕获是从外层到里层
//事件委托就是目标本身不处理事件，委托给祖先元素
//绑定的事件一般都是冒泡的，从里往外传递
//e.stopPropagation() 阻止时间冒泡
//e.preventDefault() 阻止默认事件
	
//event对象常用属性和方法:  http://www.itxueyuan.org/view/6340.html

var we = document.getElementById('we');
we.addEventListener('click',function() {
	alert(1)
})

//代理

var bindHanle = function(element, type, handle) {
	if(window.addEventListener) {
		element.addEventListener(type, handle, false);
	} else if(window.attachEvent) {
		element.attachEvent('on' + type, handle);
	}
};

var removeHandle = function(element, type, handle) {
	if(window.removeEventListener) {
		element.removeEventListener(type, handle, false)
	} else {
		element.detachEvent('on' + type , handle);
	}
}


var sele = document.getElementById('sele');
var handle = function(e) {
	removeHandle(sele,'click', handle);
	e = e || window.event;
	var target = e.target || e.srcElement;
	console.log(target.tagName);
	if(target.className == 'two') {
		console.log('1')
	}
	if(~target.className.indexOf('two')) {
		console.log(1)
	}
};
bindHanle(sele, 'click', handle);
sele.addEventListener('click', handle, false);



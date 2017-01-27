

var we = document.getElementById('we');
we.style.height = '30px';

//合并cssText 所有浏览器都支持
var css = we.style.cssText ;
we.style.cssText = css + 'width:20px;display:inline-block';


//获取元素的某个属性值，外部css也可以
console.log(window.getComputedStyle(we,null).color) //rgb(255,0,0)
// getPropertyValue 不用驼峰写法 比如float 	border-top-left-radius  ie9+
console.log(window.getComputedStyle(we,null).getPropertyValue('color'))


//class 相关
console.log(we.className);
var addlass = function(ele, className) {
	var oldClass = ele.className ,
		space = oldClass ? ' ' : '',
		newClass = oldClass + space + className;
	ele.className = newClass;
}

addlass(we,'two thre');

var removeClass = function(ele,className) {
	var oldClass = ' ' + ele.className + ' ',
		remove = oldClass.replace(className + ' ', ''),
		newClass = remove.trim();
	ele.className = newClass;
}

removeClass(we,'two');

var hasClass = function(ele, className) {
	var oldClass = ele.className ;
	if(~oldClass.indexOf(className)) {
		return true
	} else {
		return false 
	}
}

console.log(hasClass(we,'thre'));


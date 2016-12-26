var $ready = function(fn) {
	if(document.addEventListener) {
		document.addEventListener('DOMContentLoaded', function addEvent() {
			document.removeEventListener('DOMContentLoaded', addEvent, false)
			fn();
		}, false);
	} else if(document.attachEvent) {
		document.attachEvent('onreadystatechange', function attachE() {    //当页面加载状态改变的时候执行这个方法.    这个主要针对ie
			if(document.readyState == 'complete') {   //当页面加载状态为完全结束时进入 
				document.detachEvent('onreadystatechange', attachE);
				fn();
			}
		})
	}
}
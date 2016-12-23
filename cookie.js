'use strict'

//options.expires   过期天数
//options.path
//options.domain
//options.secure
//只传 name 是获取，value 传null 是删除cookie 
let cookie = (name, value, options) => {
	if(typeof value == 'undefined') {
		let cookies = document.cookie;
		if(cookies) {
			let cookieArr = cookies.split(';');
			for(let i = 0; i < cookieArr.length; i++) {
				let cookie = cookieArr[i].replace(/^\s+/g, '');
				if(cookie.indexOf(name + '=') != -1) {
					return decodeURIComponent(cookie.substring(name.length + 1))
				}
			}
		}		
	} else {
		options = options || {};
		if(value === null) {
			value = '';
			expires = new Date(0);
		}
		let expires = options.expires ? ";expires=" + options.expires : '';
		let path = options.path ? ';path=' + options.path : ';path=/';
		let domian = options.domian ? ';domian=' + options.domian : '';
		let secure = options.secure ? ';secure=' + options.secure : '';
		document.cookie = name + "=" + value + expires + path + domain + secure;
	}
}
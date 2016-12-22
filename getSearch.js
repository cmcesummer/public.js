'use strict'

function getSearch(name) {
	var search = window.location.search.substring(1),
		searchArr = search.split('&');
	for(var i = 0; i < searchArr.length; i++) {
		if(searchArr[i].indexOf(name + '=') != -1) {
			return decodeURIComponent(searchArr[i].substring(name.length + 1));
		}
	}
}


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
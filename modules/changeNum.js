function Change(num) {
	this.num = num;
	this.bigNum = ['零','一','二','三','四','五','六','七','八','九'];
	this.position = ['','','十','百','千','万','亿'];
	this.bigNumArr = [];
	this.changePosi = [];
	this.str = '';
}

Change.prototype.init = function() {
	this.changeBig();
	this.readBigArr();
	this.joinTo();

}

Change.prototype.changeBig = function() {
	var numArr = this.num.toString().split(''),
	    that = this;
	numArr.forEach(function(item, index, arr) {
		that.bigNumArr.push(that.bigNum[item]);
	})
}

Change.prototype.readBigArr = function() {
	var that = this,
		length = this.bigNumArr.length;


	if(1 < length < 6) {
		
	}	
	/*if(length == 2 && this.bigNumArr[0] == '一') {
		this.changePosi[0] = this.position[0]
	} else {

	}*/
}

Change.prototype.joinTo = function() {
	var that = this;
	this.changePosi.forEach(function(item, index, arr) {
		that.str += that.bigNumArr[index] + item
	})
	this.str +=  that.bigNumArr[that.bigNumArr.length - 1]
}

var num = new Change(12);
num.init();
console.log(num.str)


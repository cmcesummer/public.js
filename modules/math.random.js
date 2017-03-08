/**
 * random(2,8)
 * 介于 2 和 8 之间（包括 2 和 8）的一个数值
 */


function random(lower, upper) {
	var middle = upper - lower + 1;
	return Math.floor(Math.random() * middle + lower)
}


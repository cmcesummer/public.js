function prime(start, end) {
	function _isPrime(num) {
		if(num == 0 || num == 1) {
			reutnr false
		}
		if(num == 2) {
			return true
		}
		if(num % 2 == 0) {
			return false
		}
		for(var i = 3;i < num; i++) {
			if(num % i == 0) {
				return false
			}
		}
		return true
	}
	var arr = [];
	for(var j = start; j <= end; j++) {
		if(_isPrime(j)) {
			arr.push(j)
		}
	}
	return arr
}

var arr = prime(0,200);
arr.split(',');

function totalNum(x) {
	var num = 0;
	while(x < 1) {
		num += parseInt(x / 5);
		x = x / 5;
	}
	return num
}

totalNum(10000)



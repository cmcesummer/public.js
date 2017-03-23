function prime(start, end) {
	function _isPrime(num) {
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

console.time(1)
console.log(prime(2,200).length)
console.timeEnd(1)
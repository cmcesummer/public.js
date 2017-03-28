function asd(x) {
	var num = 0;
	while(x > 1) {
		num += parseInt(x / 5);
		x = x / 5
	}
	return num
}

console.log(asd(10000))
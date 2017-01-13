
let asd1 = function(arr) {
    if(arr.length < 2) {return arr} //这个一定不要忘，否则RangeError: Maximum call stack size exceeded  什么超出调用栈
    let index = Math.floor(arr.length / 2),
        itemIndex = arr.splice(index, 1),
        left = [],
        right = [];

    for(let i = 0; i < arr.length; i++) {
        arr[i] < itemIndex ? left.push(arr[i]) : right.push(arr[i]);
    }

    return asd1(left).concat(itemIndex, asd1(right));
}
console.time(1)
console.log(asd1([123,456,12,85,28,94,65,21,3,5,132,5,23]))  //lan
console.timeEnd(1)

let asd2 = function(arr) {
	if(arr.length < 2) {return arr}
	let i = 0,
		j = arr.length,
		itemIndex = arr[0];

	while(i < j) {

		while(arr[j] > itemIndex && i < j) {
			j--
		}
		while(arr[j] < )

	}	



}

let qwe = function(arr) {
	let middle;
	for(let i = 0; i < arr.length; i++) {
		for(let j = 0; j < arr.length - i; j++) {
			if(arr[i] > arr[i+1]) {
				middle = arr[i];
				arr[i] = arr[i+1];
				arr[i+1] = middle
			}
		}
	}
	return arr 
}
console.time(2)
console.log(qwe([123,456,12,85,28,94,65,21,3,5,132,5,23]))
console.timeEnd(2)


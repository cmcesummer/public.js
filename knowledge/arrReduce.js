
// Array.prototype.reduce
const arr = [1,2,3,4,5];
let i = 1
let add = (arr) => {
	return arr.reduce((prev, item, index, arr) => {    //item是最后一个的时候结束   ， 
		console.log(i,prev,item);
		i++;

		return prev + item
	})
}

console.log(add(arr));

//Array.prototype.every
//Array.prototype.some
//indexOf
//lastIndexOf
//forEach
//map
//filter
//reduce
//deduceRight


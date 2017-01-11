
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
//reverse  对原数组产生影响
//concat  对原数组产生影响


//按值传递 安引用传递
var obj = {
	data:{
		page:[1],
		num:1
	},
	change() {
		let a = this.data.page;
		let b = this.data.num;
		this.data.page.push(2);
		this.data.num = 2
		console.log(a, b)
	}
}
obj.change();

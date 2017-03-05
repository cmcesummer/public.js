
//去重的两种方法 


var sameArr = [1,'1',2,2,3,3,4,4,5,5,6,6,7,2];

//----------------------1----------------------
console.time(1)
let set = new Set(sameArr);
var newArrSet = [...set];
console.timeEnd(1)

console.log(newArrSet)
//----------------------1----------------------
//

//----------------------2----------------------
let removeArr = arr => {
	let newArr = [],
		obj = {};

	for(let i = 0; i <arr.length; i++) {
		if(!obj[arr[i]]) {
			newArr.push(arr[i])
			obj[arr[i]] = 1;
		}
	}	

	return newArr
}

console.time(2);

removeArr(sameArr);

console.timeEnd(2)
console.log(removeArr(sameArr))
//----------------------2----------------------
//

//----------------------3----------------------
let removeArrNew = arr => {
	let newArr = [],
		newArr2 = [],
		obj = {},
		returnObj = {};

	for(let i = 0; i <arr.length; i++) {
		if(!obj[arr[i]]) {
			obj[arr[i]] = 1;
		} else {
			obj[arr[i]] += 1;
		}
	}	
	for(key in obj) {
		newArr.push(key);
		newArr2.push(obj[key]);
	}
	returnObj.newArr = newArr;
	returnObj.newArr2 = newArr2;
	return returnObj
}

console.time(3);
removeArrNew(sameArr)
console.timeEnd(3)
//----------------------3----------------------


//----------------------4----------------------
//针对2只能字符串当做key,可以用map结构

let removeArrMap = arr => {
	let newArr = [],
		arrSameNum = [],
		map = new Map();

	for(let i = 0; i < arr.length; i++) {
		if(!map.has(arr[i])) {
			map.set(arr[i],1);

		} else {
			let val = map.get(arr[i]);
			map.set(arr[i], val + 1);
		}
	}

	for(let val of map.values()) {
		arrSameNum.push(val);
	}

	// for(let item of map.entries()) {
	// 	console.log(item[0], item[1]);
	// }
	console.log(map)

}
removeArrMap(sameArr)
//----------------------4----------------------
//

//----------------------5----------------------
let removeJustArr = arr => {
	let newArr = [arr[0]];
	arr.sort();
	for(let i = 1; i < arr.length; i++) {
		if(arr[i] !== arr[i-1]) {
			newArr.push(arr[i])
		}
	}
	return newArr;
}
console.time(5);
removeJustArr(sameArr);
console.timeEnd(5);

console.log(removeJustArr(sameArr));
//----------------------5----------------------
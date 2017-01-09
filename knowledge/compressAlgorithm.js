//实现基本的字符串压缩算法 ，比如对字符串abbbbccccdddccccc,经过算法处理后得到的输出
//是a1b5c4d3c6，如果处理后的字符串长度不小于原长度，则返回原串
//function 1
(() => {

let compressAlgorithm = (str) => {
	if(str.length < 3) return str;
	let strArr = str.split(''),
	    arrType = [[]],
		i = 0,
		outStr = '',
		fn = () => {
			let item ;
			if(strArr.length > 1) {
				if(strArr[0] == strArr[1]) {
					item = strArr.splice(0, 1);
					arrType[i].push(item);
					//console.log(arrType);
					fn();
				} else if(strArr[0] != strArr[1]){
					item = strArr.splice(0, 1);
					arrType[i].push(item);
					i++;
					arrType.push([]);
					fn();
				}
			} else {
				arrType[i].push(strArr[0])
				
				console.log('The end output:');
				console.log(arrType)
			}
		};

	fn();

	for(let item of arrType) {
		outStr += item[0] + item.length;
	}

	if(str.length > outStr.length) {
		return outStr
	} else {
		return str
	}
}
let str = 'aabbbcccccdde'
console.time(1)
console.log(compressAlgorithm(str));
console.timeEnd(1)
})();

//function  2  
(() => {

let compressAlgorithm = (str) => {	
	if(str.length < 3) return str;

	let strArr = str.split(''),
		arrObj = {},
		outStr = '';

	for(let item of strArr) {
		if(!arrObj[item]) {
			arrObj[item] = [item];
		} else {
			arrObj[item].push(item)
		}
	}

	for(let key in arrObj) {
		outStr += key + arrObj[key].length
	}

	if(str.length > outStr.length) {
		return outStr
	} else {
		return str
	}
}

let str = 'aabbbcccccdde'
console.time(2)
console.log(compressAlgorithm(str));
console.timeEnd(2)             //2的性能比1好多了
})();
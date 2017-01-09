
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
let str = 'abcde'
console.log(compressAlgorithm(str));

})();

//function  2
(() => {

	

})();
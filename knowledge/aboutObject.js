// let obj1 = {
//     a: 1,
//     b: 2
// }

// let obj2 = {
//     c:3
// };

// let a = Object.assign(obj1, obj2);

// console.log(a, obj1)


// function add() {
//     var args = [...arguments];
//     function mid() {
//         args.push(...arguments);
//         return mid
//     }
//     mid.valueOf = function() {
//         console.log(args)
//         return args.reduce((lav, curv) => lav + curv, 0)
//     }
//     return mid;
// };
// console.log(add(1)(2)(1));
// console.log(add(1,2));


// sushu

function isSu1(num) {
    var i = 2;
    for(; i< num; i++) {
        if(num % i === 0) return false;
    }
    return true 
}

function isSu2(num) {
    if(num === 2) {
        return true
    }
    
    var i = 2;
    // 不能被 3 整除的 必然不能被 9 整除
    for(; i*i<= num ; i++) {
        if(num % i === 0) return false;
    }
    return true 
}

function isSu3(num) {
    if(num === 2) {
        return true
    }
    var i = 2;
    for(; i<= num / 2; i++) {
        if(num % i === 0) return false;
    }
    return true 
}

function getSu(num, suFn) {

    if(num === 1) {
        return [1]
    }
    var array = [];

    var i = 2;
    outer: for (; i <= num; i++) {
        if(suFn(i)) {
            array.push(i);
        }
    }
    return array.length;
}

const NUM = 100000;

console.time(1)
const suList1 = getSu(NUM, isSu1);
console.timeEnd(1)

console.time(2)
const suList2 = getSu(NUM, isSu2);
console.timeEnd(2)

console.time(3)
const suList3 = getSu(NUM, isSu3);
console.timeEnd(3)

console.log(suList1)
console.log(suList2)
console.log(suList3)


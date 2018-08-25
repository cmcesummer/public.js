let obj1 = {
    a: 1,
    b: 2
}

let obj2 = {
    c:3
};

let a = Object.assign(obj1, obj2);

console.log(a, obj1)


function add() {
    var args = [...arguments];
    function mid() {
        args.push(...arguments);
        return mid
    }
    mid.valueOf = function() {
        console.log(args)
        return args.reduce((lav, curv) => lav + curv, 0)
    }
    return mid;
};
console.log(add(1)(2)(1));
console.log(add(1,2));



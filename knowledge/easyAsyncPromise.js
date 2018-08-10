// async await
function* generator (x) {
    console.log(1);
    const res = yield new Promise(function(res, rej) {
        setTimeout(() => {
            res(x)
        })
    });
    console.log(res)
};

var g = generator(2);
const n1 = g.next();
console.log(n1)
// n1.value.then(res => console.log('res=',res));
n1.value.then(res => g.next(res));

// 所以 easy
function asyncFn(func, args) {
    const g = func(args);
    g.next().value.then(res => g.next(res)).catch(e => cosole.log(e))
}

function co(func, args) {
    const g = func(args);

    function next(res) {
        then(g.next(res))
    }

    function then(nextObj) {
        if(nextObj.done) return
        nextObj.value.then(next)
    }

    next();
}
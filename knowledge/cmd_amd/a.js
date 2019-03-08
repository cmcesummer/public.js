let { a, b } = require('./b.js');



exports.change = function () {
    b = 3;
    a.a = 'change'
}

exports.main = function () {
    console.log(a, b)
}


let { a, b } = require('./b.js');
const { main, change } = require('./a.js');

main();

change();

main();

console.log(a, b)

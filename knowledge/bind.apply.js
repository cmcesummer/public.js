//bind.apply  apply.bind
let add = (a, b) => (a + b),
	
	make_lazy = fn => fn.bind.apply(fn, arguments),     // 这样 arguments会报错

	lazy_value = make_lazy(add, 3, 4);

lazy_value(); // 7

// fn.bind.apply(fn, arguments) 这个等价于  fn.bind(fn, 参数1, 参数2);
// 
// 
// 
// 
// --------
// function a(a, b) {
// 	return a + b
// }
// function largestOfFour(arr) {
// 	return arr.map(Function.apply.bind(a,null))        ///这样写省去function(item){} 这个东西了 ？目的就是这个么 那这代码可读性略差，完全是为了装逼的吧
// }
function largestOfFive(arr) {
	return arr.map(Function.apply.bind(Math.max,null))
}
//由于 apply 在运行时，第1个参数是对象，第2个参数才是参数数组，
//而 map 会把当作参数数组的一维数组作为第 1 个参数传入，所以需要在 bind 的时候指定第1个参数，null 即可，Math 也行。
//这里是map自动传入apply的
//bind 的第二个及其后边的参数： 当绑定的函数被调用时这些参数加上绑定函数本身的参数会按照顺序作为原函数运行时的参数，所以这个null是必须的


console.log(largestOfFour([[1, 34], [1, 5, 9, 7]])) //[34, 456]

//相当于下边这个
// function largestOfFour(arr) {
//     return arr.map(function() {
//         return Math.max.apply(null, arguments[0]);
//     });
// }
	







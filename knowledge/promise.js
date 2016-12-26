'use strict'

$ready(function() {

	//js 如果遇到一个执行时间很长的东西不能让他阻塞，手动让它异步，
	//比如 f1()耗时很长 ，f2还需要f1的结果，最简单的方法：
	//先改写f1()
	function f1(callback) {
		setTimeout(function() {
			//f1的原任务代码
			callback();
		},0)
	}
	f1(f2);






























});
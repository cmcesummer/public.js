$ready(() => {

	//首先我们应该明确一点：ECMAScript中所有函数的参数都是按值来传递的。
	//但是为什么涉及到原始类型与引用类型的值时仍然有区别呢，还不就是因为内存分配时的差别。 
	//（我对比了一下，这里和复制变量时遵循的机制完全一样的嘛，你可以简单地理解为传递参数的时候，就是把实参复制给形参的过程）
	
	let obj1 = {value:111},
		obj2 = {value:222};

	let fncArgu = obj => {
		obj.value = 333;
		console.log(obj.value);//333
		obj = obj2;
		console.log(obj.value);//222
	}	

	fncArgu(obj1);
	// obj1仍然指向原来的对象,之所以value改变了, *是因为changeStuff里的第一条语句，这个时候obj是指向obj1的 .是按值来传递的
})
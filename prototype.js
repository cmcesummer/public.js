'use strict'

function SuperType(name) {
	this.name = name;
	this.color = [1,2,3];
}
SuperType.prototype.say = function() {
	console.log(this.name);
}

function SubType(name, age) {
	SuperType.call(this, name);

	this.age = age;
}

SubType.prototype = new SuperType();
SubType.prototype.constructor = SubType;
SubType.prototype.sayAge = function() {
	console.log(this.age);
}

//上边的缺点是 进行了两次SuperType类的调用 ：
//第一次是在 给子类原型 new 父类时，
//第二次是在子类构造函数时，call的时候
//不过这个不会共享属性。共享的话一般是没有call直接new，这样子类的原型相当于实例继承了属性，但是作为原型又会共享属性
//上边不会共享的原因是 第二次调用父类的时候：子类的构造函数里就有了属性，而子类构造函数的实例也就继承了构造函数里的属性，
//实例中有的属性就不会向原型链中区搜索了，也就是覆盖了。
//下边的思想是：子类的原型就是想要一个父类原型的复制值，那就复制给你，再增强一下复制给子类原型的constructor,子类构造函数还是有要call 的。

function classProto(child, parent) {
	var fo = Object.create(parent.prototype);
	fo.constructor = child;
	child.prototype = fo;
}

function ChildType(name, isSb) {
	SuperType.call(this, name);

	this.isSb = isSb;
}
classProto(ChildType, SuperType);
ChildType.prototype.saySb = function() {
	console.log(this.isSb);
}

var subType = new SubType('a', '12');
var child = new ChildType('b', 'sb');

subType.say();
subType.sayAge();
child.say();
child.saySb();

//以下es6 class 的继承
//

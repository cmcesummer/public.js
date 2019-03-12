"use strict";

function SuperType(name) {
    this.name = name;
    this.color = [1, 2, 3];
}
SuperType.prototype.say = function() {
    console.log(this.name);
};

function SubType(name, age) {
    SuperType.call(this, name);

    this.age = age;
}

SubType.prototype = new SuperType();
SubType.prototype.constructor = SubType;
SubType.prototype.sayAge = function() {
    console.log(this.age);
};

//上边的缺点是 进行了两次SuperType类的调用 ：
//第一次是在 给子类原型 new 父类时，
//第二次是在子类构造函数时，call的时候
//不过这个不会共享属性。共享的话一般是没有call直接new，这样子类的原型相当于实例继承了属性，但是作为原型又会共享属性
//上边不会共享的原因是 第二次调用父类的时候：子类的构造函数里就有了属性，而子类构造函数的实例也就继承了构造函数里的属性，
//实例中有的属性就不会向原型链中区搜索了，也就是覆盖了。
//下边的思想是：子类的原型就是想要一个父类原型的复制值，那就复制给你，再增强一下复制给子类原型的constructor,子类构造函数还是有要call 的。

function classProto(child, parent) {
    var fo = Object.create(parent.prototype);
    fo.constructor = child; //这里一定要让fo(父类原型的备份)的constructor 指向子类
    child.prototype = fo;
}

function ChildType(name, isSb) {
    SuperType.call(this, name);

    this.isSb = isSb;
}
classProto(ChildType, SuperType);
ChildType.prototype.saySb = function() {
    console.log(this.isSb);
};

var subType = new SubType("a", "12");
var child = new ChildType("b", "sb");

subType.say();
subType.sayAge();
child.say();
child.saySb();

//以下es6 class 的继承
//只是个语法糖
class ParentClass {
    constructor(name) {
        this.name = name;
        this.color = [1, 2, 3];
    }
    sayName() {
        console.log(this.name);
    }
}

class ChildClass extends ParentClass {
    constructor(name, age) {
        super(name); // 这个super() 就相当于 上边的parent.call(this,name) + 原型复制 么
        this.age = age;
    }
    sayAge() {
        console.log(this.age);
    }
}

// 组合寄生式继承

function inherit(Child, Parent) {
    function middle() {}
    middle.prototype = Parent.prototype;
    Child.prototype = new middle();
    Child.prototype.constructor = Child;
}

function Parent(arg) {
    this.arg = arg;
}

Parent.prototype.call = function() {};

function Child(aa, arg) {
    this.aa = aa;
    Parent.call(this, arg);
}
inherit(Child, Parent);
Child.prototype.sss = function() {};

// 三种继承形式
(function() {
    function createT(inhert) {
        function A() {
            this.a = 1;
        }
        A.prototype.ca = function() {};
        function B() {
            A.call(this);
            this.b = 2;
        }
        inhert(A, B);
        B.prototype.ca2 = function() {};
        var b = new B();
        console.log(b);
    }
    function inhert(P, C) {
        function M() {}
        M.prototype = P.prototype;
        C.prototype = new M();
        C.prototype.constructor = C;
    }
    function inhert2(P, C) {
        C.prototype = P.prototype;
        C.prototype.constructor = C;
    }
    function inhert3(P, C) {
        C.prototype = Object.create(P.prototype);
        C.prototype.constructor = C;
    }
    createT(inhert);
    createT(inhert2);
    createT(inhert3);
    const ob = {
        a: 222,
        c: 999
    };
    console.log(Object.create(ob));
})();

// ===============继承对比=======================

(() => {
    function A() {
        this.a = 1;
    }
    A.prototype.chan = function() {
        console.log(this.a);
    };
    function B() {
        A.call(this);
        this.b = 2;
    }
    // 这里可以取消注释后看看 。。
    // B.prototype = A.prototype; // 这样会改变 A的原型链上的东西， 所以不这样做
    B.prototype = Object.create(A.prototype);
    B.prototype.constructor = B;
    B.prototype.cab = function() {
        console.log(this.a, this.b);
    };
    function C() {
        A.call(this);
        this.b = 2;
    }
    C.prototype = new A();
    C.prototype.constructor = C;
    C.prototype.cab = function() {
        console.log(this.a, this.b);
    };
    function D() {
        A.call(this);
        this.b = 2;
    }
    function changeProto(P, C) {
        const M = function() {};
        M.prototype = P.prototype;
        C.prototype = new M();
        C.prototype.constructor = C;
    }
    changeProto(A, D);
    D.prototype.cab = function() {
        console.log(this.a, this.b);
    };
    function E() {
        A.call(this);
        this.b = 2;
    }
    E.prototype = Object.create(A.prototype);
    E.prototype.constructor = E;
    E.prototype.cab = function() {
        console.log(this.a, this.b);
    };
    console.log(new B(), new C(), new D());
    // -----这里说一下 Object.create():
    // Object.create()方法创建一个新对象，
    // 使用现有的对象来提供新创建的对象的__proto__
    // const a = {a: 1}; const b = Object.create(a);
    // b: {}  b.__proto__ = {a:1}
})();

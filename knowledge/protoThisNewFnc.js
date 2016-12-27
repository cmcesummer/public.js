//关于 变量定义提升、this指针指向、运算符优先级、原型、继承、全局变量污染、对象属性及原型属性优先级
// 第1种
function asd() {
    llaa = function() {console.log(1)};		//这里的llaa就是一个变量，因为没有var 这是指向全局window的    这里有this才是属性，没有就不是属性
    return this
}
asd.llaa = function(){console.log(2)};    // 这个是asd上存储的静态属性或者方法 这个才是属性或者方法  相当于在asd函数内的this.llaa
asd.prototype.llaa = function() {console.log(3)};
var llaa = function() {console.log(4)};
function llaa() {console.log(5)};

asd.llaa(); //2
llaa(); //4
asd().llaa(); //1  =>   这里相当于 先 asd(),运行asd之后里边的llaa指向全局返回的window  这一行相当于 ： asd();  window.llaa();
llaa(); //1
new asd.llaa(); //2
new asd().llaa(); // 3   这个指向的是原型链的东西 因为原构造函数里没有this 所以 构造函数中的llaa不参与构造， 想继承的话就不能这么写 这个相当于实例的llaa方法
new new asd().llaa(); //3 	new ((new Foo()).getName)()
//分析  http://www.jb51.net/article/79437.htm
//先看此题的上半部分做了什么，首先定义了一个叫Foo的函数，之后为Foo创建了一个叫getName的静态属性存储了一个匿名函数，
//之后为Foo的原型对象新创建了一个叫getName的匿名函数。之后又通过函数变量表达式创建了一个getName的函数，最后再声明一个叫getName函数。
//第一问的 Foo.getName 自然是访问Foo函数上存储的静态属性，自然是2，没什么可说的
//第二问，直接调用 getName 函数。既然是直接调用那么就是访问当前上文作用域内的叫getName的函数，所以跟1 2 3都没什么关系。一是变量声明提升，二是函数表达式。
//第三问的 Foo().getName(); 先执行了Foo函数，然后调用Foo函数的返回值对象的getName属性函数。
//      Foo函数的第一句  getName = function () { alert (1); };  是一句函数赋值语句，注意它没有var声明，所以先向当前Foo函数作用域内寻找getName变量，没有。
//		再向当前函数作用域上层，即外层作用域内寻找是否含有getName变量，找到了，也就是第二问中的alert(4)函数，将此变量的值赋值为 function(){alert(1)}。
//		此处实际上是将外层作用域内的getName函数修改了。
//		注意：此处若依然没有找到会一直向上查找到window对象，若window对象中也没有getName属性，就在window对象中创建一个getName变量。
//		之后Foo函数的返回值是this，而JS的this问题博客园中已经有非常多的文章介绍，这里不再多说。
//		简单的讲，this的指向是由所在函数的调用方式决定的。而此处的直接调用方式，this指向window对象。
//		遂Foo函数返回的是window对象，相当于执行 window.getName() ，而window中的getName已经被修改为alert(1)，所以最终会输出1
//		此处考察了两个知识点，一个是变量作用域问题，一个是this指向问题。
//第四问 直接调用getName函数，相当于 window.getName() ，因为这个变量已经被Foo函数执行时修改了，遂结果与第三问相同，为1
//第六问  在js中构造函数可以有返回值也可以没有
//		没有返回值则按照其他语言一样返回实例化对象 ;   若有返回值则检查其返回值是否为引用类型,则与无返回值相同，实际返回其实例化对象。
//		若返回值是引用类型，则实际返回值为这个引用类型。原题中，返回的是this，而this在构造函数中本来就代表当前实例化对象，遂最终Foo函数返回实例化对象。
//		之后调用实例化对象的getName函数，因为在Foo构造函数中没有为实例化对象添加任何属性，遂到当前对象的原型对象（prototype）中寻找getName，找到了。
//第七问, new new Foo().getName(); 同样是运算符优先级问题。最终实际执行为：new ((new Foo()).getName)();先初始化Foo的实例化对象,
//		然后将其原型上的getName函数作为构造函数再次new。

//这里单独Css.age是不会实例化的 同样不会继承   所以上边第6问才会是3不是2
// function Css(name) {
// 	this.name = name
// }
// Css.age = 12;
// Css.prototype.sayAge = function() {
// 	console.log(this.age)
// }
// function Ass(name){
// 	Css.call(this, name);
// 	this.color = 'red'
// }

// var css = new Ass('ming');
// console.log(css.age); //undefined

//第2种
// function asd() {
//     var llaa = function() {console.log(1)};		
//     return this
// }
// asd.llaa = function(){console.log(2)};   //这个东西是不会被实例化的吗
// asd.prototype.llaa = function() {console.log(3)};
// var llaa = function() {console.log(4)};
// function llaa() {console.log(5)};

// asd.llaa(); //
// llaa();  //
// asd().llaa(); //  window.llaa() 
// llaa(); // 
// new asd.llaa(); // 
// new asd().llaa(); // 实例的llaa()  
// new new asd().llaa(); // 



//第3种
// function Wqq() {
// 	this.age = 1
// }
// console.log(Wqq.age)
// function asd() {
//     this.llaa = function() {console.log(1)};		
//     return this
// }
// asd.llaa = function(){console.log(2)};
// asd.prototype.llaa = function() {console.log(3)};
// var llaa = function() {console.log(4)};
// function llaa() {console.log(5)};

// asd.llaa(); //
// llaa(); //
// asd().llaa(); //  
// llaa(); //
// new asd.llaa(); // 
// new asd().llaa(); // 
// new new asd().llaa(); // 
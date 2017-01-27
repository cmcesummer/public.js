
var we = document.getElementById('we');

//offsetHeight/offsetWidth: 表述元素的外尺寸：元素内容+内边距+边框(不包括外边距)

//offsetLeft/offsetTop: 表示该元素的左上角（边框外边缘）与已定位的父容器（offsetParent对象）左上角的距离。

//offsetParent元素是指元素最近的定位（relative,absolute）祖先元素,可递归上溯

//scrollHeight/scrollWidth: 元素内容的总高度或宽度

//scrollLeft/scrollTop：是指元素滚动条位置，它们是可写的(被隐藏的内容区域左侧/上方的像素)

//document.documentElement属性引用了作为文档根元素的html标记，document.body属性引用了body标记 
console.log(document.documentElement.scrollWidth)//返回整个文档的宽度
document.documentElement.offsetWidth//返回整个文档的可见宽度
document.documentElement.clientwidth//返回整个文档的可见宽度（不包含边框），clientwidth = offsetWidth - borderWidth，不包括滚动条区域

console.log(document.body.scrollWidth) //返回body的宽度  基于webkit的浏览器（chrome和safari）返回的是整个文档的宽度，
//opera和FF返回的就是标准的body 的scrollWidth，个人觉得opera和FF算是比较合理的。

document.body.clientHeight  //<body>元素的宽度和高度（注意，包括了不可见的区域）
document.body.clientWidth


window.pageXOffset
window.pageYOffset  //当前页面相对于窗口显示区左上角的 X /Y位置，即水平/垂直滚动条已滚动的距离

//window有个属性innerWidth/innerHeight包含的是整个文档的可视区域尺寸,包括滚动条区域
console.log(we.offsetParent.tagName.toLowerCase() == 'body')



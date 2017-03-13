//关于h5
//语义化 header footer nav section artical video audio
//http://blog.csdn.net/charlene0824/article/details/52165429#storage
//
//关于存储  sessionStorage.key(i);  可以获得sessionStorage的key值，再去获取value值
//sessionStorage。removeItem（‘asd’）移除  localStorage 也一样
//
//
//文件 file
//accept="image/*"   multiple
//<input id='a' type='file' accept='' multiple>
//var fa = document.querySelector('#a').files是个数组;
//fa[0].size  .name  .type
//
//
//FormData
//var formdata = new FormData(document.getElementById('formid'));
//可以异步上传2进制文件
//
//
//web worker     var wo = new Worker('mywork.js')    
//https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API/Using_web_workers
//
//
//history .go(1)前进
//
//
//touch事件
//el.addEventListener("touchstart", handleStart, false); 当一个 touchstart 事件被触发,  handleStart()函数会被调用
//el.addEventListener("touchend", handleEnd, false);
//el.addEventListener("touchmove", handleMove, false);      event.touches[0].pageX
//
//
//geolocation in navigator     
//navigator.geolocation.getCrrentPosition(success,err)
//
//
//c3 new
//animation: name time 
//@keyframes
//
//transition : width(属性名) 1s(时间) 
/*

border-radius	box-shadow

background-image
background-size: (width,height)
background-attachment:fixed

background: linear-gradient(to right, red , blue) 渐变
linear-gradient  线性
radial-gradient  径向

text-shadow

@font-face

transform: rotate(30deg) scale(width,height) translate(right,bottom)

transform:rotateX(180deg) 3D转换

transtion:过度 width(属性名) 1s(时间) ，width(属性名) 1s(时间) ;

animation: myfirst 5s;
@keyframes myfirst
{
	0%   {background: red;}
    25%  {background: yellow;}
    50%  {background: blue;}
    100% {background: green;}
}

box-sizing:border-box 包括border padding   content-box

img{max-width:100%} 图片宽度自适应
 */

//选择器
//p:nth-of-type(2) 选择属于其父元素第二个 <p> 元素
//p:last-of-type  选择属于其父元素的最后 <p> 元素
//

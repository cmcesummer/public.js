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
//animation @keyframes
//
//transition : width(属性名) 1s(时间) 


var imgLog = function (url) {  
    var data = window['imgLogData'] || (window['imgLogData'] = {});  
    var img = new Image();  
    var uid = unique();  
    img.onload = img.onerror = function () {//销毁一些对象  
        img.onload = img.onerror = null;  
        img = null;  
        delete data[uid];  
    }  
    img.src = url + '&_uid=' + uid;  
};  

//可以用来发送用户页面操作统计  百度统计那样  返回小图标不用管
//创建一个Image对象：var a=new Image();    定义Image对象的src: a.src=”xxx.gif”;    这样做就相当于给浏览器缓存了一张图片。
//需要注意的是：src 属性一定要写到 onload 的后面，否则程序在 IE 中会出错。
var img=new Image();  
img.onload=function(){alert("img is loaded")};  
img.onerror=function(){alert("error!")};  
img.src="http://www.abaonet.com/img.gif";  
function show(){alert("body is loaded");};  
window.onload=show;  		

 //运行上面的代码后，在不同的浏览器中进行测试，发现 IE 和 FF 是有区别的，在 FF 中，img 对象的加载包含在 body 

//的加载过程中，既是 img加载完之后，body 才算是加载完毕，触发 window.onload 事件。

 //     在 IE 中，img 对象的加载是不包含在 body 的加载过程之中的，body 加载完毕，window.onload 事件触发时，img
//
///对象可能还未加载结束，img.onload事件会在 window.onload 之后触发。

 //     根据上面的问题，考虑到浏览器的兼容性和网页的加载时间，尽量不要在 Image 对象里放置过多的图片，否则在 FF 下

//会影响网页的下载速度。当然如果你在 window.onload 之后，执行预加载函数，就不会有 FF 中的问题了。
//
 /////     可以通过Image对象的complete 属性来检测图像是否加载完成（每个Image对象都有一个complete属性，当图像处于

//装载过程中时，该属性值false,当发生了onload、onerror、onabort中任何一个事件后，则表示图像装载过程结束（不管成

//没成功），此时complete属性为true）
//
var img = new Image();    
img.src = oImg[0].src = this.src.replace(/small/,"big");    
oDiv.style.display = "block";    
img.complete ? oDiv.style.display = "none" : (oImg[0].onload = function() {oDiv.style.display = "none"})    



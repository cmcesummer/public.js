//nativeJs 和 jQuery 操作 Dom

//1.创建元素节点
	//nativeJs
document.createElement('p'); 

	//jQuery
$('<p></p>');

//2.创建并添加文本
	//nativeJs
 var text = document.createTextNode('Hello');
 vaar $p = document.createElement('p');
 $p.appendChild(text);

	//jQuery
 var $p = $('<p>Hello</p>');

 //3.复制节点
 	//nativeJs
 var newNode = $p.cloneNode(true) ;
 		//true :克隆整个 <p>Hello</p>
 		//fale :只克隆 <p></p>
 		
 	//jQuery	
 var $newN = $('#asd').clone(true);
 
//4.插入节点
	//nativeJs
el.appendChild(childNode);//z这个是添加到子节点的最后去
el.insertBefore(newNode, oldNode) // 这个是添加到子节点的oldNode节点之前

	//jQuery
$("#el").append('<p>hello</p>');//添加到el的子节点的最后去
$('#el').prepend('<p>hello</p>');//添加到el的子节点的开头去
$('#el').after('<p>hello</p>');//添加到el的后边
$('#el').before('<p>hellp</p>');// 添加到el的前边

 //5.删除节点
 	//nativeJs
 el.parentNode.removeChild(el);//remove node el

 	//jQuery
 $('#el').remove();

 //6.节点替换
 	//nativeJs
El.repalceChild(newNode, oldNode);//oldNode必须是一个真实存在的子节点

	//jQuery
$('#el').replaceWith(newHtml);

//7.设置属性，获取属性
	//nativeJs
el.setAttribute('data-title','native');   //特性
el.getAttribute('data-title');
el.removeAttribute('data-title');
el.hasAttribute('data-title'); // IE8+才有方法，用于判断元素是否拥有该特性
checkboxEl.checked = true;	//属性
checkboxEl.checked;
delete el('checked'); //删除特性
//点方式操作才是与UI状态关联的属性, 就是想在页面上看到checkbox被选中就要用点的方式
//点方式操作之后，再用attr获取或者操作就不准确了，所以点方式操作才是与UI状态关联的属性.

	//jQuery
$("#logo").attr({"title": "logo"});
$("#logo").attr("title");
$("#checkbox").prop({"checked": true});
$("#checkbox").prop("checked");



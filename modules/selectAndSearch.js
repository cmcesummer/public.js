
//.second select {  
//     width: 167px;  
//     height: 106px;  
//     outline: none;  
// }  
// .second input {  
//     width: 167px;   
//     outline: none;   
//     position: absolute;  
//     line-height: 34px;   
//     height: 34px;   
// } 
// <input type="text" id="makeupCo" placeholder="请选择或输入"/>  
// <select id="typenum" size="10" style="display:none;">  
//     <option value="">1</option>  
//     <option value="">2</option>  
//     <option value="">12323</option>  
//     <option value="">31</option>  
//     <option value="">1332</option>  
//     <option value="">412</option>  
//     <option value="">42</option>  
//     <option value="">11</option>  
// </select>  

// 依赖jQ


$(function(){  
    var TempArr=[],
    	$typenum = $('#typenum'),
    	$makeupCo = $('#makeupCo');
    $("#typenum option").each(function(index, el) {  
        TempArr[index] = $(this).text();  
    });  
 	$(document).on('click', function(e) {
 		var e = e || window.event;  
        var elem = e.target || e.srcElement;    
        if(elem.parentNode.id != 'typenum' && elem.id != 'makeupCo') {
        	$typenum.hide();  
        }
 	})    

 	$typenum.on('change', function() {
 		var $this = $(this),
 			thisText = $this.find('option:selected').text();
 		$this.prev().val(thisText);
 		$typenum.hide(); 
 	})

 	$makeupCo.on('focus', function() {
 		$typenum.show();
 	}).on('input', function() {
 		console.log(2)
 		var val = $(this).val().trim(),
 			i = 0,
 			option = '';
 		$typenum.html("");  
 		for(; i < TempArr.length; i++) {
 			if(~TempArr[i].indexOf(val)) {
 				option += '<option>'+ TempArr[i] +'</option>';
 			}
 		}
 		$typenum.html(option); 
 	})
})

//下拉 可填可选 模糊搜索



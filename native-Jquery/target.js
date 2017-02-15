//e.target 是触发的元素  e.currentTarget是绑定的元素跟 this 一样

doucment.addEventListener('DOMContentLoaded',function(){
    var html = `<ul id="ulT">
                <li class="item1">fsda</li>
                <li class="item2">ewre</li>
                <li class="item3">qewe</li>
                <li class="item4">xvc</li>
                <li class="item5">134</li>
            </ul>`,
        div = document.createElement('div');
    div.appendChild(html);
    doucment.getElementsByTagName('html')[0].appendChild(div);
    document.getElementById("ulT").onclick = function  (event) {
        console.log(event.target);
        console.log(event.currentTarget);
    }
},false);

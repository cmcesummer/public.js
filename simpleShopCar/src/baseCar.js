export default class Car {
    constructor({ data, parent }) {
        // console.log(data);
        this.data = data;
        this.parent = parent || document.body;
        this.beforeCreate && this.beforeCreate();
        this.parent.appendChild(this.createDOM());
        this.__computer = 0;
        this.__choose = {};
        this.__bottom.innerHTML = this.__computer.toFixed(2);
        this.addEvent();
        this.controlAll();
    }

    createDOM() {
        const LIST = this.data || [];
        let htmlStr = "";
        const carBox = document.createElement("div");
        carBox.className = "car-box";
        this.__carBox = carBox;
        LIST.forEach(item => {
            htmlStr += `
                <div class="item-list" style="transition: all .3s" data-id="${item.id}">  
                    <input type="checkbox" class="item-input" data-msg="${item.id},${item.money},${item.num}" />
                    <div>${item.name}</div>
                    <div>${item.describe}</div>
                    <div>${item.money}</div>
                    <div class="add-btn">+</div>
                    <div>${item.num}</div>
                    <div class="reduce-btn">-</div>
                    <div class="delete" data-id="${item.id}">delete</div>
                </div> 
            `;
        });
        const bottom = document.createElement("div");
        bottom.className = "bottom";
        const checkAll = document.createElement("input");
        checkAll.type = "checkbox";
        this.__checkAll = checkAll;
        this.__bottom = bottom;
        carBox.innerHTML = htmlStr;
        carBox.appendChild(checkAll);
        carBox.appendChild(bottom);
        return carBox;
    }

    computer() {
        let num = 0;
        for (let key in this.__choose) {
            const item = this.__choose[key];
            num += Number(item.money) * Number(item.num);
        }
        this.__bottom.innerHTML = num.toFixed(2);
    }

    addEvent() {
        const context = this;
        function __addOrReduce(target, type) {
            const parent = target.parentNode;
            const check = parent.children[0];
            
            if (!check.checked) return
            const id = parent.getAttribute('data-id');
            let showNum, numL;
            if(type) {
                showNum = target.nextElementSibling;
                numL = ++context.__choose[id].num;
            } else {
                showNum = target.previousElementSibling;
                numL = --context.__choose[id].num;
            }
            if(numL <= 0) {
                return
            }
            const msgArr = check.getAttribute("data-msg").split(",");
            showNum.innerHTML = msgArr[2] = numL;
            check.setAttribute('data-msg', msgArr.join(','))
            context.computer();
        }
        this.__carBox.addEventListener(
            "click",
            function(e) {
                const target = e.target;
                if (~target.className.indexOf("item-input")) {
                    const msgArr = target.getAttribute("data-msg").split(",");
                    if (target.checked) {
                        context.__choose[msgArr[0]] = {money: Number(msgArr[1]), num: Number(msgArr[2])};
                        context.computer();
                    } else {
                        delete context.__choose[msgArr[0]];
                        context.computer();
                    }
                    context.checkCheckAll();
                } else if (~target.className.indexOf('add-btn')) {
                    __addOrReduce(target, 1)
                } else if (~target.className.indexOf('reduce-btn')) {
                    __addOrReduce(target, 0)
                } else if (~target.className.indexOf("delete")) {
                    const parent = target.parentNode;
                    const id = target.getAttribute("data-id");
                    console.log("delete id is", id);
                    parent.parentNode.removeChild(parent);
                    delete context.__choose[id];
                    context.computer();
                    context.showDelete = null;
                }
            },
            false
        );
        let startPoint = 0;
        this.__carBox.addEventListener(
            "touchstart",
            function(e) {
                const target = e.target;
                if (~target.className.indexOf("item-list")) {
                    startPoint = e.changedTouches[0].clientX;
                }
            },
            false
        );
        this.__carBox.addEventListener(
            "touchend",
            function(e) {
                const target = e.target;
                if (~target.className.indexOf("item-list")) {
                    const endPoint = e.changedTouches[0].clientX;
                    const value = endPoint - startPoint;
                    if (value < -20) {
                        context.doAction(target, 1);
                        context.showDelete = target;
                    } else if (value > 20) {
                        context.doAction(target, 0);
                        context.showDelete = null;
                    }
                    startPoint = 0;
                }
            },
            false
        );
        document.addEventListener(
            "touchstart",
            function(e) {
                if (context.showDelete) {
                    if (
                        e.target != context.showDelete &&
                        e.target.parentNode != context.showDelete
                    ) {
                        context.doAction(context.showDelete, 0);
                        context.showDelete = null;
                    }
                }
            },
            false
        );
        this.__bottom.addEventListener("click", function() {
            console.log("choose array is :", Object.keys(context.__choose));
        });
    }

    doAction(target, type) {
        if (type) {
            target.style.transform = "translateX(-60px)";
        } else {
            target.style.transform = "translateX(0px)";
        }
    }

    checkCheckAll() {
        let allChecked = true;
        const checkbox = this.__carBox.querySelectorAll(".item-input");
        for (let item of checkbox) {
            if (!item.checked) {
                allChecked = false;
                break;
            }
        }
        this.__checkAll.checked = allChecked;
    }

    controlAll() {
        const context = this;
        this.__checkAll.addEventListener("click", function(e) {
            const checkbox = context.__carBox.querySelectorAll(".item-input");
            const target = e.target;
            if (target.checked) {
                checkbox.forEach(item => {
                    const msgArr = item.getAttribute("data-msg").split(",");
                    context.__choose[msgArr[0]] = {money: msgArr[1], num: msgArr[2]};
                    item.checked = true;
                });
            } else {
                checkbox.forEach(item => {
                    // const msgArr = item.getAttribute("data-msg").split(",");
                    // delete context.__choose[msgArr[0]];
                    item.checked = false;
                });
                context.__choose = {};
            }
            context.computer();
        });
    }
}

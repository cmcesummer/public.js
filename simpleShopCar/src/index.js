import BaseCar from "./baseCar";

class Car extends BaseCar {
    constructor(opt) {
        super(opt);
    }
}

new Car({
    data: [
        { name: "商品1", money: "12", describe: "miaoshu", num: '1', id: "01" },
        { name: "商品2", money: "12", describe: "describe", num:'2',id: "02" }
    ],
    parent: document.getElementById("app")
});

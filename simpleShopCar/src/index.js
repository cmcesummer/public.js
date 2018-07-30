import BaseCar from "./baseCar";

class Car extends BaseCar {
    constructor(opt) {
        super(opt);
    }
}

new Car({
    data: [
        { name: "aaa", money: "12", describe: "das2", id: "01" },
        { name: "aaa", money: "12", describe: "das2", id: "02" }
    ],
    parent: document.getElementById("app")
});

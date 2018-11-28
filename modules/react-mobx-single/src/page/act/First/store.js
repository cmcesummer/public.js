import { observable, action } from "mobx";
import BaseStore from "../../../lib/core/app/createStore";
import $ from "jquery";

// class DetailStore {
//     @observable pageName;
//     @observable pageComp;

//     constructor() {
//         this.pageName = [];
//         this.pageComp = {};
//     }

//     @action addPageName = obj => {
//         this.pageName.push(obj);
//     };

//     @action addPageComp = obj => {
//         this.pageComp[obj.name] = obj.comp;
//     };
// }

export default class A extends BaseStore {
    name = "First";

    data = () => ({
        a: 1,
        ajax: "before"
    });

    action = () => ({
        change(store) {
            console.log(this);
            this.a = store;
        },
        ajaxFn() {
            $.ajax({
                url: `First.js?ver=${window.LIB_Version}`,
                dataType: "script",
                cache: true
            }).done(
                action("fetchSuccess", res => {
                    this.ajax = res;
                })
            );
        }
    });
}

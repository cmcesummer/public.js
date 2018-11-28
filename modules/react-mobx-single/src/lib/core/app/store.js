import { observable, action } from "mobx";

class DetailStore {
    @observable pageName;
    @observable pageComp;

    constructor() {
        this.pageName = [];
        this.pageComp = {};
    }

    @action addPageName = obj => {
        this.pageName.push(obj);
    };

    @action addPageComp = obj => {
        this.pageComp[obj.name] = obj.comp;
    };
}

export default {
    detailStore: new DetailStore()
};

import { observable, action } from "mobx";

export default class BaseStore {
    name = "";

    data = () => ({});

    action() {
        return {};
    }

    computed = () => ({});

    run = () => {
        const observables = this.data();
        console.log(this.action);
        const actions = this.action.call({ data: observables });
        const defaultMap = {};
        Object.keys(actions).forEach(key => {
            defaultMap[key] = action;
        });
        return observable(
            {
                ...observables,
                ...actions
            },
            defaultMap
        );
    };
}

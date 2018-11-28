import store from "./store";
import { observer, inject } from "mobx-react";

export default function(storeItem) {
    return comp => {
        // store = { ...store, ...storeItem };
        const sub = new storeItem();
        store[sub.name] = sub.run();
        return inject("store")(observer(comp));
    };
}

import store from "./store";

const { detailStore } = store;

export default function action(name) {
    return comp => {
        detailStore.addPageComp({
            comp,
            name
        });
    };
}

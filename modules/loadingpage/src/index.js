export { change_default_loading, after_load_fn, debug } from "./util";
export { version } from "../package.json";
import Loading from "./loading";

export function preload(obj) {
    return new Loading(obj).init();
}

export function auto(obj) {
    const { before_load_callback, page_all_callback } = obj;
    const local_key = "ajax_over_" + (Math.random() * 100).toFixed();
    let handler = new Loading({
        ...obj,
        before_load_callback() {
            before_load_callback();
            let ajax_num = 0;
            handler.on(local_key, function() {
                if (ajax_num !== 2) {
                    return;
                }
                page_all_callback();
                handler.off(local_key);
            });
        },
        page_all_callback() {
            setTimeout(function() {
                handler.fire(local_key, "load");
            }, 300);
        }
    }).init();

    return function fire() {
        handler.fire(local_key, "load");
    };
}

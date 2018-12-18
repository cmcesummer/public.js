export { change_default_loading, after_load_fn, debug, change_load_fn } from "./util";
export { version } from "../package.json";
import { debug_flag } from "./util";
import Loading from "./loading";

export function preload(obj) {
    return new Loading(obj).init();
}

export function auto(obj = {}) {
    const { before_load_callback = () => {}, page_all_callback = () => {} } = obj;
    const local_key = "ajax_over_" + (Math.random() * 100).toFixed();
    const local_key_ready = `${local_key}_ready`;
    let start_time = new Date().valueOf();
    let handler_ready = false,
        handler = new Loading({
            ...obj,
            all_image_container: document,
            before_load_callback() {
                before_load_callback();
                let ajax_num = 0,
                    finishCb;
                handler.on(local_key, function(obj) {
                    ajax_num++;
                    const { name, cb } = obj;
                    if (typeof cb == "function") {
                        finishCb = cb;
                    }
                    if (debug_flag) {
                        console.log(`handler: ${name}`);
                    }
                    if (ajax_num !== 2) {
                        return;
                    }
                    if (debug_flag) {
                        console.log(`open loading use time: ${new Date().valueOf() - start_time}ms`);
                    }
                    finishCb && finishCb();
                    page_all_callback();
                    handler.off(local_key);
                    handler.off(local_key_ready);
                });
                handler_ready = true;
                if (handler.has(local_key_ready)) {
                    handler.fire(local_key_ready);
                }
            },
            page_all_callback(finishCb) {
                setTimeout(function() {
                    handler.fire(local_key, { name: "img over", cb: finishCb });
                }, 200);
            },
            max_timer_cb() {
                page_all_callback();
                handler.off(local_key);
                handler.off(local_key_ready);
            }
        }).init(),
        fire = () => handler.fire(local_key, { name: "other over" });

    return function() {
        if (handler_ready) {
            return fire();
        }
        handler.on(local_key_ready, function() {
            fire();
        });
    };
}

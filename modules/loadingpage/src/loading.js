import Handler from "./handler";
// import default_config from "./interface";
import { after_load_fn, getComputedStyle, domReady, append_loading_to_dom, preventDefault, debug_flag } from "./util";

let _loading_page_number = 0;

const _loading_handler = new Handler();
const space_fn = () => {};
const default_config = {
    // 缓存天数
    day: 0,
    // 页面name  设置缓存天数时用
    name: "",
    // 是否使用 js 添加 dom ( 或者是自己写dom, 控制它 )  （ 是否使用这种js添加dom的方式 ）
    no_use_string_html: false,
    // 最大loading时间， 只有 no_use_string_html 为 false 才有用
    max_timer: 10000,
    // 最大loading时间后的callback， 只有 no_use_string_html 为 false 才有用
    max_timer_cb: space_fn,
    // loading 元素上用到的 loading 图
    loading_arr: [],
    // 首屏需要加载的图片数组
    page_arr: [],
    // 需要预加载的图片的包含元素  设置这个后就不需要设置 page_arr，
    // 而是会 读取 all_image_container 内的所有元素的背景图和image
    all_image_container: false,
    // 非首屏加载数组
    after_load_arr: [],
    // 在 所有 load 开始之前 可以拿到 dom
    before_load_callback: space_fn,
    // loading_arr 数组中的图片 load 完一张图片调用一次
    loading_single_callback: space_fn,
    // loading_arr load 完的回调
    loading_all_callback: space_fn,
    // page_arr 数组中的图片 load 完一张图片调用一次
    page_single_callback: space_fn,
    // page_arr load 完的回调  此时就可以展示业务页面了
    page_all_callback: space_fn,
    // 没有图片loading时的回调 设置缓存天数时用
    no_loading_callback: space_fn
};

export default class Loading {
    constructor(obj) {
        this.load_num = 0;
        this.page_num = 0;
        this.config = Object.assign(default_config, obj);
        _loading_page_number++;
        this._loading_page_number = _loading_page_number;
    }

    loading_load(html_dom) {
        const { loading_arr, before_load_callback, loading_all_callback, loading_single_callback } = this.config;
        const { _use_js_append_dom_map } = this;
        if (_use_js_append_dom_map) {
            const { loadingPage } = _use_js_append_dom_map;
            loadingPage.addEventListener("touchmove", preventDefault, false);
        }
        before_load_callback(html_dom);
        if (loading_arr.length === 0) {
            loading_all_callback("", 0, 0);
            this.page_load();
            return;
        }
        loading_arr.forEach((item, index) => {
            let image = new Image();
            image.onload = image.onerror = e => {
                e.stopPropagation();
                this.load_num++;
                loading_single_callback(item, index, this.load_num);
                if (this.load_num === loading_arr.length) {
                    loading_all_callback(item, index, this.load_num);
                    this.page_load();
                }
            };
            image.src = item;
        });
    }

    over_cb = () => {
        const { _use_js_append_dom_map, _timer } = this;
        if (_use_js_append_dom_map) {
            const { loadingPage, documentElement, getColorStyle, defaultColor, div } = _use_js_append_dom_map;
            loadingPage.removeEventListener("touchmove", preventDefault, false);
            if (getColorStyle && defaultColor) {
                documentElement.style.backgroundColor = defaultColor;
            }
            documentElement.removeChild(div);
            if (_timer) {
                clearTimeout(_timer);
            }
        }
    };

    page_load() {
        const { page_arr, page_all_callback, page_single_callback, after_load_arr } = this.config;
        const { over_cb } = this;
        if (page_arr.length === 0) {
            page_all_callback(over_cb);
            after_load_arr.length !== 0 && this.after_load_fn();
            return;
        }
        page_arr.forEach((item, index) => {
            var image = new Image(),
                loading_time;
            image.onload = image.onerror = e => {
                e.stopPropagation();
                this.page_num++;
                page_single_callback(item, index, this.page_num);
                if (debug_flag) console.log("page_load", item, index, this.page_num);
                if (this.page_num === page_arr.length) {
                    loading_time = new Date() - this.now_time;
                    if (debug_flag) console.log(`loading images use ${loading_time}ms`);
                    page_all_callback(over_cb);
                    after_load_arr.length !== 0 && this.after_load_fn();
                }
            };
            image.src = item;
        });
    }

    after_load_fn() {
        const { after_load_arr } = this.config;
        after_load_fn(after_load_arr);
    }

    init(loading_dom) {
        let space_time,
            use_cache = true;

        const { day, name, all_image_container, page_arr, no_use_string_html, max_timer, max_timer_cb } = this.config;
        const storage_time = window.localStorage ? window.localStorage.getItem(name) : "";
        const day_time = 86400000 * day;
        const now_time = new Date().getTime();
        this.now_time = now_time;

        if (!no_use_string_html) {
            // 添加 dom
            const { documentElement, div } = append_loading_to_dom(this._loading_page_number);
            let defaultColor = "",
                getColorStyle = true,
                loadingPage = div.children[0];
            try {
                defaultColor = window.getComputedStyle(documentElement).getPropertyValue("background-color");
                documentElement.style.backgroundColor = "#f1f9fd";
            } catch (e) {
                getColorStyle = false;
            }
            this._use_js_append_dom_map = {
                defaultColor,
                getColorStyle,
                loadingPage,
                documentElement,
                div
            };
            this._timer = setTimeout(() => {
                this.over_cb();
                max_timer_cb();
            }, max_timer || 10000);
        }

        // dom完成后开始加载图片
        domReady(() => {
            // 重写 page_arr
            if (all_image_container) {
                this.config.page_arr = page_arr.concat(getComputedStyle(all_image_container));
            }

            if (!day) {
                this.loading_load(loading_dom);
                return;
            }
            window.localStorage && window.localStorage.setItem(name, now_time);
            if (!storage_time) {
                this.loading_load(loading_dom);
                return;
            }
            space_time = now_time - storage_time;
            if (space_time > day_time) {
                this.loading_load(loading_dom);
                return;
            }
            //只能判断 from memory cache  不能判断 disk cache
            this.config.page_arr.every((item, index) => {
                let img = new Image();
                img.src = item;
                if (!img.complete) {
                    use_cache = false;
                    return false;
                }
                return true;
            });
            if (!use_cache) {
                this.loading_load(loading_dom);
                return;
            }

            this.after_load_fn();
            this.no_loading_callback();
        });

        return _loading_handler;
    }
}

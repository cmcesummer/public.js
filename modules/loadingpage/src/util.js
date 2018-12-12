let get_html = num => `
    <div class="_loading_loadingPage" style="position: fixed; top: 0px; left: 0px; right: 0px; bottom: 0px; z-index: 60;background: #f1f9fd" >
        <div class="_loading_progress_box" style="display: none;">
            <div class="_loading_progress"><div class="_loading_bar_${num}" style="width: 100%;"></div></div>
            <div style="display: none;"></div>
        </div>
        <div class="_loading_spinner">
            <div class="_loading_inner_loading_circle"></div>
            <div style="color: rgb(0, 156, 255); padding-top: 12px; font-size: 14px;">加载中...</div>
        </div>
    </div>
    `;

let get_default_css = num => `
    ._loading_spinner {
        width: 90px;
        height: 90px;
        text-align: center;
        margin: 100px auto;
        background-size: 53px 37px;
        background-position: center;
        background-repeat: no-repeat;
    }
    ._loading_bar_${num} {}
    ._loading_inner_loading_circle {
        width: 90px;
        height: 90px;
        background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALQAAAC0CAMAAAAKE/YAAAADAFBMVEX///8AAAD8//5U//3v///////G//7+///e///l//7T///6//D///8I//0C//wA//yA//6n//4C//26//5u//0+//0B//1b//0M//1E3buw//79//////8s//xl//2J//4w//33/uEF//2E6HxE//1I//12//2R//6e//77///6///8///6//80//2X//4C//w4//1R//xV//3z/L/5//8H//3///8F//1M//0L//3///9V4Krq/NzN9Xv4/Zb1/GD1/H7G9bD9//////+686ni+Z7///9h4qX9/BJH+u6P6pb2/Ev1/G7s+hap7muB6Jb+/CGr75Kx8J7a945H//3V98MY//3//ANV8O2G6Iee7YnG9G/D85DY+K6K6np45pb3/aky//0E//yq71hA59tW+O2d7G3l+CfL9EHd9zK28Fz2+x/n+DD0/EGZ7J3i+FxS//3R9TFP4rhZ4axn+e6m7mLT9TW88U1t5J5t5aSR6oLQ9Uvo+TWk7npj8s/4/DTa936O//7i+SF7+fBC5Mt15pB7544w/vh09tVs//1C//2C9fWV+fRA6OVL37iO6nv0+xZP7dHA8lQ6/PK/8mHj+UOA66m28XTS9l2h7qSA//7///9u8vW18E3K9EhO+utq6rPX91Cu8IJo45lO9d+x/PPD9UBY8M+f9Mmz+uDY+dW5/L7D/Nyn+pb//ADg9x9o5Je58UY83MNi453t+hIz28y/8kGp7lbc9yRc4aTL9DRJ3rbP9DDX9ihA3b/T9Szq+RWv71BO37F55oZ/54Ah4O0328go4/Im2tqz8UzE8zz6/AUq2dVS4K115oqX7Gik7Vvk+Bsv29Af3Oac7GPx+g6U62tu5JGg7V/0+wsw5fXH9Djm+Rny/f8i2+Bx5Y7r/f+v9f+H6HiK6XX4/v/U+f8s2dNY4aeN6XKQ6m/c+v/k+/+l8/+c8v+S8f7A9/+49f9A6Pk45/dL6vrN+P+J7/9/7/5m7f3G9/9Y6/x07v7h/u/W/d63+6SJ9HW1+40HbafpAAAArnRSTlNAAEEDQzxMNEZFSUQmEQgKZlYNUHCUBnsX/lMQBqp1YaNIG/6OimpeWRYIOR6eXC+ZhIBSKCQsH4cqCv5Nil9/bGsiGXVmMOzX07GQdvbN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");
        background-size: 100% 100%;
        -webkit-animation: _loading_rotateplane 1.2s infinite linear;
        animation: _loading_rotateplane 1.2s infinite linear;
    }
    @-webkit-keyframes _loading_rotateplane {
        0% {
            -webkit-transform: rotate(0deg);
        }
    
        100% {
            -webkit-transform: rotate(360deg);
        }
    }
    @keyframes _loading_rotateplane {
        0% {
            transform: rotate(0deg);
            -webkit-transform: rotate(0deg);
        }
    
        100% {
            transform: rotate(360deg);
            -webkit-transform: rotate(360deg);
        }
    }
    `;

export function change_default_loading(type, fn) {
    if (typeof fn != "function") {
        console.warn("you need a function in second argument");
        return false;
    }
    if (type === "html") {
        get_html = fn;
    } else if (type === "css") {
        get_default_css = fn;
    }
    return true;
}

export const get_html_fn = get_html;
export const get_default_css_fn = get_default_css;

export function domReady(fn) {
    document.addEventListener(
        "DOMContentLoaded",
        function addEvent() {
            document.removeEventListener("DOMContentLoaded", addEvent, false);
            fn();
        },
        false
    );
}

export function preventDefault(e) {
    e.preventDefault();
}

export function getComputedStyle(container) {
    const res_arr = [],
        src_check_reg = /url\(\s*?['"]?\s*?(\S+?)\s*?["']?\s*?\)/i,
        dom_arr = [...container.querySelectorAll("*")],
        img_arr = [...container.getElementsByTagName("img")];
    img_arr.forEach(item => res_arr.push(item.src));
    dom_arr.forEach(function(item) {
        let style = window.getComputedStyle(item, null),
            bg = "",
            bg_match;
        if (style) {
            bg = style.getPropertyValue("background-image");
            bg_match = bg.match(src_check_reg);
            if (bg_match && bg_match[1]) {
                res_arr.push(bg_match[1]);
            }
        }
    });
    return res_arr;
}

export function _toggle_img_src(sou, type) {
    let page_arr = [],
        img_arr = document.querySelectorAll("img"),
        i = 0,
        length = img_arr.length,
        src = "";
    for (; i < length; i++) {
        src = img_arr[i].getAttribute("data-src");
        if (src) {
            if (type === "get" && !~sou.indexOf(src)) {
                page_arr.push(src);
            } else {
                img_arr[i].setAttribute("src", src);
            }
        }
    }
    if (type === "get") {
        return page_arr;
    }
}

export function append_loading_to_dom(num) {
    var div = document.createElement("div"),
        style = document.createElement("style");
    style.innerHTML = get_default_css(num);
    div.innerHTML = get_html(num);
    div.appendChild(style);
    var documentElement = document.documentElement || document.children[0];
    documentElement.appendChild(div);
    return {
        div: div,
        style: style,
        documentElement: documentElement
    };
}

export function after_load_fn(arr) {
    let div = document.createElement("div"),
        html = "";
    div.style.display = "none";
    arr.forEach(function(item) {
        html += '<img src="' + item + '">';
    });
    div.innerHTML = html;
    document.body.appendChild(div);
}

export let debug_flag = false;

export function debug() {
    debug_flag = true;
}

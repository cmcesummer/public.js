const isPc = (function() {
    if (
        navigator.userAgent.match(
            /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
        )
    ) {
        return false;
    } else {
        return true;
    }
})();

function init({ box, points, radius = 0, end_cb, touch_cb }) {
    if (!box || !points.length) {
        console.warn("you need box , points ");
        return;
    }

    const context = this,
        rect = box.getBoundingClientRect(),
        box_to_top = rect.top,
        box_to_left = rect.left,
        length = points.length;
    let i = 0,
        x,
        y;
    for (; i < length; i++) {
        x = points[i].x;
        y = points[i].y;
        context.range_array.push({
            x: [x - radius, x + radius],
            y: [y - radius, y + radius]
        });
        x = y = 0;
    }

    const [downEvent, upEvent] = isPc ? ["mousedown", "mouseup"] : ["touchstart", "touchend"];

    function downFn(e) {
        if (context.result_array.length >= length) {
            context.touchNumber = 0;
            return;
        }
        let touch = e.changedTouches[0],
            clientX = touch.clientX,
            clientY = touch.clientY,
            point_to_box_top = clientY - box_to_top,
            point_to_box_left = clientX - box_to_left,
            range = context.range_array[context.touchNumber];
        touch_cb && touch_cb({ top: point_to_box_top, left: point_to_box_left });
        if (
            point_to_box_left >= range.x[0] &&
            point_to_box_left <= range.x[1] &&
            point_to_box_top >= range.y[0] &&
            point_to_box_top <= range.y[1]
        ) {
            context.result_array.push(true);
        } else {
            context.result_array.push(false);
        }
        context.touchNumber++;
    }

    function upFn() {
        if (context.touchNumber == length) {
            end_cb && end_cb(context.test());
        }
    }

    box.addEventListener(downEvent, downFn, false);
    box.addEventListener(upEvent, upFn, false);

    return function() {
        box.removeEventListener(downEvent, downFn, false);
        box.removeEventListener(upEvent, upFn, false);
    };
}

export default class PointRect {
    constructor(opt) {
        this.result_array = [];
        this.range_array = [];
        this.touchNumber = 0;
        this.box = opt.box;
        this.init_dom_inner = this.box.innerHTML;
        this.remove_event = init.call(this, opt);
    }

    // 重置
    reset() {
        this.touchNumber = 0;
        this.result_array = [];
        this.box.innerHTML = this.init_dom_inner;
    }

    // 移除实例所占用的部分内存
    remove() {
        this.result_array = null;
        this.range_array = null;
        this.touchNumber = null;
        this.box = null;
        this.init_dom_inner = null;
        this.remove_event();
        this.remove_event = null;
    }

    // 检测符不符合要求
    test() {
        let result_array = this.result_array,
            length = result_array.length,
            i = 0;
        for (; i < length; i++) {
            if (!result_array[i]) {
                return false;
            }
        }
        return true;
    }
}

let size = null;

// offsetWidth       返回元素的宽度（包括元素宽度、内边距和边框，不包括外边距）
// clientWidth       返回元素的宽度（包括元素宽度、内边距，不包括边框和外边距）
// offsetWidth - clientWidth = border

function getScrollBarSize() {
    if (size === null) {
        let outer = document.createElement("div"),
            outerStyle = outer.style,
            outerObj = {
                width: "50px",
                height: "50px",
                position: "absolute",
                top: "0",
                left: "0",
                visibility: "hidden",
                overflow: "hidden"
            };
        Object.keys(outerObj).forEach(key => {
            outerStyle[key] = outerObj[key];
        });
        let inner = document.createElement("div");
        inner.style.width = "100%";
        inner.style.height = "100px";
        outer.appendChild(inner);
        document.body.appendChild(outer);
        const noBarWid = inner.offsetWidth;
        outer.style.overflow = "auto";
        const hasBarWid = inner.offsetWidth;
        size = noBarWid - hasBarWid;
        document.body.removeChild(outer);
        outer = outerObj = inner = outerStyle = null;
        return size;
    }
    return size;
}

export default getScrollBarSize;

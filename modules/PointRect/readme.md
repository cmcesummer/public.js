# PointRect

我也不确定起什么名字好， 那就叫这个吧， pointRect, 按顺序点击验证的。

## 应用场景

依次、按顺序点击图中汉字或其他的东西，来验证成功或者失败。  
例如 qq 安全中心里按顺序点击图中的文字：  
![demoimg1](https://github.com/cmcesummer/public.js/blob/master/modules/PointRect/img/demoimg.png)
或者其他类似场景。

## API

先举个 🌰 吧：

```css
.ts {
    width: 4rem;
    height: 2rem;
    margin: 1rem auto;
    background: #d5d5d5;
    position: relative;
    overflow: hidden;
}

.touch-point {
    position: absolute;
    width: 0.5rem;
    height: 0.5rem;
    background: pink;
}
```

```js
const box = document.querySelector(".test"),
    font_size_str = document.documentElement.style.fontSize || 50,
    font_size = parseFloat(font_size_str);
const pointRect = new PointRect({
    // 容器 dom
    box,
    // 相对box的坐标数组 单位 px { x: 100px, y: 100px }
    // 具体就是你想让别人点的汉字的位子， 按顺序来；
    points: [{ x: 20, y: 20 }, { x: 40, y: 50 }],
    // 点击的有效半径  单位 px
    radius: 6,
    // 每次点击完成的回调
    touch_cb(obj) {
        const dom = document.createElement("div");
        dom.className = "touch-point";
        dom.style.top = obj.top - font_size * 0.25 + "px";
        dom.style.left = obj.left - font_size * 0.25 + "px";
        box.appendChild(dom);
    },
    // 连续点击完成后的回调
    end_cb(result) {
        if (!result) {
            console.log("error");
            setTimeout(() => {
                // 重置该次顺序
                pointRect.reset();
            }, 200);
        } else {
            // 移除实例所占用的部分内存
            pointRect.remove();
            console.log("true");
        }
    }
});
```

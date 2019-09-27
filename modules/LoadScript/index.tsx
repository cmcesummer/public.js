interface ICacheScriptItem {
    // 是否触发
    exec: boolean;
    // 是否完成
    finish: boolean;
    // 存储的回调
    register: Array<(furl?: string) => any>;
}

/**
 *
 *  ```js
 *  const load = new LoadScript();
 *  // 同步，对顺序有依赖
 *  load.sync(['a.js', 'b.js', 'c.js'], () => { console.log(`a/b/c依次加载完成`) }, (furl: string) => { console.log(`当前完成的是${furl}`) });
 *  load.sync(['a.js', 'd.js'], () => { console.log(`a加载时会与上边的加载做合并处理；d加载完成`) });
 *  // 异步，只加载，对顺序无依赖
 *  load.async(['e.js', 'f.js'], () => { console.log(`e/f已全部加载完成`) });
 *  ```
 */
export default class LoadScript {
    private cache: { [key: string]: ICacheScriptItem } = {};

    constructor() {}

    private load(url: string, cb: (furl?: string) => any): void {
        if (this.cache[url].finish) {
            cb(url);
            return;
        }

        if (this.cache[url].exec) {
            this.cache[url].register.push(cb);
            return;
        }

        this.cache[url] = {
            exec: true,
            finish: false,
            register: [cb]
        };

        const st = window.document.createElement("script");
        st.setAttribute("src", url);
        st.setAttribute("id", url);
        st.onload = () => {
            this.cache[url].finish = true;
            const { register } = this.cache[url];
            for (const itemCb of register) {
                itemCb(url);
            }
            this.cache[url].register = [];
        };

        window.document.head.appendChild(st);
    }

    // 异步加载
    public async(
        list: string[] | string,
        fileLoadCallback: (furl?: string) => any = () => {},
        singelCallback: (furl?: string) => any = () => {}
    ) {
        let count = 0;

        if (typeof list === "string") list = [list];

        for (const url of list) {
            if (!url) continue;
            this.load(url, (furl?: string) => {
                count++;
                singelCallback(furl);
                if (count === list.length - 1) {
                    fileLoadCallback(furl);
                }
            });
        }
    }

    // 同步加载
    public sync(
        list: string[] | string,
        fileLoadCallback: (furl?: string) => any = () => {},
        singelCallback: (furl?: string) => any = () => {}
    ) {
        let index = 0;

        if (typeof list === "string") list = [list];

        const finishcb = (furl?: string) => {
            singelCallback(furl);
            index++;
            const url = list[index];
            if (index === list.length - 1) {
                this.load(url, fileLoadCallback);
            } else {
                this.load(url, finishcb);
            }
        };

        this.load(list[index], finishcb);
    }

    public remove(list: string[] | string) {
        if (typeof list === "string") list = [list];

        for (const url of list) {
            const st = window.document.getElementById(url);

            if (st) window.document.head.removeChild(st);

            if (this.cache[url]) delete this.cache[url];
        }
    }
}

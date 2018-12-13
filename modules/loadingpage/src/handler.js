export default class Handler {
    constructor() {
        this.handler = {};
    }

    on(name, fn) {
        this.handler[name] = fn;
    }

    fire(name, value) {
        this.handler[name] && this.handler[name](value);
    }

    has(key) {
        return this.handler[key];
    }

    off(key) {
        if (key && this.handler[key]) {
            delete this.handler[key];
            return;
        }
        this.handler = {};
    }
}

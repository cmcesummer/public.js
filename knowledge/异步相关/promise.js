const PENDING = "p";
const FULFILLED = "f";
const REJECT = "r";

const isFunction = obj => typeof obj === "function";
const isObject = obj => !!(obj && typeof obj === "object");
const isThenable = obj => (isFunction(obj) || isObject(obj)) && "then" in obj;
const isPromise = promise => promise instanceof PRO;

function transtion(p, s, v) {
    if (p.state !== PENDING) return;
    p.state = s;
    p.result = v;
    const { callbacks } = p;
    setTimeout(() => {
        while (callbacks.length) {
            handleCallback(callbacks.shift(), s, v);
        }
    }, 0);
}

function handleCallback(callback, state, result) {
    const { onSuccessed, onFailed, resolve, reject } = callback;
    try {
        if (state === FULFILLED) {
            isFunction(onSuccessed) ? resolve(onSuccessed(result)) : resolve(result);
        } else if (state === REJECT) {
            isFunction(onFailed) ? reject(onFailed(result)) : reject(result);
        }
    } catch (e) {
        reject(e);
    }
}

function resolvePromise(promise, result, resolve, reject) {
    if (promise == result) {
        return reject(new Error());
    }
    if (isPromise(result)) {
        return result.then(resolve, reject);
    }
    if (isThenable(result)) {
        try {
            const { then } = result;
            if (isFunction(then)) {
                return new PRO(then.bind(result)).then(resolve, reject);
            }
        } catch (e) {
            return reject(e);
        }
    }
    return resolve(result);
}

function PRO(fn) {
    this.state = PENDING;
    this.result = null;
    this.callbacks = [];
    let flag = false;

    const onSuccessFn = value => transtion(this, FULFILLED, value);
    const onErrorFn = err => transtion(this, REJECT, err);

    const resolve = value => {
        if (flag) return;
        flag = true;
        resolvePromise(this, value, onSuccessFn, onErrorFn);
    };
    const reject = err => {
        if (flag) return;
        flag = true;
        onErrorFn(err);
    };

    try {
        fn(resolve, reject);
    } catch (e) {
        reject(e);
    }
}

PRO.prototype.then = function(onSuccessed, onFailed) {
    return new PRO((resolve, reject) => {
        const callback = { onSuccessed, onFailed, resolve, reject };
        if (this.state === PENDING) {
            this.callbacks.push(callback);
        } else {
            setTimeout(() => {
                handleCallback(callback, this.state, this.result);
            }, 0);
        }
    });
};

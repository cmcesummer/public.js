(() => {
    // https://github.com/Lucifier129/promise-aplus-impl/blob/master/src/naive.js
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
})();

(() => {
    const PENDING = "p";
    const FULFILLED = "f";
    const REJECTED = "r";
    function Promise(fn) {
        this.state = PENDING;
        this.value = null;
        this.succCbArray = [];
        this.errCbArray = [];
        const factory = (state, array) => {
            return value => {
                if (this.state === PENDING) {
                    this.state = state;
                    this.value = value;
                    setTimeout(() => {
                        array.map(item => item());
                    });
                }
            };
        };
        const resolve = factory(FULFILLED, this.succCbArray);
        const reject = factory(REJECTED, this.errCbArray);
        try {
            fn(resolve, reject);
        } catch (e) {
            reject(e);
        }
    }
    function middle(promise, value, resolve, reject) {
        if (promise === value) return reject(new Error("error"));
        if (value instanceof Promise || (value && typeof value.then === "function")) {
            try {
                value.then(
                    value => middle(promise, value, resolve, reject),
                    e => reject(e)
                );
            } catch (e) {
                reject(e);
            }
            return;
        }
        return resolve(value);
    }
    Promise.prototype.then = function(successFn, errorFn) {
        successFn = typeof successFn === "function" ? successFn : value => value;
        errorFn = typeof errorFn === "function" ? errorFn : value => value;
        const promise = new Promise((resolve, reject) => {
            const factory = fn => {
                try {
                    middle(promise, fn(this.value), resolve, reject);
                } catch (e) {
                    reject(e);
                }
            };
            if (this.state === PENDING) {
                this.succCbArray.push(factory.bind(this, successFn));
                this.errCbArray.push(factory.bind(this, errorFn));
            } else if (this.state === FULFILLED) {
                factory(successFn);
            } else {
                factory(errorFn);
            }
        });
    };
    Promise.prototype.catch = function(errorFn) {
        return this.then(null, errorFn);
    };
    Promise.prototype.finally = function(fn) {
        return this.then(
            () => {
                fn();
            },
            () => {
                fn();
            }
        );
    };
    Promise.resolve = function(value) {
        return new Promise((resolve, reject) => resolve(value));
    };
    Promise.reject = function(error) {
        return new Promise((resolve, reject) => reject(error));
    };
    Promise.all = function(pArray) {
        const resArray = [];
        return new Promise((resolve, reject) => {
            pArray.forEach((p, index) => {
                p.then(value => {
                    resArray[index] = value;
                    if (resArray.length === pArray.length) return resolve(resArray);
                }, reject);
            });
        });
    };
    Promise.race = function(pArray) {
        return new Promise((resolve, reject) => {
            for (const p of pArray) {
                p.then(value => {
                    return resolve(value);
                }, reject);
            }
        });
    };
    Promise.retry = function(p, times = 1, delay = 0) {
        let error = null;
        return new Promise((resolve, reject) => {
            const fn = function() {
                if (times <= 0) return reject(error);
                p()
                    .then(resolve)
                    .catch(e => {
                        times--;
                        error = e;
                        setTimeout(fn, delay);
                    });
            };
            fn();
        });
    };
})();

(() => {
    const PENDING = "PENDING",
        REJECTED = "REJECTRD",
        ONFULFILE = "ONFULFILE";
    function Promises(fnm) {
        this.value = null;
        this.state = PENDING;
        this.successArray = [];
        this.errorArray = [];
        const resolve = value => {
            if (this.state !== PENDING) return;
            // Promise.resolve().then(_ => {
            //     this.value = value;
            //     this.state = ONFULFILE;
            //     this.successArray.forEach(fn => {
            //         fn(value);
            //     });
            // });
            setTimeout(() => {
                this.value = value;
                this.state = ONFULFILE;
                this.successArray.forEach(fn => {
                    fn(value);
                });
            }, 0);
        };
        const reject = err => {
            if (this.state !== PENDING) return;
            setTimeout(() => {
                this.value = err;
                this.state = REJECTED;
                this.errorArray.forEach(fn => {
                    fn(err);
                });
            }, 0);
        };
        try {
            fnm(resolve, reject);
        } catch (e) {
            reject(e);
        }
    }
    function middle(p2, value, resolve, reject) {
        // console.log(value);
        if (p2 === value) {
            throw new Error("error");
        }
        if (value instanceof Promises || (value && value.then && typeof value.then === "function")) {
            try {
                value.then(res => middle(p2, res, resolve, reject), reject);
            } catch (e) {
                reject(e);
            }
            return;
        }
        resolve(value);
    }
    Promises.prototype.then = function(successFn, errorFn) {
        successFn = successFn && typeof successFn === "function" ? successFn : val => val;
        errorFn = errorFn && typeof errorFn === "function" ? errorFn : err => err;
        const p2 = new Promises((resolve, reject) => {
            if (this.state === PENDING) {
                this.successArray.push(() => {
                    try {
                        const value = successFn(this.value);
                        middle(p2, value, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                });
                this.errorArray.push(() => {
                    try {
                        const value = errorFn(this.value);
                        middle(p2, value, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                });
            } else if (this.state === ONFULFILE) {
                middle(p2, successFn(this.value), resolve, reject);
            }
        });
        return p2;
    };
    Promises.prototype.catch = function(fn) {
        return this.then(
            val => {
                console.log(val);
                return val;
            },
            e => {
                fn(e);
                return e;
            }
        );
    };

    function c(value, time = 3000) {
        return new Promises((res, rej) => {
            setTimeout(() => {
                res(value);
            }, time);
        });
    }

    c(1)
        // .then(res => {
        //     console.log(`line1: `, res);
        //     return c(2);
        // })
        .then(res => {
            console.log(`line2: `, res);
            // throw new Error("error");
            return res;
        })
        // .catch(e => {
        //     console.log(e);
        //     return e;
        // })
        .then(res => {
            console.log(`line3: `, res);
        });
})();

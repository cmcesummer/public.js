(function(global, factory) {
    "use strict";
    typeof exports === "object" && typeof module !== "undefined"
        ? (module.exports = factory())
        : typeof define === "function" && define.amd
            ? define(factory)
            : (global.promise = factory());
})(this, function() {
    "use strict";

    if ("Promise" in window) {
        return Promise;
    }
    var PENDING = "pending",
        DONE = "resolved",
        FILE = "rejected";
    function promise(def) {
        this.__status = PENDING;
        this.__doneValue = null;
        this.__failValue = null;
        this.__resolveArray = [];
        this.__rejectArray = [];
        var that = this;
        function finishStatusFactory(status) {
            return function(value) {
                setTimeout(function() {
                    that.__status = status;
                    var array = null;
                    if (status === DONE) {
                        that.__doneValue = value;
                        array = that.__resolveArray;
                    } else {
                        that.__failValue = value;
                        array = that.__rejectArray;
                    }
                    var i = 0,
                        length = array.length;
                    for (; i < length; i++) {
                        array[i](value);
                    }
                });
            };
        }
        try {
            def(finishStatusFactory(DONE), finishStatusFactory(FILE));
        } catch (e) {
            finishStatusFactory(FILE)(e);
        }
    }

    function __middleFinishStatusDef(reslut, resolve, reject, p2) {
        if (reslut === p2) {
            return;
        }
        if (
            reslut !== null &&
            (typeof reslut === "object" || typeof reslut === "function")
        ) {
            if (typeof reslut.then == "function") {
                try {
                    reslut.then(function(res) {
                        __middleFinishStatusDef(res, resolve, reject);
                    }, reject);
                } catch (e) {
                    reject(e);
                }
            } else {
                resolve(reslut);
            }
        } else {
            resolve(reslut);
        }
    }

    promise.prototype.then = function(resolvedFn, rejectedFn) {
        if (!resolvedFn || typeof resolvedFn != "function") {
            resolvedFn = function(value) {
                return value;
            };
        }
        if (!rejectedFn || typeof rejectedFn != "function") {
            rejectedFn = function(e) {
                throw e;
            };
        }
        var status = this.__status,
            that = this,
            p2;
        if (status === PENDING) {
            //
            p2 = new promise(function(res, rej) {
                that.__resolveArray.push(function(value) {
                    // 在内部try catch 是要捕获 then 回掉的错误
                    try {
                        // 下一个 promise.then 的回掉的参数
                        // 当返回的是promise时，是返回的实例化对象，直接resolve了，所以需要一个监听函数 ，需要调用then
                        var reslut = resolvedFn(value);
                        __middleFinishStatusDef(reslut, res, rej, p2);
                    } catch (e) {
                        rej(e);
                    }
                });
                that.__rejectArray.push(function(er) {
                    try {
                        var reslut = rejectedFn(er);
                        __middleFinishStatusDef(reslut, res, rej, p2);
                    } catch (e) {
                        rej(e);
                    }
                });
            });
        } else if (status === DONE) {
            p2 = new promise(function(res, rej) {
                try {
                    var reslut = resolvedFn(that.__doneValue);
                    __middleFinishStatusDef(reslut, res, rej, p2);
                } catch (e) {
                    rej(e);
                }
            });
        } else {
            p2 = new promise(function(res, rej) {
                try {
                    var reslut = rejectedFn(that.__failValue);
                    __middleFinishStatusDef(reslut, res, rej, p2);
                } catch (e) {
                    rej(e);
                }
            });
        }
        return p2;
    };

    promise.prototype["catch"] = function(fn) {
        return this.then(null, fn);
    };

    promise.resolve = function(value) {
        return new promise(function(resolve) {
            resolve(value);
        });
    };

    promise.reject = function(err) {
        return new promise(function(res, rej) {
            rej(err);
        });
    };

    promise.all = function(promiseArray) {
        var arr = [],
            i = 0,
            length = promiseArray.length;
        return new promise(function(resolve, reject) {
            for (; i < length; i++) {
                !(function(i) {
                    try {
                        promiseArray[i].then(function(res) {
                            arr.push(res);
                            if (i === length - 1) {
                                resolve(arr);
                            }
                        }, reject);
                    } catch (e) {
                        reject(e);
                    }
                })(i);
            }
        });
    };

    promise.race = function(promiseArray) {
        var i = 0,
            length = promiseArray.length,
            single;
        var p = new promise(function(resolve, reject) {
            for (; i < length; i++) {
                try {
                    promiseArray[i].then(function(res) {
                        if (single) return;
                        single = true;
                        resolve(res);
                    }, reject);
                } catch (e) {
                    reject(e);
                }
            }
        });
        return p;
    };

    return promise;
});

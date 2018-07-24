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
    var promise = function(fn) {
        this.__status = PENDING;
        this.__doneValue = null;
        this.__fileValue = null;
        this.__resolveArray = [];
        this.__rejectArray = [];
        var that = this;
        function __resolve(value) {
            setTimeout(function() {
                var i = 0,
                    length = that.__resolveArray.length;
                if (that.__status === PENDING) {
                    that.__status = DONE;
                    that.__doneValue = value;
                    for (; i < length; i++) {
                        that.__resolveArray[i](value);
                    }
                }
            }, 0);
        }
        function __reject(value) {
            setTimeout(function() {
                var i = 0,
                    length = that.__rejectArray.length;
                if (that.__status === PENDING) {
                    that.__status = FILE;
                    that.__fileValue = value;
                    for (; i < length; i++) {
                        that.__rejectArray[i](value);
                    }
                }
            }, 0);
        }
        try {
            fn(__resolve, __reject);
        } catch (e) {
            __reject(e);
        }
    };

    function __middleResolve(resulte, resolve, reject) {
        if (
            resulte !== null &&
            (typeof resulte === "object" || typeof resulte === "function")
        ) {
            try {
                if (typeof resulte.then === "function") {
                    resulte.then(
                        function(res) {
                            __middleResolve(res, resolve, reject);
                        },
                        function(e) {
                            reject(e);
                        }
                    );
                } else {
                    resolve(resulte);
                }
            } catch (e) {
                reject(e);
            }
        } else {
            resolve(resulte);
        }
    }

    promise.prototype.then = function(resolveFn, rejectFn) {
        if (!resolveFn) {
            throw "you need a function in first arguments";
        }
        var status = this.__status,
            that = this,
            p2 = null;
        if (status === PENDING) {
            p2 = new promise(function(resolve, reject) {
                that.__resolveArray.push(function(value) {
                    try {
                        var resulte = resolveFn(value);
                        __middleResolve(resulte, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                });
                rejectFn &&
                    that.__rejectArray.push(function(value) {
                        try {
                            var resulte = rejectFn(value);
                            resolve(resulte);
                        } catch (e) {
                            reject(e);
                        }
                    });
            });
        } else if (status === DONE) {
            p2 = new promise(function(resolve, reject) {
                try {
                    var resulte = resolveFn(that.__doneValue);
                    __middleResolve(resulte, resolve, reject);
                } catch (e) {
                    reject(e);
                }
            });
        } else {
            p2 = new promise(function(resolve, reject) {
                try {
                    var resulte = rejectFn && rejectFn(that.__fileValue);
                    rejectFn && __middleResolve(resulte, resolve, reject);
                } catch (e) {
                    reject(e);
                }
            });
        }

        return p2;
    };

    return promise;
});

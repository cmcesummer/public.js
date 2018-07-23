(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.url = factory());
}(this, (function () { 
    'use strict';

    function isObject(val) {
        return Object.prototype.toString.call(val) === "[object Object]";
    }

    function isString(val) {
        return Object.prototype.toString.call(val) === "[object String]";
    }

    function isArray(val) {
        return Object.prototype.toString.call(val) === "[object Array]";
    }

    function pushState(url) {
        if (!("history" in window && "pushState" in window.history)) {
            window.location.href = url;
            return;
        }
        window.history.pushState({}, null, url);
    }

    function replaceState(url) {
        if (!("history" in window && "pushState" in window.history)) {
            window.location.replace(url);
            return;
        }
        window.history.replaceState({}, null, url);
    }

    /**
     * 兼容ie567 获取location.origin
     */
    function getorigin() {
        var location = window.location,
            locationOrigin = location.origin,
            port = location.port,
            origin = locationOrigin
                ? locationOrigin
                : location.protocol +
                  "//" +
                  location.host +
                  (port ? ":" + port : "");
        return origin;
    }

    /**
     * 格式化传入字符串
     * @param {String} url
     * @return {Object}
     */
    function parseUrl(url) {
        var searchIndex = url.indexOf("?");
        if (searchIndex < 0) {
            return { search: "", hash: "", origin: url };
        }
        var hashIndex = url.indexOf("#"),
            search,
            hash,
            origin = url.substring(0, searchIndex);
        if (hashIndex < 0) {
            search = url.substring(searchIndex + 1);
            hash = "";
        } else {
            search = url.substring(searchIndex + 1, hashIndex);
            hash = url.substring(hashIndex + 1);
        }
        return { search: search, hash: hash, origin: origin };
    }

    // 获取全局符合 key=value 格式的数组
    var reg1 = /(^|&|\?|#)([^&#\?]*)=([^&#\?]*)/g,
        // 针对单个字符串使用 match 获取 key 和 value
        reg2 = /(^|&|#|\?)([^&#\?]*)=([^&#\?]*)(&|$|#|\?)/;

    /**
     * 格式化传入单个数组为Object
     * @param {Array} array
     * @return {Object}
     */

    function parseParamToObject(array) {
        var i,
            length,
            target,
            haveItem,
            paramObj = {},
            value;
        i = 0;
        length = array.length;
        for (; i < length; i++) {
            target = array[i].match(reg2);
            haveItem = paramObj[target[2]];
            value = encodeURIComponent(target[3]);
            if (haveItem) {
                if (isArray(haveItem)) {
                    haveItem.push(value);
                } else {
                    paramObj[target[2]] = [haveItem, value];
                }
            } else {
                paramObj[target[2]] = value;
            }
        }
        return paramObj;
    }

    var CONST_SEARCH = "search",
        CONST_HASH = "hash",
        CONST_QUERY = "query";

    /**
     * 生产符合条件的参数对象
     * @param {Object} obj
     * @return {Object}
     */

    function factoryParamObject(obj) {
        var paramObj = {};
        var searchArray = obj.search.match(reg1);
        if (searchArray) {
            paramObj[CONST_SEARCH] = parseParamToObject(searchArray);
        } else if (obj.search) {
            paramObj[CONST_SEARCH] = obj.search;
        }
        if (!obj.hash) {
            return paramObj;
        }
        var hashQueryIndex = obj.hash.indexOf("?"),
            pureHash,
            query;
        if (hashQueryIndex > -1) {
            pureHash = obj.hash.substring(0, hashQueryIndex);
            query = obj.hash.substring(hashQueryIndex + 1);
        } else {
            pureHash = obj.hash;
            query = "";
        }
        var pureHashArray = pureHash.match(reg1);
        if (pureHashArray) {
            paramObj[CONST_HASH] = parseParamToObject(pureHashArray);
        } else if (pureHash) {
            paramObj[CONST_HASH] = pureHash;
        }
        var queryArray = query.match(reg1);
        if (queryArray) {
            paramObj[CONST_QUERY] = parseParamToObject(queryArray);
        }
        return paramObj;
    }

    /**
     * 生产新 url对象
     * @param {Object} urlObj 老 url 对象
     * @param {Object} paramObj 参数对象
     * @return {Object}
     */

    function factoryNewUrl(urlObj, paramObj) {
        var currentParam = factoryParamObject(urlObj),
            key,
            currentSearch = currentParam[CONST_SEARCH] || {},
            nextSearch = paramObj[CONST_SEARCH],
            currentHash = currentParam[CONST_HASH] || {},
            nextHash = paramObj[CONST_HASH],
            currentQuery = currentParam[CONST_QUERY] || {},
            nextQuery = paramObj[CONST_QUERY];
        if (nextSearch) {
            for (key in nextSearch) {
                currentSearch[key] = nextSearch[key];
            }
        }
        if (nextHash) {
            if (isString(nextHash)) {
                currentHash = nextHash;
            } else {
                for (key in nextHash) {
                    currentHash[key] = nextHash[key];
                }
            }
        }
        if (nextQuery) {
            for (key in nextQuery) {
                currentQuery[key] = nextQuery[key];
            }
        }
        var nextParamObj = {};
        nextParamObj[CONST_SEARCH] = currentSearch;
        nextParamObj[CONST_HASH] = currentHash;
        nextParamObj[CONST_QUERY] = currentQuery;
        return nextParamObj;
    }

    /**
     * 对象转字符串
     * @param {Object} nextObj
     * @return {String}
     */
    function joinUrlString(nextObj) {
        var string = "",
            key;
        for (key in nextObj) {
            if (!nextObj[key]) {
                continue;
            }
            string += key + "=" + encodeURIComponent(nextObj[key]) + "&";
        }
        return string.replace(/&$/, "");
    }

    /**
     * 获取 url 对象
     * @param {String || null} str  传入 String,则获取的是 str的对象， 不传str, 获取的是当前url的对象
     * @return {Object}
     */
    function get(str) {
        var urlObj;
        if (str) urlObj = parseUrl(str);
        else
            urlObj = {
                search: _win.location.search.substring(1),
                hash: _win.location.hash.substring(1)
            };
        return factoryParamObject(urlObj);
    }

    /**
     * 设置新url    str 为字符串时 改变的是str ,str是对象时改变的是当前 url
     * 对象格式： value 为空则删除当前 key
     * paramObj = {
     *     query: { key1: value1, key2: value2 },
     *     hash: { key1: value1 } || '/home/user',
     *     query: { key1: value1 }
     * }
     * typeObj 格式： {type: 'replace', reload: false}
     * @param {String || Object} str
     * @param {Object || null} paramObj
     * @param {String} type  replace push
     * @return {String}
     */
    function set(str, paramObj, typeObj) {
        var urlObj;
        if (isObject(str)) {
            urlObj = {
                search: _win.location.search.substring(1),
                hash: _win.location.hash.substring(1),
                origin: getorigin()
            };
            typeObj = paramObj;
            paramObj = str;
        } else {
            urlObj = parseUrl(str);
        }
        var nextParamObj = factoryNewUrl(urlObj, paramObj),
            nextSearch = nextParamObj[CONST_SEARCH],
            nextHash = nextParamObj[CONST_HASH],
            nextQuery = nextParamObj[CONST_QUERY],
            searchStr = "",
            hashStr = "",
            queryStr = "",
            type = typeObj && typeObj.type;
        if (nextSearch) searchStr = joinUrlString(nextSearch);
        if (nextHash) {
            if (isString(nextHash)) hashStr = nextHash;
            else hashStr = joinUrlString(nextHash);
        }
        if (nextQuery) queryStr = joinUrlString(nextQuery);
        var finalUrl =
            urlObj.origin +
            (searchStr &&
                "?" + searchStr + "#" + hashStr + (queryStr && "?" + queryStr));
        if (type) {
            if (type === "replace") {
                if (typeObj.reload) {
                    window.location.replace(finalUrl);
                } else {
                    replaceState(finalUrl);
                }
            } else {
                if (typeObj.reload) {
                    window.location.href = finalUrl;
                } else {
                    pushState(finalUrl);
                }
            }
        }
        return finalUrl;
    }

    var url = {
        get: get,
        set: set,
        /**
         * 提供获取参数的轻便方法
         * 获取当前url 的 name 的参数
         * @param {String} name
         */
        get_url_params: function(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = _win.location.search.substr(1);
            r = r.match(reg);
            if (r != null) return decodeURIComponent(r[2]);
            return null;
        },
        /**
         * 提供设置参数的轻便方法
         * 设置当前url 为新 url
         * obj 格式 ： { key1: value1, key2:value2 }  当value为''||false 时 删除当前key
         * typeObj 格式： {type: 'replace', reload: false}
         * @param {Object} obj
         * @param {String} typeObj  replace push
         */
        set_url_params: function(obj, typeObj) {
            var r = window.location.href,
                addSearch = window.location.search.length,
                key,
                type = typeObj && typeObj.type;
            for (key in obj) {
                var reg = new RegExp("([?&]" + key + "=)[^&]*(&|$)");
                if (reg.test(r)) {
                    if (obj[key]) {
                        r = r.replace(
                            reg,
                            "$1" + encodeURIComponent(obj[key]) + "$2"
                        );
                    } else {
                        r = r.replace(reg, "$2");
                    }
                } else {
                    addSearch = addSearch + 2;
                    r = r + (addSearch > 1 ? "&" : "?") + key + "=" + obj[key];
                }
            }
            if (type) {
                if (type === "replace") {
                    if (typeObj.reload) {
                        window.location.replace(r);
                    } else {
                        replaceState(r);
                    }
                } else {
                    if (typeObj.reload) {
                        window.location.href = r;
                    } else {
                        pushState(r);
                    }
                }
            }
            return r;
        }
    };

    return url

})));


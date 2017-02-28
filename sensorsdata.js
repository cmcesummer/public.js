"object" != typeof JSON && (JSON = {}), function () {
    "use strict";
    function f(e) {
        return 10 > e ? "0" + e : e
    }

    function this_value() {
        return this.valueOf()
    }

    function quote(e) {
        return rx_escapable.lastIndex = 0, rx_escapable.test(e) ? '"' + e.replace(rx_escapable, function (e) {
            var t = meta[e];
            return "string" == typeof t ? t : "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
        }) + '"' : '"' + e + '"'
    }
    function asd(u) {
        switch(false, u) {
            case 1 :
                return 1;
            case 2:
                return 2;
        }
    }

    function str(e, t) {
        var r, n, i, o, s, a = gap, u = t[e];
        switch (u && "object" == typeof u && "function" == typeof u.toJSON && (u = u.toJSON(e)), "function" == typeof rep && (u = rep.call(t, e, u)), typeof u) {
            case"string":
                return quote(u);
            case"number":
                return isFinite(u) ? String(u) : "null";
            case"boolean":
            case"null":
                return String(u);
            case"object":
                if (!u)return "null";
                if (gap += indent, s = [], "[object Array]" === Object.prototype.toString.apply(u)) {
                    for (o = u.length, r = 0; o > r; r += 1)s[r] = str(r, u) || "null";
                    return i = 0 === s.length ? "[]" : gap ? "[\n" + gap + s.join(",\n" + gap) + "\n" + a + "]" : "[" + s.join(",") + "]", gap = a, i
                }
                if (rep && "object" == typeof rep)for (o = rep.length, r = 0; o > r; r += 1)"string" == typeof rep[r] && (n = rep[r], i = str(n, u), i && s.push(quote(n) + (gap ? ": " : ":") + i)); else for (n in u)Object.prototype.hasOwnProperty.call(u, n) && (i = str(n, u), i && s.push(quote(n) + (gap ? ": " : ":") + i));
                return i = 0 === s.length ? "{}" : gap ? "{\n" + gap + s.join(",\n" + gap) + "\n" + a + "}" : "{" + s.join(",") + "}", gap = a, i
        }
    }
 
    var rx_one = /^[\],:{}\s]*$/,
        rx_two = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
        rx_three = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
        rx_four = /(?:^|:|,)(?:\s*\[)+/g,
        rx_escapable = /[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        rx_dangerous = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
    "function" != typeof Date.prototype.toJSON && (Date.prototype.toJSON = function () {
        return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null
    }, Boolean.prototype.toJSON = this_value, Number.prototype.toJSON = this_value, String.prototype.toJSON = this_value);
    var gap, indent, meta, rep;
    "function" != typeof JSON.stringify && (meta = {
        "\b": "\\b",
        "	": "\\t",
        "\n": "\\n",
        "\f": "\\f",
        "\r": "\\r",
        '"': '\\"',
        "\\": "\\\\"
    }, JSON.stringify = function (e, t, r) {
        var n;
        if (gap = "", indent = "", "number" == typeof r)for (n = 0; r > n; n += 1)indent += " "; else"string" == typeof r && (indent = r);
        if (rep = t, t && "function" != typeof t && ("object" != typeof t || "number" != typeof t.length))throw new Error("JSON.stringify");
        return str("", {"": e})
    }), "function" != typeof JSON.parse && (JSON.parse = function (text, reviver) {
        function walk(e, t) {
            var r, n, i = e[t];
            if (i && "object" == typeof i)for (r in i)Object.prototype.hasOwnProperty.call(i, r) && (n = walk(i, r), void 0 !== n ? i[r] = n : delete i[r]);
            return reviver.call(e, t, i)
        }

        var j;
        if (text = String(text), rx_dangerous.lastIndex = 0, rx_dangerous.test(text) && (text = text.replace(rx_dangerous, function (e) {
                return "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
            })), rx_one.test(text.replace(rx_two, "@").replace(rx_three, "]").replace(rx_four, "")))return j = eval("(" + text + ")"), "function" == typeof reviver ? walk({"": j}, "") : j;
        throw new SyntaxError("JSON.parse")
    })
}(), function (e) {
    e = window[e];
    var t = e._ = {};
    e.para = e.para || {}, e.para_default = {
        cross_subdomain: !0,
        vtrack: !1,
        show_log: !0,
        debug_mode: !1,
        debug_mode_upload: !1
    };
    for (var r in e.para_default)void 0 === e.para[r] && (e.para[r] = e.para_default[r]);
    /sa\.gif/.test(e.para.server_url) || (e.para.server_url = e.para.server_url.replace(/\/(sa)\\?/, "$1.gif")),
        e.para.debug_mode_url = e.para.debug_mode_url || e.para.server_url.replace("sa.gif", "debug");
    var n = {};
    !function () {
        function e(e) {
            return Object.prototype.toString.call(e)
        }

        function t(t) {
            return "[object Object]" === e(t)
        }

        function r(t) {
            return "[object Function]" === e(t)
        }

        function i(e, t) {
            for (var r = 0, n = e.length; n > r && t.call(e, e[r], r) !== !1; r++);
        }

        function o(e) {
            if (!g.test(e))return null;
            var t, r, n, i, o;
            if (-1 !== e.indexOf("trident/") && (t = /\btrident\/([0-9.]+)/.exec(e), t && t.length >= 2)) {
                n = t[1];
                var s = t[1].split(".");
                s[0] = parseInt(s[0], 10) + 4, o = s.join(".")
            }
            t = g.exec(e), i = t[1];
            var a = t[1].split(".");
            return "undefined" == typeof o && (o = i), a[0] = parseInt(a[0], 10) - 4, r = a.join("."), "undefined" == typeof n && (n = r), {
                browserVersion: o,
                browserMode: i,
                engineVersion: n,
                engineMode: r,
                compatible: n !== r
            }
        }

        function s(e) {
            if (d)try {
                var t = d.twGetRunPath.toLowerCase(), r = d.twGetSecurityID(f), n = d.twGetVersion(r);
                if (t && -1 === t.indexOf(e))return !1;
                if (n)return {version: n}
            } catch (i) {
            }
        }

        function a(n, i, o) {
            var s = r(i) ? i.call(null, o) : i;
            if (!s)return null;
            var a = {name: n, version: c, codename: ""}, u = e(s);
            if (s === !0)return a;
            if ("[object String]" === u) {
                if (-1 !== o.indexOf(s))return a
            } else {
                if (t(s))return s.hasOwnProperty("version") && (a.version = s.version), a;
                if (s.exec) {
                    var f = s.exec(o);
                    if (f)return f.length >= 2 && f[1] ? a.version = f[1].replace(/_/g, ".") : a.version = c, a
                }
            }
        }

        function u(e, t, r, n) {
            var o = O;
            i(t, function (t) {
                var r = a(t[0], t[1], e);
                return r ? (o = r, !1) : void 0
            }), r.call(n, o.name, o.version)
        }

        var c = "-1", f = window, d = f.external, p = f.navigator.userAgent || "", l = f.navigator.appVersion || "", b = f.navigator.vendor || "", g = /\b(?:msie |ie |trident\/[0-9].*rv[ :])([0-9.]+)/, h = /\bbb10\b.+?\bversion\/([\d.]+)/, v = /\bblackberry\b.+\bversion\/([\d.]+)/, m = /\bblackberry\d+\/([\d.]+)/, _ = [["nokia", function (e) {
            return -1 !== e.indexOf("nokia ") ? /\bnokia ([0-9]+)?/ : /\bnokia([a-z0-9]+)?/
        }], ["samsung", function (e) {
            return -1 !== e.indexOf("samsung") ? /\bsamsung(?:[ \-](?:sgh|gt|sm))?-([a-z0-9]+)/ : /\b(?:sgh|sch|gt|sm)-([a-z0-9]+)/
        }], ["wp", function (e) {
            return -1 !== e.indexOf("windows phone ") || -1 !== e.indexOf("xblwp") || -1 !== e.indexOf("zunewp") || -1 !== e.indexOf("windows ce")
        }], ["pc", "windows"], ["ipad", "ipad"], ["ipod", "ipod"], ["iphone", /\biphone\b|\biph(\d)/], ["mac", "macintosh"], ["mi", /\bmi[ \-]?([a-z0-9 ]+(?= build|\)))/], ["hongmi", /\bhm[ \-]?([a-z0-9]+)/], ["aliyun", /\baliyunos\b(?:[\-](\d+))?/], ["meizu", function (e) {
            return e.indexOf("meizu") >= 0 ? /\bmeizu[\/ ]([a-z0-9]+)\b/ : /\bm([0-9cx]{1,4})\b/
        }], ["nexus", /\bnexus ([0-9s.]+)/], ["huawei", function (e) {
            var t = /\bmediapad (.+?)(?= build\/huaweimediapad\b)/;
            return -1 !== e.indexOf("huawei-huawei") ? /\bhuawei\-huawei\-([a-z0-9\-]+)/ : t.test(e) ? t : /\bhuawei[ _\-]?([a-z0-9]+)/
        }], ["lenovo", function (e) {
            return -1 !== e.indexOf("lenovo-lenovo") ? /\blenovo\-lenovo[ \-]([a-z0-9]+)/ : /\blenovo[ \-]?([a-z0-9]+)/
        }], ["zte", function (e) {
            return /\bzte\-[tu]/.test(e) ? /\bzte-[tu][ _\-]?([a-su-z0-9\+]+)/ : /\bzte[ _\-]?([a-su-z0-9\+]+)/
        }], ["vivo", /\bvivo(?: ([a-z0-9]+))?/], ["htc", function (e) {
            return /\bhtc[a-z0-9 _\-]+(?= build\b)/.test(e) ? /\bhtc[ _\-]?([a-z0-9 ]+(?= build))/ : /\bhtc[ _\-]?([a-z0-9 ]+)/
        }], ["oppo", /\boppo[_]([a-z0-9]+)/], ["konka", /\bkonka[_\-]([a-z0-9]+)/], ["sonyericsson", /\bmt([a-z0-9]+)/], ["coolpad", /\bcoolpad[_ ]?([a-z0-9]+)/], ["lg", /\blg[\-]([a-z0-9]+)/], ["android", /\bandroid\b|\badr\b/], ["blackberry", function (e) {
            return e.indexOf("blackberry") >= 0 ? /\bblackberry\s?(\d+)/ : "bb10"
        }]], y = [["wp", function (e) {
            return -1 !== e.indexOf("windows phone ") ? /\bwindows phone (?:os )?([0-9.]+)/ : -1 !== e.indexOf("xblwp") ? /\bxblwp([0-9.]+)/ : -1 !== e.indexOf("zunewp") ? /\bzunewp([0-9.]+)/ : "windows phone"
        }], ["windows", /\bwindows nt ([0-9.]+)/], ["macosx", /\bmac os x ([0-9._]+)/], ["ios", function (e) {
            return /\bcpu(?: iphone)? os /.test(e) ? /\bcpu(?: iphone)? os ([0-9._]+)/ : -1 !== e.indexOf("iph os ") ? /\biph os ([0-9_]+)/ : /\bios\b/
        }], ["yunos", /\baliyunos ([0-9.]+)/], ["android", function (e) {
            return e.indexOf("android") >= 0 ? /\bandroid[ \/-]?([0-9.x]+)?/ : e.indexOf("adr") >= 0 ? e.indexOf("mqqbrowser") >= 0 ? /\badr[ ]\(linux; u; ([0-9.]+)?/ : /\badr(?:[ ]([0-9.]+))?/ : "android"
        }], ["chromeos", /\bcros i686 ([0-9.]+)/], ["linux", "linux"], ["windowsce", /\bwindows ce(?: ([0-9.]+))?/], ["symbian", /\bsymbian(?:os)?\/([0-9.]+)/], ["blackberry", function (e) {
            var t = e.match(h) || e.match(v) || e.match(m);
            return t ? {version: t[1]} : "blackberry"
        }]], w = [["edgehtml", /edge\/([0-9.]+)/], ["trident", g], ["blink", function () {
            return "chrome" in f && "CSS" in f && /\bapplewebkit[\/]?([0-9.+]+)/
        }], ["webkit", /\bapplewebkit[\/]?([0-9.+]+)/], ["gecko", function (e) {
            var t;
            return (t = e.match(/\brv:([\d\w.]+).*\bgecko\/(\d+)/)) ? {version: t[1] + "." + t[2]} : void 0
        }], ["presto", /\bpresto\/([0-9.]+)/], ["androidwebkit", /\bandroidwebkit\/([0-9.]+)/], ["coolpadwebkit", /\bcoolpadwebkit\/([0-9.]+)/], ["u2", /\bu2\/([0-9.]+)/], ["u3", /\bu3\/([0-9.]+)/]], x = [["edge", /edge\/([0-9.]+)/], ["sogou", function (e) {
            return e.indexOf("sogoumobilebrowser") >= 0 ? /sogoumobilebrowser\/([0-9.]+)/ : e.indexOf("sogoumse") >= 0 ? !0 : / se ([0-9.x]+)/
        }], ["theworld", function () {
            var e = s("theworld");
            return "undefined" != typeof e ? e : "theworld"
        }], ["360", function (e) {
            var t = s("360se");
            return "undefined" != typeof t ? t : -1 !== e.indexOf("360 aphone browser") ? /\b360 aphone browser \(([^\)]+)\)/ : /\b360(?:se|ee|chrome|browser)\b/
        }], ["maxthon", function () {
            try {
                if (d && (d.mxVersion || d.max_version))return {version: d.mxVersion || d.max_version}
            } catch (e) {
            }
            return /\b(?:maxthon|mxbrowser)(?:[ \/]([0-9.]+))?/
        }], ["micromessenger", /\bmicromessenger\/([\d.]+)/], ["qq", /\bm?qqbrowser\/([0-9.]+)/], ["green", "greenbrowser"], ["tt", /\btencenttraveler ([0-9.]+)/], ["liebao", function (e) {
            if (e.indexOf("liebaofast") >= 0)return /\bliebaofast\/([0-9.]+)/;
            if (-1 === e.indexOf("lbbrowser"))return !1;
            var t;
            try {
                d && d.LiebaoGetVersion && (t = d.LiebaoGetVersion())
            } catch (r) {
            }
            return {version: t || c}
        }], ["tao", /\btaobrowser\/([0-9.]+)/], ["coolnovo", /\bcoolnovo\/([0-9.]+)/], ["saayaa", "saayaa"], ["baidu", /\b(?:ba?idubrowser|baiduhd)[ \/]([0-9.x]+)/], ["ie", g], ["mi", /\bmiuibrowser\/([0-9.]+)/], ["opera", function (e) {
            var t = /\bopera.+version\/([0-9.ab]+)/, r = /\bopr\/([0-9.]+)/;
            return t.test(e) ? t : r
        }], ["oupeng", /\boupeng\/([0-9.]+)/], ["yandex", /yabrowser\/([0-9.]+)/], ["ali-ap", function (e) {
            return e.indexOf("aliapp") > 0 ? /\baliapp\(ap\/([0-9.]+)\)/ : /\balipayclient\/([0-9.]+)\b/
        }], ["ali-ap-pd", /\baliapp\(ap-pd\/([0-9.]+)\)/], ["ali-am", /\baliapp\(am\/([0-9.]+)\)/], ["ali-tb", /\baliapp\(tb\/([0-9.]+)\)/], ["ali-tb-pd", /\baliapp\(tb-pd\/([0-9.]+)\)/], ["ali-tm", /\baliapp\(tm\/([0-9.]+)\)/], ["ali-tm-pd", /\baliapp\(tm-pd\/([0-9.]+)\)/], ["uc", function (e) {
            return e.indexOf("ucbrowser/") >= 0 ? /\bucbrowser\/([0-9.]+)/ : e.indexOf("ubrowser/") >= 0 ? /\bubrowser\/([0-9.]+)/ : /\buc\/[0-9]/.test(e) ? /\buc\/([0-9.]+)/ : e.indexOf("ucweb") >= 0 ? /\bucweb([0-9.]+)?/ : /\b(?:ucbrowser|uc)\b/
        }], ["chrome", / (?:chrome|crios|crmo)\/([0-9.]+)/], ["android", function (e) {
            return -1 !== e.indexOf("android") ? /\bversion\/([0-9.]+(?: beta)?)/ : void 0
        }], ["blackberry", function (e) {
            var t = e.match(h) || e.match(v) || e.match(m);
            return t ? {version: t[1]} : "blackberry"
        }], ["safari", /\bversion\/([0-9.]+(?: beta)?)(?: mobile(?:\/[a-z0-9]+)?)? safari\//], ["webview", /\bcpu(?: iphone)? os (?:[0-9._]+).+\bapplewebkit\b/], ["firefox", /\bfirefox\/([0-9.ab]+)/], ["nokia", /\bnokiabrowser\/([0-9.]+)/]], O = {
            name: "na",
            version: c
        }, S = function (e) {
            e = (e || "").toLowerCase();
            var t = {};
            u(e, _, function (e, r) {
                var n = parseFloat(r);
                t.device = {name: e, version: n, fullVersion: r}, t.device[e] = n
            }, t), u(e, y, function (e, r) {
                var n = parseFloat(r);
                t.os = {name: e, version: n, fullVersion: r}, t.os[e] = n
            }, t);
            var r = o(e);
            return u(e, w, function (e, n) {
                var i = n;
                r && (n = r.engineVersion || r.engineMode, i = r.engineMode);
                var o = parseFloat(n);
                t.engine = {
                    name: e,
                    version: o,
                    fullVersion: n,
                    mode: parseFloat(i),
                    fullMode: i,
                    compatible: r ? r.compatible : !1
                }, t.engine[e] = o
            }, t), u(e, x, function (e, n) {
                var i = n;
                r && ("ie" === e && (n = r.browserVersion), i = r.browserMode);
                var o = parseFloat(n);
                t.browser = {
                    name: e,
                    version: o,
                    fullVersion: n,
                    mode: parseFloat(i),
                    fullMode: i,
                    compatible: r ? r.compatible : !1
                }, t.browser[e] = o
            }, t), t
        };
        n = S(p + " " + l + " " + b)
    }();
    var i = Array.prototype, o = Function.prototype, s = Object.prototype, a = i.slice, u = s.toString, c = s.hasOwnProperty, f = window.navigator, d = window.document, p = f.userAgent, l = "1.3.4", b = "object" == typeof b ? b : {};
    b.info = function () {
        if (!e.para.show_log)return !1;
        if ("object" == typeof console && console.log)try {
            return console.log.apply(console, arguments)
        } catch (t) {
            console.log(arguments[0])
        }
    }, function () {
        var e = (o.bind, i.forEach), r = i.indexOf, n = Array.isArray, s = {}, f = t.each = function (t, r, n) {
            if (null == t)return !1;
            if (e && t.forEach === e)t.forEach(r, n); else if (t.length === +t.length) {
                for (var i = 0, o = t.length; o > i; i++)if (i in t && r.call(n, t[i], i, t) === s)return !1
            } else for (var a in t)if (c.call(t, a) && r.call(n, t[a], a, t) === s)return !1
        };
        t.extend = function (e) {
            return f(a.call(arguments, 1), function (t) {
                for (var r in t)void 0 !== t[r] && (e[r] = t[r])
            }), e
        }, t.coverExtend = function (e) {
            return f(a.call(arguments, 1), function (t) {
                for (var r in t)void 0 !== t[r] && void 0 === e[r] && (e[r] = t[r])
            }), e
        }, t.isArray = n || function (e) {
                return "[object Array]" === u.call(e)
            }, t.isFunction = function (e) {
            try {
                return /^\s*\bfunction\b/.test(e)
            } catch (t) {
                return !1
            }
        }, t.isArguments = function (e) {
            return !(!e || !c.call(e, "callee"))
        }, t.toArray = function (e) {
            return e ? e.toArray ? e.toArray() : t.isArray(e) ? a.call(e) : t.isArguments(e) ? a.call(e) : t.values(e) : []
        }, t.values = function (e) {
            var t = [];
            return null == e ? t : (f(e, function (e) {
                t[t.length] = e
            }), t)
        }, t.include = function (e, t) {
            var n = !1;
            return null == e ? n : r && e.indexOf === r ? -1 != e.indexOf(t) : (f(e, function (e) {
                return n || (n = e === t) ? s : void 0
            }), n)
        }, t.includes = function (e, t) {
            return -1 !== e.indexOf(t)
        }
    }(), t.inherit = function (e, t) {
        return e.prototype = new t, e.prototype.constructor = e, e.superclass = t.prototype, e
    }, t.isObject = function (e) {
        return "[object Object]" == u.call(e)
    }, t.isEmptyObject = function (e) {
        if (t.isObject(e)) {
            for (var r in e)if (c.call(e, r))return !1;
            return !0
        }
        return !1
    }, t.isUndefined = function (e) {
        return void 0 === e
    }, t.isString = function (e) {
        return "[object String]" == u.call(e)
    }, t.isDate = function (e) {
        return "[object Date]" == u.call(e)
    }, t.isBoolean = function (e) {
        return "[object Boolean]" == u.call(e)
    }, t.isNumber = function (e) {
        return "[object Number]" == u.call(e) && /[\d\.]+/.test(String(e))
    }, t.isJSONString = function (e) {
        try {
            JSON.parse(e)
        } catch (t) {
            return !1
        }
        return !0
    }, t.encodeDates = function (e) {
        return t.each(e, function (r, n) {
            t.isDate(r) ? e[n] = t.formatDate(r) : t.isObject(r) && (e[n] = t.encodeDates(r))
        }), e
    }, t.formatDate = function (e) {
        function t(e) {
            return 10 > e ? "0" + e : e
        }

        return e.getFullYear() + "-" + t(e.getMonth() + 1) + "-" + t(e.getDate()) + " " + t(e.getHours()) + ":" + t(e.getMinutes()) + ":" + t(e.getSeconds()) + "." + t(e.getMilliseconds())
    }, t.searchObjDate = function (e) {
        t.isObject(e) && t.each(e, function (r, n) {
            t.isObject(r) ? t.searchObjDate(e[n]) : t.isDate(r) && (e[n] = t.formatDate(r))
        })
    }, t.strip_sa_properties = function (e) {
        return t.isObject(e) ? (t.each(e, function (r, n) {
            if (t.isArray(r)) {
                var i = [];
                t.each(r, function (e) {
                    t.isString(e) ? i.push(e) : b.info("您的数据-", r, "的数组里的值必须是字符串,已经将其删除")
                }), 0 !== i.length ? e[n] = i : (delete e[n], b.info("已经删除空的数组"))
            }
            t.isString(r) || t.isNumber(r) || t.isDate(r) || t.isBoolean(r) || t.isArray(r) || (b.info("您的数据-", r, "-格式不满足要求，我们已经将其删除"), delete e[n])
        }), e) : e
    }, t.strip_empty_properties = function (e) {
        var r = {};
        return t.each(e, function (e, n) {
            t.isString(e) && e.length > 0 && (r[n] = e)
        }), r
    }, t.utf8Encode = function (e) {
        e = (e + "").replace(/\r\n/g, "\n").replace(/\r/g, "\n");
        var t, r, n, i = "", o = 0;
        for (t = r = 0, o = e.length, n = 0; o > n; n++) {
            var s = e.charCodeAt(n), a = null;
            128 > s ? r++ : a = s > 127 && 2048 > s ? String.fromCharCode(s >> 6 | 192, 63 & s | 128) : String.fromCharCode(s >> 12 | 224, s >> 6 & 63 | 128, 63 & s | 128), null !== a && (r > t && (i += e.substring(t, r)), i += a, t = r = n + 1)
        }
        return r > t && (i += e.substring(t, e.length)), i
    }, t.detector = n, t.base64Encode = function (e) {
        var r, n, i, o, s, a, u, c, f = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", d = 0, p = 0, l = "", b = [];
        if (!e)return e;
        e = t.utf8Encode(e);
        do r = e.charCodeAt(d++), n = e.charCodeAt(d++), i = e.charCodeAt(d++), c = r << 16 | n << 8 | i, o = c >> 18 & 63, s = c >> 12 & 63, a = c >> 6 & 63, u = 63 & c, b[p++] = f.charAt(o) + f.charAt(s) + f.charAt(a) + f.charAt(u); while (d < e.length);
        switch (l = b.join(""), e.length % 3) {
            case 1:
                l = l.slice(0, -2) + "==";
                break;
            case 2:
                l = l.slice(0, -1) + "="
        }
        return l
    }, t.UUID = function () {
        var e = function () {
            for (var e = 1 * new Date, t = 0; e == 1 * new Date;)t++;
            return e.toString(16) + t.toString(16)
        }, t = function () {
            return Math.random().toString(16).replace(".", "")
        }, r = function (e) {
            function t(e, t) {
                var r, n = 0;
                for (r = 0; r < t.length; r++)n |= o[r] << 8 * r;
                return e ^ n
            }

            var r, n, i = p, o = [], s = 0;
            for (r = 0; r < i.length; r++)n = i.charCodeAt(r), o.unshift(255 & n), o.length >= 4 && (s = t(s, o), o = []);
            return o.length > 0 && (s = t(s, o)), s.toString(16)
        };
        return function () {
            var n = (screen.height * screen.width).toString(16);
            return e() + "-" + t() + "-" + r() + "-" + n + "-" + e()
        }
    }(), t.getQueryParam = function (e, t) {
        t = t.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var r = "[\\?&]" + t + "=([^&#]*)", n = new RegExp(r), i = n.exec(e);
        return null === i || i && "string" != typeof i[1] && i[1].length ? "" : decodeURIComponent(i[1]).replace(/\+/g, " ")
    }, t.urlParse = function (e) {
        var t = function (e) {
            this._fields = {
                Username: 4,
                Password: 5,
                Port: 7,
                Protocol: 2,
                Host: 6,
                Path: 8,
                URL: 0,
                QueryString: 9,
                Fragment: 10
            }, this._values = {}, this._regex = null, this.version = .1, this._regex = /^((\w+):\/\/)?((\w+):?(\w+)?@)?([^\/\?:]+):?(\d+)?(\/?[^\?#]+)?\??([^#]+)?#?(\w*)/, "undefined" != typeof e && this._parse(e)
        };
        return t.prototype.setURL = function (e) {
            this._parse(e)
        }, t.prototype._initValues = function () {
            for (var e in this._fields)this._values[e] = ""
        }, t.prototype._parse = function (e) {
            this._initValues();
            var t = this._regex.exec(e);
            if (!t)throw"DPURLParser::_parse -> Invalid URL";
            for (var r in this._fields)"undefined" != typeof t[this._fields[r]] && (this._values[r] = t[this._fields[r]]);
            this._values.Hostname = this._values.Host.replace(/:\d+$/, ""), this._values.Origin = this._values.Protocol + "://" + this._values.Hostname
        }, new t(e)
    }, t.cookie = {
        get: function (e) {
            for (var t = e + "=", r = d.cookie.split(";"), n = 0; n < r.length; n++) {
                for (var i = r[n]; " " == i.charAt(0);)i = i.substring(1, i.length);
                if (0 == i.indexOf(t))return decodeURIComponent(i.substring(t.length, i.length))
            }
            return null
        }, set: function (t, r, n, i, o) {
            i = "undefined" == typeof i ? e.para.cross_subdomain : i;
            var s = "", a = "", u = "";
            if (n = "undefined" == typeof n ? 730 : n, i) {
                var c = d.location.hostname.match(/[a-z0-9][a-z0-9\-]+\.[a-z\.]{2,6}$/i), f = c ? c[0] : "";
                s = f ? "; domain=." + f : ""
            }
            if (0 !== n) {
                var p = new Date;
                "s" === String(n).slice(-1) ? p.setTime(p.getTime() + 1e3 * Number(String(n).slice(0, -1))) : p.setTime(p.getTime() + 24 * n * 60 * 60 * 1e3), a = "; expires=" + p.toGMTString()
            }
            o && (u = "; secure"), d.cookie = t + "=" + encodeURIComponent(r) + a + "; path=/" + s + u
        }, remove: function (r, n) {
            n = "undefined" == typeof n ? e.para.cross_subdomain : n, t.cookie.set(r, "", -1, n)
        }
    }, t.localStorage = {
        get: function (e) {
            return window.localStorage.getItem(e)
        }, parse: function (e) {
            var r;
            try {
                r = JSON.parse(t.localStorage.get(e)) || null
            } catch (n) {
            }
            return r
        }, set: function (e, t) {
            window.localStorage.setItem(e, t)
        }, remove: function (e) {
            window.localStorage.removeItem(e)
        }
    }, t.getQueryParam = function (e, t) {
        t = t.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var r = "[\\?&]" + t + "=([^&#]*)", n = new RegExp(r), i = n.exec(e);
        return null === i || i && "string" != typeof i[1] && i[1].length ? "" : decodeURIComponent(i[1]).replace(/\+/g, " ")
    }, t.xhr = function (e) {
        if (e) {
            var t = new XMLHttpRequest;
            return "withCredentials" in t ? t : "undefined" != typeof XDomainRequest ? new XDomainRequest : t
        }
        if (XMLHttpRequest)return new XMLHttpRequest;
        if (window.ActiveXObject)try {
            return new ActiveXObject("Msxml2.XMLHTTP")
        } catch (r) {
            try {
                return new ActiveXObject("Microsoft.XMLHTTP")
            } catch (r) {
            }
        }
    }, t.ajax = function (e) {
        function r(e) {
            try {
                return JSON.parse(e)
            } catch (t) {
                return {}
            }
        }

        var n = t.xhr(e.cors);
        if (e.type || (e.type = e.data ? "POST" : "GET"), e = t.extend({
                success: function () {
                }, error: function () {
                }
            }, e), n.onreadystatechange = function () {
                4 == n.readyState && (n.status >= 200 && n.status < 300 || 304 == n.status ? e.success(r(n.responseText)) : e.error(r(n.responseText)), n.onreadystatechange = null, n.onload = null)
            }, n.open(e.type, e.url, !0), n.withCredentials = !0, t.isObject(e.header))for (var i in e.header)n.setRequestHeader(i, e.header[i]);
        e.data && (n.setRequestHeader("X-Requested-With", "XMLHttpRequest"), "application/json" === e.contentType ? n.setRequestHeader("Content-type", "application/json; charset=UTF-8") : n.setRequestHeader("Content-type", "application/x-www-form-urlencoded")), n.send(e.data || null)
    }, t.info = {
        campaignParams: function () {
            var e = "utm_source utm_medium utm_campaign utm_content utm_term".split(" "), r = "", n = {};
            return t.each(e, function (e) {
                r = t.getQueryParam(location.href, e), r.length && (n[e] = r)
            }), n
        }, searchEngine: function (e) {
            return 0 === e.search("https?://(.*)google.([^/?]*)") ? "google" : 0 === e.search("https?://(.*)bing.com") ? "bing" : 0 === e.search("https?://(.*)yahoo.com") ? "yahoo" : 0 === e.search("https?://(.*)duckduckgo.com") ? "duckduckgo" : null
        }, browser: function (e, r, n) {
            var r = r || "";
            return n || t.includes(e, " OPR/") ? t.includes(e, "Mini") ? "Opera Mini" : "Opera" : /(BlackBerry|PlayBook|BB10)/i.test(e) ? "BlackBerry" : t.includes(e, "IEMobile") || t.includes(e, "WPDesktop") ? "Internet Explorer Mobile" : t.includes(e, "Edge") ? "Microsoft Edge" : t.includes(e, "FBIOS") ? "Facebook Mobile" : t.includes(e, "Chrome") ? "Chrome" : t.includes(e, "CriOS") ? "Chrome iOS" : t.includes(r, "Apple") ? t.includes(e, "Mobile") ? "Mobile Safari" : "Safari" : t.includes(e, "Android") ? "Android Mobile" : t.includes(e, "Konqueror") ? "Konqueror" : t.includes(e, "Firefox") ? "Firefox" : t.includes(e, "MSIE") || t.includes(e, "Trident/") ? "Internet Explorer" : t.includes(e, "Gecko") ? "Mozilla" : ""
        }, browserVersion: function (e, r, n) {
            var i = t.info.browser(e, r, n), o = {
                "Internet Explorer Mobile": /rv:(\d+(\.\d+)?)/,
                "Microsoft Edge": /Edge\/(\d+(\.\d+)?)/,
                Chrome: /Chrome\/(\d+(\.\d+)?)/,
                "Chrome iOS": /Chrome\/(\d+(\.\d+)?)/,
                Safari: /Version\/(\d+(\.\d+)?)/,
                "Mobile Safari": /Version\/(\d+(\.\d+)?)/,
                Opera: /(Opera|OPR)\/(\d+(\.\d+)?)/,
                Firefox: /Firefox\/(\d+(\.\d+)?)/,
                Konqueror: /Konqueror:(\d+(\.\d+)?)/,
                BlackBerry: /BlackBerry (\d+(\.\d+)?)/,
                "Android Mobile": /android\s(\d+(\.\d+)?)/,
                "Internet Explorer": /(rv:|MSIE )(\d+(\.\d+)?)/,
                Mozilla: /rv:(\d+(\.\d+)?)/
            }, s = o[i];
            if (void 0 == s)return null;
            var a = e.match(s);
            return a ? String(parseFloat(a[a.length - 2])) : null
        }, os: function () {
            var e = p;
            return /Windows/i.test(e) ? /Phone/.test(e) ? "Windows Mobile" : "Windows" : /(iPhone|iPad|iPod)/.test(e) ? "iOS" : /Android/.test(e) ? "Android" : /(BlackBerry|PlayBook|BB10)/i.test(e) ? "BlackBerry" : /Mac/i.test(e) ? "Mac OS X" : /Linux/.test(e) ? "Linux" : ""
        }, device: function (e) {
            return /iPad/.test(e) ? "iPad" : /iPod/i.test(e) ? "iPod" : /iPhone/i.test(e) ? "iPhone" : /(BlackBerry|PlayBook|BB10)/i.test(e) ? "BlackBerry" : /Windows Phone/i.test(e) ? "Windows Phone" : /Windows/i.test(e) ? "Windows" : /Macintosh/i.test(e) ? "Macintosh" : /Android/i.test(e) ? "Android" : /Linux/i.test(e) ? "Linux" : ""
        }, referringDomain: function (e) {
            var t = e.split("/");
            return t.length >= 3 ? t[2] : ""
        }, getBrowser: function () {
            return {_browser: n.browser.name, _browser_version: String(n.browser.version)}
        }, properties: function () {
            return t.extend(t.strip_empty_properties({
                $os: n.os.name,
                $model: n.device.name
            }), {
                _browser_engine: n.engine.name,
                $screen_height: screen.height,
                $screen_width: screen.width,
                $lib: "js",
                $lib_version: String(l)
            }, t.info.getBrowser())
        }, currentProps: {}, register: function (e) {
            t.extend(t.info.currentProps, e)
        }
    };
    var g = {};
    g.checkOption = {
        regChecks: {regName: /^((?!^distinct_id$|^original_id$|^time$|^properties$|^id$|^first_id$|^second_id$|^users$|^events$|^event$|^user_id$|^date$|^datetime$)[a-zA-Z_$][a-zA-Z\d_$]{0,99})$/i},
        checkPropertiesKey: function (e) {
            var r = this, n = !0;
            return t.each(e, function (e, t) {
                r.regChecks.regName.test(t) || (n = !1)
            }), n
        },
        check: function (e, t) {
            return "string" == typeof this[e] ? this[this[e]](t) : this[e](t)
        },
        str: function (e) {
            return t.isString(e) ? !0 : (b.info("请检查参数格式,必须是字符串"), !1)
        },
        properties: function (e) {
            return t.strip_sa_properties(e), e ? t.isObject(e) ? this.checkPropertiesKey(e) ? !0 : (b.info("properties里的key必须是由字符串数字_组成，且不能是系统保留字"), !1) : (b.info("properties可以没有，但有的话必须是对象"), !1) : !0
        },
        propertiesMust: function (e) {
            return t.strip_sa_properties(e), void 0 === e || !t.isObject(e) || t.isEmptyObject(e) ? (b.info("properties必须是对象且有值"), !1) : this.checkPropertiesKey(e) ? !0 : (b.info("properties里的key必须是由字符串数字_组成，且不能是系统保留字"), !1)
        },
        event: function (e) {
            return t.isString(e) && this.regChecks.regName.test(e) ? !0 : (b.info("请检查参数格式,必须是字符串,且eventName必须是字符串_开头,且不能是系统保留字"), !1)
        },
        test_id: "str",
        group_id: "str",
        distinct_id: function (e) {
            return t.isString(e) && /^.{1,255}$/.test(e) ? !0 : (b.info("distinct_id必须是不能为空，且小于255位的字符串"), !1)
        }
    }, g.check = function (e) {
        var t = !0;
        for (var r in e)if (!this.checkOption.check(r, e[r]))return !1;
        return t
    }, g.send = function (r) {
        var n = {distinct_id: h.getDistinctId(), properties: {}};
        t.extend(n, r), t.isObject(r.properties) && !t.isEmptyObject(r.properties) && t.extend(n.properties, r.properties), r.type && "profile" === r.type.slice(0, 7) || t.extend(n.properties, h.getProps(), h.getSessionProps(), t.info.currentProps, t.info.properties()), n.time = 1 * new Date, t.searchObjDate(n), b.info(n), e.para.debug_mode === !0 ? this.debugPath(JSON.stringify(n)) : this.serverPath(JSON.stringify(n))
    }, g.debugPath = function (r) {
        var n = "";
        n = -1 !== e.para.debug_mode_url.indexOf("?") ? e.para.debug_mode_url + "&data=" + encodeURIComponent(t.base64Encode(r)) : e.para.debug_mode_url + "?data=" + encodeURIComponent(t.base64Encode(r)), t.ajax({
            url: n,
            type: "GET",
            cors: !0,
            header: {"Dry-Run": String(e.para.debug_mode_upload)}
        })
    }, g.serverPath = function (r) {
        e.requestImg = new Image, e.requestImg.onload = e.requestImg.onerror = function () {
            e.requestImg && (e.requestImg.onload = null, e.requestImg.onerror = null, e.requestImg = null)
        }, -1 !== e.para.server_url.indexOf("?") ? e.requestImg.src = e.para.server_url + "&data=" + encodeURIComponent(t.base64Encode(r)) : e.requestImg.src = e.para.server_url + "?data=" + encodeURIComponent(t.base64Encode(r))
    };
    var h = e.store = {
        getProps: function () {
            return this._state.props
        }, getSessionProps: function () {
            return this._sessionState
        }, getDistinctId: function () {
            return this._state.distinct_id
        }, toState: function (e) {
            var t = null;
            return null !== e && "object" == typeof(t = JSON.parse(e)) ? (this._state = t, t.distinct_id) : null
        }, initSessionState: function () {
            var e = t.cookie.get("sensorsdata2015session"), r = null;
            null !== e && "object" == typeof(r = JSON.parse(e)) && (this._sessionState = r)
        }, setOnce: function (e, t) {
            e in this._state || this.set(e, t)
        }, set: function (e, t) {
            this._state[e] = t, this.save()
        }, change: function (e, t) {
            this._state[e] = t
        }, setSessionProps: function (e) {
            var r = this._sessionState;
            t.extend(r, e), this.sessionSave(r)
        }, setSessionPropsOnce: function (e) {
            var r = this._sessionState;
            t.coverExtend(r, e), this.sessionSave(r)
        }, setProps: function (e) {
            var r = this._state.props || {};
            t.extend(r, e), this.set("props", r)
        }, setPropsOnce: function (e) {
            var r = this._state.props || {};
            t.coverExtend(r, e), this.set("props", r)
        }, sessionSave: function (e) {
            this._sessionState = e, t.cookie.set("sensorsdata2015session", JSON.stringify(this._sessionState), 0)
        }, save: function () {
            e.para.cross_subdomain ? t.cookie.set("sensorsdata2015jssdkcross", JSON.stringify(this._state), 730, !0) : t.cookie.set("sensorsdata2015jssdk", JSON.stringify(this._state), 730, !1)
        }, _sessionState: {}, _state: {}, init: function () {
            var r = t.cookie.get("sensorsdata2015jssdk"), n = t.cookie.get("sensorsdata2015jssdkcross"), i = null;
            e.para.cross_subdomain ? (i = n, null !== r && (b.info("在根域且子域有值，删除子域的cookie"), t.cookie.remove("sensorsdata2015jssdk", !1), t.cookie.remove("sensorsdata2015jssdk", !0)), null === i && null !== r && (b.info("在根域且根域没值，子域有值，根域＝子域的值", r), i = r)) : (b.info("在子域"), i = r), this.initSessionState(), null !== i && this.toState(i) ? e.para.cross_subdomain && null === n && (b.info("在根域且根域没值，保存当前值到cookie中"), this.save()) : (b.info("没有值，set值"), this.set("distinct_id", t.UUID()))
        }
    }, v = {
        getUtm: function () {
            return t.info.campaignParams()
        }, getStayTime: function () {
            return (new Date - e._t) / 1e3
        }, setInitReferrer: function () {
            var r = d.referrer;
            e.setOnceProfile({_init_referrer: r, _init_referrer_domain: t.info.referringDomain(r)})
        }, setSessionReferrer: function () {
            var e = d.referrer;
            h.setSessionPropsOnce({_session_referrer: e, _session_referrer_domain: t.info.referringDomain(e)})
        }, setDefaultAttr: function () {
            t.info.register({
                _current_url: location.href,
                _referrer: d.referrer,
                _referring_domain: t.info.referringDomain(d.referrer)
            })
        }, cookie: function () {
        }
    };
    e.quick = function () {
        var t = Array.prototype.slice.call(arguments), r = t[0], n = t.slice(1);
        return "string" == typeof r && v[r] ? v[r].apply(e, n) : void("function" == typeof r ? r.apply(e, n) : b.info("quick方法中没有这个功能" + t[0]))
    }, e.track = function (e, t) {
        g.check({event: e, properties: t}) && g.send({type: "track", event: e, properties: t})
    }, e.setProfile = function (e) {
        g.check({propertiesMust: e}) && g.send({type: "profile_set", properties: e})
    }, e.setOnceProfile = function (e) {
        g.check({propertiesMust: e}) && g.send({type: "profile_set_once", properties: e})
    }, e.appendProfile = function (e) {
        g.check({propertiesMust: e}) && (t.each(e, function (r, n) {
            t.isString(r) ? e[n] = [r] : t.isArray(r) || (delete e[n], b.info("appendProfile属性的值必须是字符串或者数组"))
        }), t.isEmptyObject(e) || g.send({type: "profile_append", properties: e}))
    }, e.incrementProfile = function (e) {
        function r(e) {
            for (var t in e)if (!/-*\d+/.test(String(e[t])))return !1;
            return !0
        }

        var n = e;
        t.isString(e) && (e = {}, e[n] = 1), g.check({propertiesMust: e}) && (r(e) ? g.send({
            type: "profile_increment",
            properties: e
        }) : b.info("profile_increment的值只能是数字"))
    }, e.deleteProfile = function () {
        g.send({type: "profile_delete"}), h.set("distinct_id", t.UUID())
    }, e.unsetProfile = function (e) {
        var r = e, n = {};
        t.isString(e) && (e = [], e.push(r)), t.isArray(e) ? (t.each(e, function (e) {
            t.isString(e) ? n[e] = !0 : b.info("profile_unset给的数组里面的值必须时string,已经过滤掉", e)
        }), g.send({type: "profile_unset", properties: n})) : b.info("profile_unset的参数是数组")
    }, e.identify = function (e, r) {
        "undefined" == typeof e ? h.set("distinct_id", t.UUID()) : g.check({distinct_id: e}) ? r === !0 ? h.set("distinct_id", e) : h.change("distinct_id", e) : b.info("identify的参数必须是字符串")
    }, e.trackSignup = function (e, t, r) {
        g.check({distinct_id: e, event: t, properties: r}) && (g.send({
            original_id: h.getDistinctId(),
            distinct_id: e,
            type: "track_signup",
            event: t,
            properties: r
        }), h.set("distinct_id", e))
    }, e.trackAbtest = function (e, t) {
        g.check({test_id: e, group_id: t}) && g.send({type: "track_abtest", properties: {test_id: e, group_id: t}})
    }, e.registerPage = function (e) {
        g.check({properties: e}) ? t.extend(t.info.currentProps, e) : b.info("register输入的参数有误")
    }, e.register = function (e) {
        g.check({properties: e}) ? h.setProps(e) : b.info("register输入的参数有误")
    }, e.registerOnce = function (e) {
        g.check({properties: e}) ? h.setPropsOnce("props", e) : b.info("registerOnce输入的参数有误")
    }, e.registerSession = function (e) {
        g.check({properties: e}) ? h.setSessionProps(e) : b.info("registerSession输入的参数有误")
    }, e.registerSessionOnce = function (e) {
        g.check({properties: e}) ? h.setSessionPropsOnce(e) : b.info("registerSessionOnce输入的参数有误")
    }, e.init = function () {
        h.init(), t.each(e._q, function (t) {
            e[t[0]].apply(e, a.call(t[1]))
        })
    }, e.init()
}(window.sensorsDataAnalytic201505);
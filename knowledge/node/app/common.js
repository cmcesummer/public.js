const http = require("http");
const https = require("https");

/**
 * CONST
 */ 
const constDict = {
    PORT: 8080,
    PAGE_STATION: ['','http://www.baidu.com/'],
    ALLOW_ORIGIN_LIST : ["http://127.0.0.1:5500", "http://192.168.18.226:5500"],
    CACHE_CONTROL_MAX_AGE: 60 * 60 * 12
}

/**
 * 中间件
 */ 
const middleWareDict = {
    timeMiddle: async (ctx, next) => {
        const start = Date.now();
        await next();
        console.log("");
        console.log(`method: ${ctx.req.method}`);
        console.log(`pathname: ${ctx.req.url.pathname}`);
        console.log(`cookie: ${JSON.stringify(ctx.req.headers.cookie)}`);
        console.log(`use time: ${Date.now() - start} ms`);
        console.log(`now time: ${new Date().toLocaleString()} \n`);
    },
    cookieParse: async (ctx, next) => {
        const cookie = ctx.req.headers.cookie;
        const map = {};
        if(cookie) {
            const arr = cookie.split(';');
            for (let item of arr) {
                const itemArr = item.split('=');
                map[itemArr[0]] = itemArr[1]
            }
        } 
        ctx.req.headers.cookie = map;
        await next();
    },
    testCookie: async (ctx, next) => {
        const cookie = ctx.req.headers.cookie;
        if (cookie.psw === "123") {
            await next();
            return;
        }
        ctx.res.write("no cookie or cookie error");
        ctx.res.end();
    }
}

/**
 * 其他工具函数
 */ 
const utilDict = {
    promiseGet: url => {
        return new Promise((resolve, reject) => {

            https.get(url, res => {
                var html = "";
                res.on("data", data => {
                    html += data;
                });
                res.on("end", () => {
                    resolve(html);
                });
            }).on("error", _ => {
                reject(_);
            });
        });
    },
    originFactory: (origin, type) => {
        const dict = {
            "Access-Control-Allow-Origin": origin,
            "Access-Control-Allow-Methods": "GET, OPTIONS, POST",
            "Access-Control-Allow-Headers": "Content-Type, operator-id",
            "Access-Control-Allow-Credentials": true
        }
        if (type === 'OPTIONS') {
            dict["Access-Control-Max-Age"] = constDict.CACHE_CONTROL_MAX_AGE;
        }
        return dict
    }
}


module.exports = {
    constDict,
    middleWareDict,
    utilDict
}
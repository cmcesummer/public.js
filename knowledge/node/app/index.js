const http = require("http");
// const
const App = require("./app");

const app = new App(8080);

const PAGE_STATION = [
    'http://www.weather.com.cn/',
    'http://www.baidu.com/'
]

const timeMiddle = async (ctx, next) => {
    const start = Date.now();
    await next();
    console.log("");
    console.log(`method: ${ctx.req.method}`);
    console.log(`pathname: ${ctx.req.url.pathname}`);
    console.log(`use time: ${Date.now() - start} ms`);
    console.log(`now: ${new Date().toLocaleString()} \n`);
};

const testQuery = async (ctx, next) => {
    const query = ctx.req.url.query;
    if (query.psw === "123") {
        await next();
        return;
    }
    ctx.res.write("error");
    ctx.res.end();
};

const promiseGet = function(url) {
    return new Promise((resolve, reject) => {
        http.get(url, res => {
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
};

app.get("/name", [timeMiddle, testQuery], async ctx => {
    const page = ctx.req.url.query.page;
    const path = PAGE_STATION[page];
    if(path) {
        const reslut = await promiseGet(path);
        ctx.res.write(reslut);
        return
    } 
    ctx.res.write('55555555555555');
});

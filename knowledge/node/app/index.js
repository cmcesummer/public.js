const paths = require("path");
const fs = require("fs");
const util = require("util");

const App = require("./app");
const { constDict, middleWareDict, utilDict } = require("./common");
const { PORT, PAGE_STATION, ALLOW_ORIGIN_LIST } = constDict;
const { timeMiddle, testCookie, cookieParse } = middleWareDict;
const { promiseGet, originFactory } = utilDict

const readFilePro = util.promisify(fs.readFile);

const app = new App(PORT, port => {
    console.log(`listen at http://127.0.0.1:${port}/`)
});

let post_api_call_num = 0;

app.get('/', [timeMiddle, cookieParse], async ctx => {
    const file = await readFilePro(paths.join(__dirname, './index.html'), 'utf-8');
    ctx.res.write(file);
    return
})

app.get("/name", [timeMiddle, cookieParse, testCookie], async ctx => {
    const page = ctx.req.url.query.page;
    const path = PAGE_STATION[page];
    if(page === void 0) {
        const file = await readFilePro(paths.join(__dirname, './index.html'), 'utf-8');
        ctx.res.write(file);
        return
    }
    if(path) {
        const reslut = await promiseGet(path);
        ctx.res.write(reslut);
        return
    } 
    ctx.res.write('55555555555555');
});

// 非普通请求使用
app.options("/api", async ctx => {
    const origin = ctx.req.headers.origin;
    if(~ALLOW_ORIGIN_LIST.indexOf(origin)) {
        ctx.res.writeHead(200, originFactory(origin, 'OPTIONS'));
        ctx.res.end();
    }
})

app.post("/api", [timeMiddle], async ctx => {
    const origin = ctx.req.headers.origin;
    const contextType = ctx.req.headers['content-type'];
    if(!~ALLOW_ORIGIN_LIST.indexOf(origin) && origin != `http://127.0.0.1:${PORT}`) {
        ctx.res.end();
        return
    }
    let resHeader = {};
    if(origin != `http://127.0.0.1:${PORT}`) {
        resHeader = originFactory(origin, 'POST')
    }
    if(contextType) {
        post_api_call_num++;
        resHeader = {...resHeader, 'Content-type': contextType, 'Set-Cookie': [`post_api_call_num=${post_api_call_num};path=/api`]}
        ctx.res.writeHead(200, resHeader);
    }
    const body =  ctx.req.body;
    const reqObj = {
        CODE: 200,
        DATA: { cluster: "dev", return: body, created: false },
        MSG: "success"
    };
    ctx.res.write(JSON.stringify(reqObj));
    ctx.res.end();
})

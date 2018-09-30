const http = require('http');
const url = require('url');
const queryString = require('querystring');
const EventEmitter = require('events').EventEmitter;

const event = new EventEmitter();

const middleWareDispatchFactory = (middleWare, ctx) => {
    function dispatch(index) {
        if(index === middleWare.length) return;
        const fn = middleWare[index];
        return Promise.resolve().then(_ => fn(ctx, () => dispatch(++index))) 
    }
    return dispatch(0)
}

module.exports = class App {
    constructor(port) {
        http.createServer(function(req, res) {
            const urlMap =url.parse(req.url) ;
            const path = urlMap.pathname;
            const method = req.method;
            const query = queryString.parse(urlMap.query);
            const ctx = {
                req: {...req, url: {...urlMap, query} },
                res
            }
            // 事件触发：
            event.emit(`${method}_${path}`, ctx);
        }).listen(port, function() {
            console.log(`listen at ${port}`)
            console.log(`listen at http://127.0.0.1:${port}/name?psw=123&page=`)
        })
    }

    get(path, middleWare = [], cb = _ => {}) {
        event.on(`GET_${path}`, async ctx => {
            if(typeof middleWare === 'function') middleWare = [middleWare]
            else middleWare.push(cb) 
            await middleWareDispatchFactory(middleWare, ctx);
            ctx.res.end();
        })
    }

    post(path, middleWare = [], cb = _ => {}) {
        event.on(`POST_${path}`, async ctx => {
            if(typeof middleWare === 'function') middleWare = [middleWare]
            else middleWare.push(cb) 

            // 接收 body
            let postBody = '';
            ctx.req.on('data', chunk => {
                postBody += chunk;
            });
            ctx.req.on('end', async _ => {
                ctx.req.body = queryString.parse(postBody);
                await middleWareDispatchFactory(middleWare, ctx);
                ctx.res.end();
            })
        })
    }
}
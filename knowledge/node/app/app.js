const http = require('http');
const url = require('url');
const queryString = require('querystring');
const EventEmitter = require('events').EventEmitter;

const event = new EventEmitter();

const middleWareDispatchFactory = (middleWare, ctx) => {
    function dispatch(index) {
        if(index === middleWare.length) return;
        const fn = middleWare[index];
        return Promise.resolve().then(_ => fn(ctx, () => dispatch(++index))).catch(_ => console.log(_)) 
    }
    return dispatch(0)
}

module.exports = class App {
    constructor(port, cb = _ => {}) {
        http.createServer(function(req, res) {
            const urlMap =url.parse(req.url) ;
            const path = urlMap.pathname;
            const method = req.method;
            const query = queryString.parse(urlMap.query);
            req.url= { ...urlMap, query }
            const ctx = { req, res }
            // 事件触发：
            event.emit(`${method}_${path}`, ctx);
        }).listen(port, function() {
            cb(port);
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

    options(path, middleWare = [], cb = _ => {}) {
        event.on(`OPTIONS_${path}`, async ctx => {
            if(typeof middleWare === 'function') middleWare = [middleWare]
            else middleWare.push(cb) 
            await middleWareDispatchFactory(middleWare, ctx);
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
                let fn ;
                if(postBody.startsWith('{') && postBody.endsWith('}')) {
                    fn = JSON.parse;
                } else {
                    fn = queryString.parse;
                }
                ctx.req.body = fn(postBody);
                await middleWareDispatchFactory(middleWare, ctx);
            })
        })
    }
}
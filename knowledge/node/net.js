const http = require("http");
const URL = require("url");
const fs = require("fs");
const path = require("path");
const querystring = require("querystring");
var util = require("util");

const AllowOriginList = ["http://127.0.0.1:7001", "http://localhost:7001"]; // 再拓展其他白名单域名 防止csrf

http.createServer(function(req, res) {
    const url = URL.parse(req.url);
    const origin = req.headers.origin;
    console.log(
        `
        pathname: ${url.pathname},
        method: ${req.method},
        origin: ${origin},
        header: ${req.headers.cookie}
    `
    );

    if (url.pathname == "/test") {
        const reqObj = {
            code: 200,
            data: { cluster: "dev", return: "this is GET method", created: false },
            desc: "success"
        };
        if (req.method == "GET") {
            if (~AllowOriginList.indexOf(origin)) {
                res.writeHead(200, {
                    "Content-type": "application/json",
                    "Access-Control-Allow-Origin": origin,
                    "Access-Control-Allow-Methods": "GET, OPTIONS, POST",
                    "Access-Control-Allow-Headers": "Content-Type"
                });
                res.write(JSON.stringify(reqObj));
                res.end();
            }
        } else if (req.method == "POST") {
            let post = "";

            // 通过req的data事件监听函数，每当接受到请求体的数据，就累加到post变量中
            req.on("data", function(chunk) {
                post += chunk;
            });

            // 在end事件触发后，通过querystring.parse将post解析为真正的POST请求格式，然后向客户端返回。
            req.on("end", function() {
                post = querystring.parse(post);
                if (~AllowOriginList.indexOf(origin)) {
                    res.writeHead(200, {
                        "Content-type": "application/json",
                        "Access-Control-Allow-Origin": origin,
                        "Access-Control-Allow-Methods": "GET, OPTIONS, POST",
                        "Access-Control-Allow-Headers": "Content-Type",
                        "Access-Control-Allow-Credentials": true
                    });
                    reqObj.data.return = post;
                    res.write(JSON.stringify(reqObj));
                    res.end();
                }
            });
        }
    } else if (url.pathname == "/page") {
        fs.readFile(path.join(__dirname, "./index.html"), (err, data) => {
            if (err) return false;
            res.writeHead(200, {
                "Content-type": "text/html"
            });

            res.write(data);
            res.end();
        });
    }
}).listen(8000, _ => {
    console.log(8000);
});

var net = require("net");
var textChunk = "";
var server = net.createServer(function(socket) {
    console.log(Date.now());
    console.log("createServer");
    socket.write("Echo server111\r\n");
    // Promise.resolve().then(() => {
    //     socket.write("Echo server222\r\n");
    // });
    socket.on("data", function(data) {
        console.log(Date.now());
        console.log(data);
        textChunk = data.toString("utf8");
        console.log(textChunk);
        console.log(Date.now());
        socket.write(textChunk);
    });
});
server.listen(52275, "127.0.0.1");

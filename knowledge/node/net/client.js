var net = require("net");
var client = new net.Socket();
client.connect(52275, "127.0.0.1", function() {
    console.log(Date.now());
    console.log("Connected");
    client.write("Hello, server! Love, Client.");
});
var i = 0;
client.on("data", function(data) {
    console.log("Received: " + data);
});
setTimeout(() => {
    client.destroy();
}, 2000);
client.on("close", function() {
    console.log("Connection closed");
});

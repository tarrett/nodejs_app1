var http = require ('http');
var net = require ('net');

var connectionCount = 0;
var server = http.createServer(function(req, res) {
    connectionCount++;

    console.log ("number of connections on " + process.pid + " is: " + connectionCount);

    res.writeHead(200, {"Content-Type": "text/plain", "Connection": "close"});
    res.end("hello, world!");
    res.on("finish", function() {
        connectionCount--;
        console.log ("number of connections on " + process.pid + " is: " + connectionCount);
    }).on("close", function() {
        connectionCount--;
        console.log ("number of connections on " + process.pid + " is: " + connectionCount);
    });
});

console.log ("web server started on: " + process.pid);

process.on("message", function(msg, socket) {
    process.nextTick(function() {
        if(msg == 'c' && socket){
            socket.readable = socket.writable = true;
            socket.resume ();
            
            socket.server = server;
            server.emit("connection", socket);
            
            socket.emit("connect");
        }
    });
});
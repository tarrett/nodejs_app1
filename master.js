/*
 * reference: http://www.cnblogs.com/tingshuo/archive/2013/01/17/2864280.html
 */

var net = require("net");
var cp = require ("child_process");
var cpuNum = require ('os').cpus().length;

var workers = [];

/* create workers */
for (var i = 0; i < cpuNum; ++i){
    workers.push(cp.fork('worker.js', ['normal']));
}

console.log("create " + cpuNum + " worker processes");

net.createServer (function(s){
    s.pause();
    console.log ("a connection is coming in");
    var worker = workers.shift();
    worker.send ('c', s, [{"track": false, "process": false}]);
    workers.push(worker);
}).listen(8080);


var http = require ("http");

var myPubSub = require ("./mypubsub");

var server = http.createServer(function (req, res){
    res.write("Hello!");
    res.end();
});

server.listen(3000);
console.log("sever is listening on port 3000");

//var person = Object.create (Object.prototype);

console.log ('hello world!');

var messageLogger = function (topic, args){
    console.log ("Logging: " + topic + ": " + args.toString());
}

var sub1 = myPubSub.subscribe ("inbox/message", messageLogger);
var sub2 = myPubSub.subscribe ("outbox/message", messageLogger);

var sub3 = myPubSub.subscribe ("inbox/message", messageLogger);

//pubsub.publish ("inbox/message", "ddddddddddddddddddddd");

myPubSub.unsubscribe (sub1);
myPubSub.publish("inbox/message", "only one");
myPubSub.publish("outbox/message", {sender: "tantian@google.com", body:"ddddddddddddddddddd"});
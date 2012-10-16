// This file contains the core server logic required to serve the regression run website as well as providing real time updates across clients.

var html = require('fs').readFileSync(__dirname+'/client.html');
var server = require('http').createServer(function(req, res){
  res.end(html);
});
server.listen(8080);

var nowjs = require("now");
var everyone = nowjs.initialize(server);

/* Example code to send updates using nowjs
everyone.now.distributeMessage = function(message){
  everyone.now.receiveMessage(this.now.name, message);
};
//*/
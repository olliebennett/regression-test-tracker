// This file contains the core server logic required to serve the regression run website as well as providing real time updates across clients.
var express = require('express'),
	fs = require('fs');
	
var indexPage = fs.readFileSync(__dirname+'/public/client.html');
	
	
var server = require('http').createServer(function(req, res){

	console.log('Starting server on port ' + options.port);
	
	var server = express.createServer(
            express.static('/public')),
			express.staticCache(),
            express.router(function(app) {
				app.get('/*', function(req, res, next) {
					res.end(indexPage);
				});
			})
        ).listen(options.port);
	
	if (req === "sadf"){
		console.log("asdf");
	}else{
		console.log("unknown request - serving index page");
		res.end(indexPage);
	}
});
server.listen(8080);

var nowjs = require("now");
var everyone = nowjs.initialize(server);

/* Example code to send updates using nowjs
everyone.now.distributeMessage = function(message){
  everyone.now.receiveMessage(this.now.name, message);
};
//*/
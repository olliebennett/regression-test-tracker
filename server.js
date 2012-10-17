// This file contains the core server logic required to serve the regression run website as well as providing real time updates across clients.
var fs = require('fs')

var html = fs.readFileSync(__dirname+'/public/client.html');
	
var server = require('http').createServer(function(req, res){

	console.log("unknown request - serving index page");
	res.end(html);

});
server.listen(8080);

var nowjs = require("now");
var everyone = nowjs.initialize(server);

// Set up an array of users to be synced across the clients
everyone.now.users = [];

// Set up a 2D array to represent the values in the spreadsheet
everyone.now.table = [[]];

/* Example code to send updates using nowjs
everyone.now.distributeMessage = function(message){
  everyone.now.receiveMessage(this.now.name, message);
};
//*/
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

//function to add a column to the table
everyone.now.addColumn = function(columnName){
	//TODO server logic
	
	//tell clients to update their tables
	
}

//function can be called from the clients to add a user.
everyone.now.addUser = function(name){

	//if user already exists then tell him to choose a new name
	if(everyone.now.users.indexOf(name) !== -1){
		console.log("Cannot add duplicate user " + name);
		this.now.notifyDuplicateUser();
	}else{
		console.log("Adding user " + name);
		
		//add new user to the array
		everyone.now.users.push(name);
		
		//call client side logic to update the list of online users
		everyone.now.updateUsers();
	}
};

//function can be called from the clients to remove a user.
//TODO - security issue - should only remove one self
everyone.now.removeUser = function(name){
	var index = everyone.now.users.indexOf(name);
	
	if (index === -1){
		console.log("Cannot remove user " + name + " - he does not exist");
		this.now.notifyUnknownUser();
	}else{
		console.log("Removing user " + name);
		
		//remove user from the array
		everyone.now.users.splice(everyone.now.users.indexOf(name),1);
		
		//call client side logic to update the list of online users
		everyone.now.updateUsers();
	}
};








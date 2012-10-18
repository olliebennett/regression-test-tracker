// This file contains the core server logic required to serve the regression run website as well as providing real time updates across clients.
var fs = require('fs'),
	express = require('express'),
	nowjs = require("now");


//set up server
var app = express();
var server = app.listen(8080);
var homePage = fs.readFileSync(__dirname+'/public/client.html');
var homejs = fs.readFileSync(__dirname+'/public/client.js');
var jquery = fs.readFileSync(__dirname+'/public/jquery.min.js');
var css = fs.readFileSync(__dirname+'/public/client.css');
app.get('/', function(req, res){
  res.end(homePage);
});

app.get('/public/client.js', function(req, res){
  res.end(homejs);
});

app.get('/public/jquery.js', function(req, res){
  res.end(jquery);
});

app.get('/public/client.css', function(req, res){
  res.end(css);
});

//end of server

var everyone = nowjs.initialize(server);

// Set up an array of users to be synced across the clients
everyone.now.users = [];

// Set up a 2D array to represent the values in the spreadsheet
everyone.now.table = [];
everyone.now.table[0] = [];

//function to add a column to the table
everyone.now.addColumn = function(index, columnName){
	
	var len = everyone.now.table[0].length;
	console.log("columns in table = " + len);
	
	//add column to top row of table at specified index
	if(len > 0){
		everyone.now.table[0].push(columnName);
		//TODO - send to specified index, not just the last column
	}else{
		everyone.now.table[0][0] = columnName;
	}
	
	//tell clients to update their table
	everyone.now.updateTable();
	
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





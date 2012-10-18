now.updateUsers = function(){
	console.log(now.users);
	renderUsers(now.users);

};

now.updateTable = function(){
	console.log("TODO - updating table");
	//TODO logic
	console.log(now.table);

};

now.notifyDuplicateUser = function(){
	console.log("Unable to add duplicate user");
};

now.notifyUnknownUser = function(){
	console.log("Cannot remove user - he does not exist");
};

function renderUsers(users) {
	var i;
	
	for (i=0; i<users.length; i++) {
		if (users[i] !== undefined) {
			$('ul#userlist')
				.append($('<li>')
					.text("User["+i+"] is " + users[i])
				);
		}
	}
}
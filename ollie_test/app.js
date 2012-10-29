
// Module dependencies
var express = require('express');

// Initialize app
var app = express();

// Configure views
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

// Logging
app.use(express.logger('dev'));
//app.use(express.errorHandler());

// Pretty HTML!
app.locals.pretty = true;

// Serve static content from '/public' folder.
app.use(express.static(__dirname + '/public'));

// Main (index) page
app.get('/', function (req, res) {
  res.render('index',
    { title : 'Home' }
  );
});

// View Tests
app.get('/tests', function (req, res) {
  res.render('tests',
    { title : 'Tests' }
  );
});

// Settings
app.get('/settings', function (req, res) {
  res.render('settings',
    { title : 'Settings' }
  );
});

// Save user edits
app.post('/save', function (req, res) {
  
  // Authenticate user
  console.log('TODO - User authenticated');
  
  console.log("connection.bytesRead:");
  console.log(req.connection.bytesRead);
  
  console.log("route.path:");
  console.log(req.route.path);
  
  // TODO - how do I access the POST data?!
  console.log("req:");
  //console.log(req);
  
  // Process and save updated data
  var success;
  var updatetext;
  if (true) {
    success = true; // Database updated
    console.log('TODO - Database updated.');
    updatetext = 'Saved text: blah'; 
  } else {
    success = false; // Update failed.
    console.log('TODO - Save failed');
    updatetext = 'Save failed... sorry!';
  }
  
  // Send response to client
  res.render('save',
    {
      success     : success,
      updatetext  : updatetext
    }
  );
  
  // Send response to all connected clients.
  console.log('TODO - Sending data to all clients');
});

// Listen on port 80.
app.listen(80);

console.log("Server started.");

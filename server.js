// Require Node Modules

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var bluebird = require('bluebird');
var path = require('path');
var routes = require('./routes');

// Instantiation

var PORT = process.env.PORT || 3001;
mongoose.Promise = bluebird;
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve up static assets if in production (running on Heroku)
app.use(routes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// enable CORS, use:
// https://enable-cors.org/server_expressjs.html
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next();
});


// app.use(router);

// Database Configuration with Mongoose

var databaseUri = "mongodb://localhost/MongoNewsScraper";

if (process.env.MONGODB_URI) {
	mongoose.connect(process.env.MONGODB_URI);	
} else {
	mongoose.connect(databaseUri)
}


var db = mongoose.connection;

db.on("error", function(error) {
	console.log("Mongoose Error: ", error);
});

db.once("open", function() {
	console.log("Mongoose connection successful.");
});

// Start the server
app.listen(PORT, function() {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
// Require Node Modules

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// Instantiation

var port = process.env.PORT || 3000;
var app = express();

// Database Configuration with Mongoose


mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/MongoNewsScraper" );
var db = mongoose.connection;

db.on("error", function(error) {
	console.log("Mongoose Error: ", error);
});

db.once("open", function() {
	console.log("Mongoose connection successful.");
});

app.listen(port, function() {
	console.log("App running on port!")
})

var router = require('./controllers/controller.js');
app.use('/', router);
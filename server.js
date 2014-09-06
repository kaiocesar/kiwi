// server.js

// bootstrap libs
var fs = require('fs');
var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var config = require('./config/config');

var app = express();
var port = process.env.PORT || 1337;



// Connect mongoose
var connect = function() {
	var options = { server: { socketOptions: {keepAlive: 1} } };
		mongoose.connect(config.db, options);
};

connect();

mongoose.connection.on('error', console.log);
mongoose.connection.on('disconnected', connect);


fs.readdirSync(__dirname + '/app/models').forEach(function(file){
	if (/\.js$/.test(file))
		require(__dirname + '/app/models/' + file);
});

require('./config/passport')(passport, config);
require('./config/express')(app, passport);
require('./config/routes')(app, passport);

app.listen(port);


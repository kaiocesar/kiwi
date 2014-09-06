// ./config/config.js

var path = require('path');
var extend = require('util')._extend;

var development = require('./env/development.js');
var production = require('./env/production.js');

// var notifier = {
// 	service: 'postmark',
// 	APN : false,
// 	email : true,
// 	actions : ['comment'],
// 	tplPath: path.normalize(__dirname + "/../app/mailer/templates"),
// 	key : 'POSTMARK_KEY'
// };

var defaults = {
	root : path.normalize(__dirname + "/.."),
	// notifier  : notifier
};


module.exports = {
	development : extend(development, defaults),
	production : extend(production, defaults)
}[process.env.NODE_ENV || 'development'];
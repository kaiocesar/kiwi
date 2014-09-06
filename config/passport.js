// .config/passport.js


var mongoose  = require('mongoose');
var LocalStrategy = require('passport-local').Strategy;
var User = mongoose.model('User');

var local = require('./passport/local');


module.exports = function (passport, config) {
	passport.serializeUser(function(user, done){
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done){
		User.findOne({_id: id}, function(err, user){
			done(err, user);
		});
	});

	passport.use(local);
};
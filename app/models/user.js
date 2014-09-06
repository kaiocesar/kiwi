// ./app/models/user.js

// Module dependencies
var mongoose = require('mongoose');
var crypto = require('crypto');

var Schema = mongoose.Schema;


// User Schema

var UserSchema = new Schema({
	name : {type: String, default: ''},
	email : {type: String, default: ''},
	username : {type: String, default: ''},
	provider : {type: String, default: ''},
	hashed_password : {type: String, default: ''},
	salt : {type: String, default: ''},
	authToken : {type: String, default: ''}
});

// virtuals
UserSchema
	.virtual('password')
	.set(function(password){
		this._password = password;
		this.salt = this.makeSalt();
		this.hashed_password = this.encryptPassword(password);
	})
	.get(function() {
		return this.__password;
	});

// validations
var validatePresenceOf = function(value) {
	return value && value.length;
};
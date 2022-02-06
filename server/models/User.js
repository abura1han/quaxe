const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const User = new Schema({
	avatar: {
		type: String,
		trim: true,
		default: "NULL"
	},
	userName: {
		type: String,
		trim: true,
		maxlength: 100,
	},
	name: {
		type: String,
		trim: true,
		maxlength: 100,
	},
	email: {
		type: String,
		trim: true,
		maxlength: 60,
	},
	address: {
		type: String,
		trim: true,
		maxlength: 80,
	},
	bio: {
		type: String,
		trim: true,
		maxlength: 400,
	},
	password: {
		type: String,
		trim: true,
		maxlength: 60,
	},
},
	{ timestamps: true });

module.exports = mongoose.model("User", User);
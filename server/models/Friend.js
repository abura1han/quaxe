const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Friend = new Schema({
	owener: {
		type: ObjectId,
		ref: "User",
	},
	friends: [{
		type: ObjectId,
		ref: "User",
	}],
});

module.exports = mongoose.model("Friend", Friend);
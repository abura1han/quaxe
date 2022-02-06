const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Message = new Schema({
	sentBy: {
		type: ObjectId,
		required: true,
		ref: "User",
	},
	sentTo: {
		type: ObjectId,
		required: true,
		ref: "User",
	},
	message: {
		type: String,
		required: true,
	},
}, { timestamps: true });

module.exports = mongoose.model("Message", Message);
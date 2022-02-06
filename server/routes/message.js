const Message = require('../models/Message');
const { validationResult } = require('express-validator');
const isAuthorized = require('../utils/isAuthorize');

// Get all messages of current logged in user
const getAllMessages = async (req, res) => {
	try {
		const messages = await Message.find({ $or: [{ sentBy: req.User._id }, { sentTo: req.User._id }] }, { __v: 0, _id: 0 });
		res.status(200).json({ success: true, data: messages });
	} catch (error) {
		console.error(error);
		res.status(500).json({ success: false, error: "Server error" });
	}
}

// Create new message
const createMessage = async (req, res) => {
	try {
		// Message validation result
		const isValid = isAuthorized(validationResult(req));
		if (!isValid) {
			return res.status(400).json({ success: false, error: isValid });
		}

		const message = await Message.create({
			sentBy: user.User._id,
			sentTo: req.body.sentTo,
			message: req.body.message,
		})

		await message.save();

		res.status(200).json({ success: true, message: "New message added", data: message });
	} catch (error) {
		console.error(error)
		res.status(500).json({ success: false, error: error });
	}
}

module.exports = { getAllMessages, createMessage }
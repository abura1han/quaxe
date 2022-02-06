const { body } = require('express-validator');

const createMessageValidator = [
	body('sentTo').not().isEmpty().withMessage("Message reciver is required"),
	body('message').not().isEmpty().withMessage("Message is required"),
]

module.exports = { createMessageValidator }
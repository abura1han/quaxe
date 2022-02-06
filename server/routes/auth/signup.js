const bcrypt = require('bcrypt');
const User = require('../../models/User');
const { expValidation } = require('../../utils/validationCheck');
const { validationResult } = require('express-validator');

const signupController = async (req, res) => {
	const {
		user_name,
		name,
		email,
		address,
		password,
	} = req.body;

	try {
		// Check validation
		const isValid = expValidation(validationResult(req));
		if (isValid) {
			return res.status(400).json({ success: false, error: isValid });
		}

		// Hash password
		const hashedPass = await bcrypt.hash(password, 11);

		// Create user
		const user = await User.create({
			userName: user_name, name, email, address, password: hashedPass,
		});
		// await user.save();

		res.status(200).json({ success: true, message: "signup successful" });

	} catch (error) {
		console.log(error);
		res.status(500).json({ success: false, error: "Server error" });
	}
}

module.exports = { signupController };
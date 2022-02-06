const User = require('../models/User');
const Friend = require('../models/Friend');
const bcrypt = require('bcrypt');

//
// Get all users without current logged in user
// 
const getAllUsers = async (req, res) => {
	try {
		let users = await User.find({ _id: { $ne: req.User._id } }, { password: 0 }).limit(25);

		res.status(200).json({ success: true, data: users });
	} catch (error) {
		console.error(error);
		res.status(500).json({ success: false, error: "Server error" });
	}
}

//
// Get current user profile
// 
const getMyInfoController = async (req, res) => {
	try {
		res.status(200).json({ success: true, data: req.User });
	} catch (error) {
		console.error(error);
		res.status(500).json({ success: false, error: "Server error" });
	}
}

//
// Edit profile
// 
const editProfileController = async (req, res) => {
	const {
		user_name: userName,
		name,
		email,
		bio,
		address,
		job,
		password,
		new_password
	} = req.body;

	try {
		// If userName exist
		if (userName) {
			const isUNExist = await User.findOne({ userName });
			if (isUNExist && req.User.userName !== isUNExist.userName) {
				return res.status(400).json({ success: false, error: "User name taken" });
			}
		}
		// If email exist
		if (email) {
			const isEExist = await User.findOne({ email });
			if (isEExist && req.User.email !== isEExist.email) {
				return res.status(400).json({ success: false, error: "Email already exist" });
			}
		}

		// If password exist, validation and hash
		if (password && new_password) {
			const user = await User.findById(req.User._id);
			console.log(user)
			const isValidPass = await bcrypt.compare(password, user.password);

			if (!isValidPass) {
				return res.status(400).json({ success: false, error: "Incorrect password" });
			}
		}

		let hashPass;
		if (password && new_password) {
			hashPass = await bcrypt.hash(new_password, 11);
		}

		const user = await User.findByIdAndUpdate(req.User._id, { $set: { userName, name, email, bio, address, job, password: hashPass } }, { new: true, })

		user.password = "Your given password";

		res.status(200).json({ success: true, data: user });
	} catch (error) {
		console.error(error);
		res.status(500).json({ success: false, error: "Server error" });
	}
}

module.exports = { getMyInfoController, editProfileController, getAllUsers };
const { body } = require('express-validator');
const User = require('../models/User');

let USER;
const signupValidator = [
	body('name').not().isEmpty().withMessage("Name is required"),
	body('user_name').not().isEmpty().withMessage("User name is required")
		.custom(async value => {
			const user = await User.findOne({ userName: value });

			if (user && user.userName === value) {
				USER = user;
				throw new Error(`User already exist with user name ${value}`);
			}

			return true;
		}),
	body('email').not().isEmpty().withMessage("Email is required")
		.custom(async value => {
			if (!USER) {
				USER = await User.findOne({ email: value });
				if (USER && USER.email === value) {
					throw new Error(`Email already exist with email ${value}`);
				}

				return true;
			}

			if (USER && USER.email === value) {
				throw new Error(`Email already exist with email ${value}`);
			};

			return true;

		}),
	body('address').not().isEmpty().withMessage("Address is required"),
	body('password').not().isEmpty().withMessage("Password is required"),
]

const loginValidator = [
	body('email').not().isEmpty().withMessage("Email is required"),
	body('password').not().isEmpty().withMessage("Password is required"),
]


module.exports = { signupValidator, loginValidator };
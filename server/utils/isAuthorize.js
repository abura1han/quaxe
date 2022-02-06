require('dotenv').config();

const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Token check middleware
const isAuthorized = async (req, res, next) => {
	const { authorization } = req.headers;
	try {
		// If authorization token not provided
		if (!authorization) {
			return res.status(401).json({ success: false, error: "Unauthorized access blocked" });
		}

		const token = authorization.split(' ');
		if (!token.length > 0) {
			return res.status(401).json({ success: false, error: "Unauthorized access blocked" });
		}

		// Verify access token
		const { USER } = await jwt.verify(token[1], process.env.ACCESS_TOKEN_SECTETE);

		// Find the user wit decoded id
		const user = await User.findOne({ userName: USER }, { password: 0, __v: 0 });
		if (!user) {
			console.log(user);
			return res.status(400).json({ success: false, error: "Invalid token" });
		}

		// Bind user to req
		req.User = user;
		next();

	} catch (err) {
		// If token expired
		if (err.name === 'TokenExpiredError') {
			return res.status(403).json({ success: false, error: "Token expired" })
		}

		if (err.name === 'JsonWebTokenError') {
			return res.status(403).json({ success: false, error: "Invalid token" })
		}


		console.log(err);
		res.status(500).json({ success: false, error: 'Server error' })
	}
}

module.exports = isAuthorized;
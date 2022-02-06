require("dotenv").config();

const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const { expValidation } = require("../../utils/validationCheck");

const loginController = async (req, res) => {
  try {
    // Check validation
    const isValid = expValidation(validationResult(req));
    if (isValid) {
      return res.status(400).json({ success: false, error: isValid });
    }

    // Is email valid
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, error: "Incorrect email or password" });
    }

    // Is password valid
    const isPassValid = await bcrypt.compare(req.body.password, user.password);
    if (!isPassValid) {
      return res
        .status(400)
        .json({ success: false, error: "Incorrect email or password" });
    }

    // Genarage access token
    const access_token = jwt.sign(
      {
        USER: user.userName,
      },
      process.env.ACCESS_TOKEN_SECTETE,
      { expiresIn: "28d" }
    );

    res
      .status(200)
      .json({ success: true, message: "Login successful", access_token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

module.exports = { loginController };

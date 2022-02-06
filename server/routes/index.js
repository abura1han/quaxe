const express = require("express");
const { signupController } = require("./auth/signup");
const router = express.Router();

const isAuthorized = require("../utils/isAuthorize");
const { signupValidator, loginValidator } = require("../validations/user");
const { loginController } = require("./auth/login");
const {
  getAllUsers,
  getMyInfoController,
  editProfileController,
} = require("./user");
const { getAllFriends, getFriendById, addNewFriend } = require("./friends");
const tokenCheckController = require("./auth/tokenCheck");
const { getAllMessages, createMessage } = require("./message");
const { createMessageValidator } = require("../validations/message");

//
// User
//
router.post("/api/signup", signupValidator, signupController); // Signup
router.post("/api/login", loginValidator, loginController); // Login

//
// Protected routes
//
router.use("/api", isAuthorized);

// Token check
router.all("/api/token_check", tokenCheckController);

// Current user
router.get("/api/profile", getMyInfoController); // Get my info
router.put("/api/profile", editProfileController); // Edit profile

//
// Friends routes
//
router.get("/api/friend/all", getAllFriends); // Get all friends
router.get("/api/friend/:friendId", getFriendById); // Get all friends
router.post("/api/friend/add_new", addNewFriend); // Add new friend
router.delete("/api/friend/remove", editProfileController); // Remove friend

//
// Message routes
//
router.get("/api/message/all", getAllMessages);
router.post("/api/message/create", createMessageValidator, createMessage);

// Get all users
router.get("/api/users", getAllUsers); // Get my info

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

module.exports = router;

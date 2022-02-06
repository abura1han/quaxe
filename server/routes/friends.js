const Friend = require('../models/Friend');

// 
// Get all friends
// 
const getAllFriends = async (req, res) => {
	try {
		const friends = await Friend.findOne({ owener: req.User._id }, { __v: 0 }).populate("friends", { password: 0, __v: 0, createdAt: 0, updatedAt: 0 });

		res.status(200).json({ success: true, data: friends });
	} catch (error) {
		console.error(error);
		res.status(500).json({ success: false, error: "Server error" });
	}
}

//
// Get friend by id
//
const getFriendById = async (req, res) => {
	try {
		const friendId = req.params.friendId;

		if (!friendId) {
			return res.status(400).json({ success: false, error: "Empty friend id is not acceptable" });
		}

		const friend = await Friend.findOne({ owener: req.User._id }).populate("User");
		if (!friend) {
			return res.status(400).json({ success: false, error: "Invalid friend id" });
		}

		res.status(200).json({ success: true, data: friend });

	} catch (error) {
		console.error(error);
		res.status(500).json({ success: false, error: "Server error" });
	}
}


//
// Add new friend
// 
const addNewFriend = async (req, res) => {
	try {
		const friendId = req.body.friend_id;

		if (!friendId) {
			return res.status(400).json({ success: false, error: "Empty friend id is not acceptable" });
		}

		let friend;

		// If friend exist
		const isFriendExist = await Friend.findOne({ owener: req.User.id });
		if (!isFriendExist) {
			friend = await Friend.create({
				owener: req.User._id,
				friends: [friendId],
			});

			await friend.save();
		} else {
			friend = await Friend.findOneAndUpdate({
				owener: req.User._id,
			}, {
				$push: { friends: friendId }
			}, { new: true }).populate("friends");
		}

		res.status(200).json({ success: true, data: friend, message: "Friend added to your profile" });
	} catch (error) {
		console.error(error);
		res.status(500).json({ success: false, error: "Server error" });
	}
}

module.exports = { getAllFriends, getFriendById, addNewFriend };
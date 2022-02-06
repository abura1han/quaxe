const tokenCheckController = (req, res) => {
	res.status(200).json({ success: true, message: "Valid user" });
}

module.exports = tokenCheckController;
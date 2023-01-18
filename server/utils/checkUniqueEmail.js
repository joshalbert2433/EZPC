const User = require("../models/user.model");

async function checkForUniqueEmail(req, res, next) {
	const email = req.body.email;

	try {
		const user = await User.findOne({ email: email });
		if (user) {
			const error = new Error("Email already exists");
			error.status = 400;
			return next(error);
		}
	} catch (error) {
		// console.log(error);
		return next(error);
	}
	next();
}

module.exports = checkForUniqueEmail;

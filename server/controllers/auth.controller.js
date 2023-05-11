const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/token.util");

const register = async (req, res, next) => {
	const passwordHash = bcrypt.hashSync(req.body.email, 10);
	let user = new User({
		email: req.body.email,
		password: passwordHash,
	});

	try {
		await user.save();
		res.json({
			message: "User has been saved",
		});
	} catch (error) {
		res.status(400).json({
			message: error.message,
			error,
		});
	}
};

const display = async (req, res, next) => {
	try {
		const response = await User.find();
		res.status(200).json(response);
	} catch (error) {
		res.json({
			message: error.message,
			error,
		});
	}
};

const signIn = async (req, res, next) => {
	try {
		const user = await User.findOne({ email: req.body.email });
		// * SEND USER INFO WITH TOKEN IF AUTHENTICATED
		if (user) {
			if (bcrypt.compareSync(req.body.password, user.password)) {
				res.send({
					_id: user._id,
					email: user.email,
					isAdmin: user.isAdmin,
					token: generateToken(user),
				});
				return;
			}
		}
		res.status(401).send({ message: "Invalid Email or Password" });
	} catch (error) {
		// console.log(error);
		res.json({
			message: error.message,
			error,
		});
	}
};

module.exports = {
	register,
	display,
	signIn,
};

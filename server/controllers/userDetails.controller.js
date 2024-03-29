const UserDetails = require("../models/userDetails.model");

const display = async (req, res, next) => {
	try {
		let userDetails = await UserDetails.find().populate("user", "email");

		res.status(200).json(userDetails);
	} catch (error) {
		res.status(404).json({ message: error.message, error });
	}
};

const getByUserID = async (req, res, next) => {
	try {
		const page = parseInt(req.query.page) - 1 || 0;
		const limit = parseInt(req.query.limit) || 5;
		const isMain = req.query.isMain || false;

		// * RETURN MAIN ADDRESS IF TRUE ELSE RETURN ALL ADDRESS
		isMain
			? (userDetails = await UserDetails.findOne({
					isMain: true,
					user: req.params.userId,
			  })
					.populate("user", "email")
					.sort({ isMain: -1 })
					.skip(page * limit)
					.limit(limit))
			: (userDetails = await UserDetails.find({ user: req.params.userId })
					.populate("user", "email")
					.sort({ isMain: -1 })
					.skip(page * limit)
					.limit(limit));

		const total = await UserDetails.countDocuments({})
			.where("user")
			.equals(req.params.userId);

		//* RETURN ALL ADDRESS WITH PAGINATION IF TRUE ELSE RETURN SINGLE ADDRESS
		const response = !isMain
			? {
					error: false,
					total,
					page: page + 1,
					limit,
					data: userDetails,
			  }
			: userDetails;

		res.status(200).json(response);
	} catch (error) {
		res.status(404).json({ message: error.message, error });
	}
};

const getByID = async (req, res) => {
	try {
		const userDetails = await UserDetails.findById(req.params.id);
		res.json(userDetails);
	} catch (error) {
		console.log(error);
		res.status(404).json({
			message: "Product Not Found",
		});
	}
};

const register = async (req, res, next) => {
	let data = {
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		address: req.body.address,
		city: req.body.city,
		state: req.body.state,
		zip_code: req.body.zip_code,
		isMain: req.body.isMain,
		user: req.body.user,
	};

	// * AUTOMATICALLY SET ADDRESS TO DEFAULT IF ADD DATA FOR FIRST TIME
	const total = await UserDetails.countDocuments({})
		.where("user")
		.equals(req.body.user);
	data = total === 0 ? { ...data, isMain: true } : data;

	let userDetails = new UserDetails(data);

	try {
		await userDetails.save();

		if (req.body.isMain === true) {
			await UserDetails.updateMany({}, { $set: { isMain: false } });
			await UserDetails.findOneAndUpdate(
				{ _id: req.params.user },
				{ $set: { isMain: true } }
			);
		}
		res.status(200).json({
			message: "User Details Saved",
		});
	} catch (error) {
		res.status(400).json({
			message: error.message,
			error,
		});
	}
};

const updateUserDetails = async (req, res, next) => {
	try {
		const userDetails = await UserDetails.findById(req.params.userId);

		Object.assign(userDetails, req.body);
		userDetails.save();

		if (req.body.isMain === true) {
			await UserDetails.updateMany({}, { $set: { isMain: false } });
			await UserDetails.findOneAndUpdate(
				{ _id: req.params.userId },
				{ $set: { isMain: true } }
			);
		}

		res.status(200).json({ message: "Successfully Updated", userDetails });
	} catch (error) {
		res.status(404).json({
			message: "Product Not Found",
			error,
		});
	}
};

// * DEFAULT ADDRESS SET BY SETTING ALL NOT MAIN INTO FALSE AND THEN SET THE BOOLEAN OF EQUAL ID OF PARAMS INTO TRUE
const setDefaultAddress = async (req, res, next) => {
	let id = req.params.userId;
	let userId = req.query.userId;
	try {
		await UserDetails.updateMany({}, { $set: { isMain: false } })
			.where("user")
			.equals(userId);
		const address = await UserDetails.findOneAndUpdate(
			{ _id: id },
			{ $set: { isMain: true } }
		)
			.where("user")
			.equals(userId);
		res.status(200).json({ message: "Default address set", data: address });
	} catch (error) {
		res.status(400).json({
			message: error.message,
			error,
		});
	}
};

const deleteUserDetails = async (req, res) => {
	try {
		const userDetails = await UserDetails.findById(req.params.id);
		await userDetails.remove();
		res.status(200).json({ message: "User Details successfully deleted" });
	} catch (error) {
		res.status(404).json({
			message: error.message,
			error,
		});
	}
};

module.exports = {
	display,
	register,
	getByUserID,
	getByID,
	updateUserDetails,
	setDefaultAddress,
	deleteUserDetails,
};

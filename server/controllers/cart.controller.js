const Cart = require("../models/cart.model");

const getByUserId = async (req, res, next) => {
	try {
		const cart = await Cart.findOne()
			// .populate({path: "user", model: "User", })
			.where("user")
			.equals(req.params.userId);

		res.status(200).json(cart);
	} catch (error) {
		console.log(error);
		res.status(404).json({
			message: "Product Not Found",
			error,
		});
	}
};

const register = async (req, res, next) => {
	// let cart = new Cart(req.body);

	try {
		const cart = req.body;

		const updatedCart = await Cart.findOneAndUpdate(
			{ user: cart.user }, // find the user with this email
			cart, // update the user with the data from the request body
			{ upsert: true, new: true } // create a new user if it does not exist, and return the updated or newly-created document
		);
		res.status(200).json({ message: "Cart Updated", updatedCart });
	} catch (error) {
		res.status(400).json({
			message: error.message,
			error,
		});
	}
};

module.exports = {
	register,
	getByUserId,
};

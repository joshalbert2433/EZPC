const Order = require("../models/order.model");
const User = require("../models/user.model");

const display = async (req, res, next) => {
	try {
		const page = parseInt(req.query.page) - 1 || 0;
		const limit = parseInt(req.query.limit) || 5;
		const search = req.query.search || "";

		const order = await Order.find({
			name: { $regex: search, $options: "i" },
		})
			.populate("orderItems.product", ["name", "price"])
			.skip(page * limit)
			.limit(limit);

		const total = await Order.countDocuments({
			name: { $regex: search, $options: "i" },
		});

		const response = {
			error: false,
			total,
			page: page + 1,
			limit,
			data: order,
		};

		res.status(200).json(response);
	} catch (error) {
		res.status(404).json({
			error: error.message,
			error,
		});
	}
};

const register = async (req, res, next) => {
	let order = new Order({
		orderItems: req.body.orderItems,
		user: req.body.user,
		total_price: req.body.total_price,
		shipping_address: req.body.shipping_address,
		status: req.body.status,
	});

	try {
		const response = await order.save();
		res.json({
			message: "order Saved",
			response,
		});
	} catch (error) {
		res.status(400).json({
			message: error.message,
			error,
		});
	}
};

module.exports = {
	register,
	display,
};

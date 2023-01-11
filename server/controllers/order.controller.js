const { response } = require("express");
const Order = require("../models/order.model");
const User = require("../models/user.model");

const display = async (req, res, next) => {
	try {
		const page = parseInt(req.query.page) - 1 || 0;
		const limit = parseInt(req.query.limit) || 5;
		// const search = req.query.search || "";
		let status = req.query.status || "all";

		const statusOptions = ["Order in process", "Shipped", "Cancelled"];

		status === "all"
			? (status = [...statusOptions])
			: (status = req.query.status.split(","));

		console.log(status);

		const order = await Order.find({
			// name: { $regex: search, $options: "i" },
			status: status,
		})
			.where("status")
			.in([...status])
			.populate("orderItems.product", ["name", "price"])
			.skip(page * limit)
			.limit(limit);

		const total = await Order.countDocuments({
			status: { $in: [...status] },
			// name: { $regex: search, $options: "i" },
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

const getOrderByProductId = async (req, res, next) => {
	try {
		const orderId = req.params.orderId;
		// const productId = req.query.productId || "";
		const order = await Order.find()
			.populate("orderItems.product")
			.where("orderId")
			.equals(orderId);

		// const total = await Order.countDocuments({
		// 	name: { $regex: search, $options: "i" },
		// });

		const response = {
			// total,
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

const getByUserId = async (req, res, next) => {
	try {
		const page = parseInt(req.query.page) - 1 || 0;
		const limit = parseInt(req.query.limit) || 5;

		const userId = req.params.userId;
		const order = await Order.find()
			.populate("orderItems.product")
			.where("user")
			.equals(userId);

		const total = await Order.countDocuments({})
			.where("user")
			.equals(userId);

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
		billing_address: req.body.billing_address,
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

const update = async (req, res, next) => {
	try {
		const order = await Order.findOne({ orderId: req.params.id });
		Object.assign(order, req.body);
		order.save();
		res.status(200).json({ message: "Order updated", order });
	} catch (error) {
		res.status(404).json({
			error: "Order Not Found",
		});
	}
};

module.exports = {
	register,
	display,
	getByUserId,
	getOrderByProductId,
	update,
};

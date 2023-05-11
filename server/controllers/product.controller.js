const Product = require("../models/product.model");
const mongoose = require("mongoose");

const display = async (req, res, next) => {
	try {
		const page = parseInt(req.query.page) - 1 || 0;
		const limit = parseInt(req.query.limit) || 5;
		const search = req.query.search || "";
		let sort = req.query.sort || "lowest";
		let category = req.query.category || "all";

		const categoryOptions = [
			"Processor",
			"Graphics Card",
			"Motherboard",
			"Monitor",
			"Memory",
			"Storage",
			"Power Supply",
		];

		category === "all"
			? (category = [...categoryOptions])
			: (category = req.query.category.split(","));

		const sortOrder =
			sort === "lowest"
				? { price: 1 }
				: sort === "highest"
				? { price: -1 }
				: sort === "newest"
				? { createdAt: -1 }
				: sort === "oldest"
				? { createdAt: 1 }
				: { _id: -1 };

		const product = await Product.find({
			name: { $regex: search, $options: "i" },
		})
			.where("category")
			.in([...category])
			.sort(sortOrder)

			.skip(page * limit)
			.limit(limit);

		const total = await Product.countDocuments({
			category: { $in: [...category] },
			name: { $regex: search, $options: "i" },
		});

		const response = {
			error: false,
			total,
			page: page + 1,
			limit,
			category: categoryOptions,
			data: product,
		};

		res.status(200).json(response);
	} catch (error) {
		console.error(error);
	}
};

const register = async (req, res, next) => {
	let product = new Product({
		name: req.body.name,
		description: req.body.description,
		image: req.body.image,
		price: req.body.price,
		image_main: req.body.image_main,
		category: req.body.category,
		stock: req.body.stock,
	});

	try {
		const response = await product.save();
		res.json({
			message: "Product Saved",
			response,
		});
	} catch (error) {
		res.status(400).json({
			message: error.message,
			error,
		});
	}
};

const getByID = async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);
		res.json(product);
	} catch (error) {
		console.log(error);
		res.status(404).json({
			error: "Product Not Found",
		});
	}
};

const getManyById = async (req, res) => {
	try {
		// Get the list of item IDs from the query string

		var itemIds = req.query.itemIds.split(",") || 0;

		const product = await Product.find({ _id: { $in: itemIds } });

		const total = await Product.countDocuments({ _id: { $in: itemIds } });
		const response = {
			total: total,
			data: product,
		};

		res.status(200).json(response);
	} catch (error) {
		res.status(404).json({
			message: error.message,
			error: "Product Not Found",
		});
	}
};

const updateProduct = async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);
		Object.assign(product, req.body);
		product.save();
		res.json(product);
	} catch (error) {
		res.status(404).json({
			error: "Product Not Found",
		});
	}
};

const deleteProduct = async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);
		await product.remove();
		res.json({ message: "Product successfully deleted" });
	} catch (error) {
		res.status(404).json({
			error: "Product Not Found",
		});
	}
};

const searchProduct = async (req, res) => {
	try {
		const query = req.params.key;
		console.log(query);
		const product = await Product.find({
			$or: [{ name: { $regex: query } }],
		});
		res.json(product);
	} catch (error) {
		res.status(404).json({
			error: "Product Not Found",
		});
	}
};

module.exports = {
	display,
	register,
	getByID,
	updateProduct,
	deleteProduct,
	searchProduct,
	getManyById,
};

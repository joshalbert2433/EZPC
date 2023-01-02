const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const autoIncrement = require("mongoose-auto-increment");

connection = mongoose.createConnection(process.env.MONGO_URL);

autoIncrement.initialize(connection);

const orderSchema = new Schema(
	{
		orderId: { type: Number, required: true },
		orderItems: [
			{
				product: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "Product",
					required: true,
				},
				quantity: { type: Number, required: true },
			},
		],
		shipping_address: {
			first_name: { type: String, required: true },
			last_name: { type: String, required: true },
			address: { type: String, required: true },
			city: { type: String, required: true },
			state: { type: String, required: true },
			zip_code: { type: String, required: true },
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		total_price: { type: Number, required: true },
		status: { type: String, required: true, default: "Order in process" },
	},
	{ timestamps: true }
);

orderSchema.plugin(autoIncrement.plugin, {
	model: "Order",
	field: "orderId",
	startAt: 1,
	incrementBy: 1,
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema(
    {
        orderId: { type: Number, required: true },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        itemsPrice: { type: Number, required: true },
        shippingPrice: { type: Number, required: true },
        taxPrice: { type: Number, required: true },
        totalPrice: { type: Number, required: true },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);

MyModelSchema.plugin(autoIncrement.plugin, {
    model: "Order",
    field: "orderId",
    startAt: 1,
    incrementBy: 1,
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
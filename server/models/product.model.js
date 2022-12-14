const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        image: {
            type: Array,
        },
        image_main: {
            type: Number,
            default: 0,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
            default: 0,
        },
        stock: {
            type: Number,
            required: true,
            default: 100,
        },
        category: {
            type: Array,
            required: true,
        },
    },
    { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;

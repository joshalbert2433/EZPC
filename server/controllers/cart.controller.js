const Cart = require("../models/cart.model");

const register = async (req, res, next) => {
    let product = new Cart({
        name: req.body.name,
        price: req.body.price,
        quantity: req.body.quantity,
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

module.exports = {
    register,
};

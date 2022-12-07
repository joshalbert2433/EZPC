const Product = require("../models/product.model");

const getAllProducts = async () => {
    try {
        let data = await Product.find();
        // console.log(data);
        return data;
    } catch (error) {
        console.error(error);
    }
};

const display = async (req, res, next) => {
    let data = await getAllProducts();
    console.log(data);
    res.json({ data });
};

const register = async (req, res, next) => {
    let product = new Product({
        name: req.body.name,
        description: req.body.description,
        image: req.body.image,
        price: req.body.price,
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
            message: "An error occurred",
            error,
        });
    }
};

module.exports = {
    display,
    register,
};

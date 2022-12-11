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
    // console.log(data);
    res.json({ data });
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
            message: "An error occurred",
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
            error: "User Not Found",
        });
    }
};

const update = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        Object.assign(product, req.body);
        product.save();
        res.json(product);
    } catch (error) {
        // console.log(error);
        res.status(404).json({
            error: "User Not Found",
        });
    }
};

module.exports = {
    display,
    register,
    getByID,
    update,
};

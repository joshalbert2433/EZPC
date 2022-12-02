const UserInfo = require("../models/userInfo.model");

const getAllUserInfo = async () => {
    try {
        let data = await UserInfo.find();
        return data;
    } catch (error) {
        console.error(error);
    }
};

const display = async (req, res, next) => {
    let data = await getAllUserInfo();
    console.log(data);
    res.json({ data });
};

const register = async (req, res, next) => {
    let product = new UserInfo({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        zip_code: req.body.zip_code,
    });

    try {
        await product.save();
        res.json({
            message: "User Info Saved",
        });
    } catch (error) {
        res.json({
            message: "An error occurred",
            error,
        });
    }
};

module.exports = {
    display,
    register,
};

const UserDetails = require("../models/userDetails.model");

const getAllDetails = async () => {
    try {
        let data = await UserDetails.find().populate("user", "email");
        return data;
    } catch (error) {
        console.error(error);
    }
};

const display = async (req, res, next) => {
    let data = await getAllDetails();
    // console.log(data);
    res.json({ data });
};

const getByID = async (req, res, next) => {
    console.log(req.params.id);
    try {
        const userDetails = await UserDetails.find()
            // .populate({path: "user", model: "User", })
            .where("user")
            .equals(req.params.id)
            .populate("user", "email");

        res.status(200).json(userDetails);
    } catch (error) {
        res.status(404).json({ message: error.message, error });
    }
};

const register = async (req, res, next) => {
    let userDetails = new UserDetails({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        zip_code: req.body.zip_code,
        isMain: req.body.isMain,
        user: req.body.user,
    });

    try {
        await userDetails.save();
        res.status(200).json({
            message: "User Details Saved",
        });
    } catch (error) {
        res.status(400).json({
            message: error.message,
            error,
        });
    }
};

module.exports = {
    display,
    register,
    getByID,
};

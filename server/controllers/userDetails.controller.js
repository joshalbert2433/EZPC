const UserDetails = require("../models/userDetails.model");

const display = async (req, res, next) => {
    try {
        let userDetails = await UserDetails.find().populate("user", "email");

        res.status(200).json(userDetails);
    } catch (error) {
        res.status(404).json({ message: error.message, error });
    }
};

const getByUserID = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) - 1 || 0;
        const limit = parseInt(req.query.limit) || 5;

        const userDetails = await UserDetails.find()
            // .populate({path: "user", model: "User", })
            .where("user")
            .equals(req.params.userId)
            .populate("user", "email")
            .sort({ isMain: -1 })
            .skip(page * limit)
            .limit(limit);

        const total = await UserDetails.countDocuments({})
            .where("user")
            .equals(req.params.userId);

        const response = {
            error: false,
            total,
            page: page + 1,
            limit,
            data: userDetails,
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(404).json({ message: error.message, error });
    }
};

const getByID = async (req, res) => {
    try {
        const userDetails = await UserDetails.findById(req.params.id);
        res.json(userDetails);
    } catch (error) {
        console.log(error);
        res.status(404).json({
            message: "Product Not Found",
        });
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

        if (req.body.isMain === true) {
            await UserDetails.updateMany({}, { $set: { isMain: false } });
            await UserDetails.findOneAndUpdate(
                { _id: req.params.user },
                { $set: { isMain: true } }
            );
        }
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

const updateUserDetails = async (req, res, next) => {
    try {
        const userDetails = await UserDetails.findById(req.params.userId);

        Object.assign(userDetails, req.body);
        userDetails.save();

        if (req.body.isMain === true) {
            await UserDetails.updateMany({}, { $set: { isMain: false } });
            await UserDetails.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: { isMain: true } }
            );
        }

        res.status(200).json({ message: "Successfully Updated", userDetails });
    } catch (error) {
        // console.log(error);
        res.status(404).json({
            message: "Product Not Found",
            error,
        });
    }
};

const setDefaultAddress = async (req, res, next) => {
    try {
        await UserDetails.updateMany({}, { $set: { isMain: false } });
        await UserDetails.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: { isMain: true } }
        );
        res.status(200).json({ message: "Default address set" });
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
    getByUserID,
    getByID,
    updateUserDetails,
    setDefaultAddress,
};

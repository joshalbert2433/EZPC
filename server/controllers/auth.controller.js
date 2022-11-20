const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res, next) => {
    const passwordHash = bcrypt.hashSync(req.body.email, 10);
    let user = new User({
        email: req.body.email,
        password: passwordHash,
    });

    try {
        await user.save();
        res.json({
            message: "User has been saved",
        });
    } catch (error) {
        res.json({
            error,
            message: "An Error Occurred",
        });
    }
    console.log(user);
};

module.exports = {
    register,
};

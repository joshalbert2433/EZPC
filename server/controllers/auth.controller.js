const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const generateToken = require("../utils/token.util");

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
            error: error.message,
        });
    }
    console.log(user);
};

const display = async (req, res, next) => {
    try {
        const response = await User.find();
        res.status(200).json(response);
    } catch (error) {
        res.json({
            error: error.message,
        });
    }
};

const signIn = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        // console.log(user.typeOf);
        if (user) {
            if (bcrypt.compareSync(req.body.email, user.password)) {
                res.send({
                    _id: user._id,
                    // name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    token: generateToken(user),
                });
                return;
            }
        }
        res.status(401).send({ message: "Invalid Username or Password" });
    } catch (error) {
        // console.log(error);
        res.json({
            error: error.message,
        });
    }
};

module.exports = {
    register,
    display,
    signIn,
};

const jwt = require("jsonwebtoken");

module.exports = generateToken = (user) => {
    return jwt.sign(
        {
            _id: user._id,
            email: user.email,
            isAdmin: user.isAdmin,
        },
        process.env.JWT_SECRET,
        { expiresIn: "30d" }
    );
};

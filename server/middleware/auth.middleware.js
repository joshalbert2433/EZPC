const isEmailUnique = (error, req, res, next) => {
    console.log("hello");

    if (error.code === 11000) {
        next(new Error("Email is already registered"));
    } else {
        next(error);
    }
};

module.exports = isEmailUnique;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userInfoSchema = new Schema(
    {
        first_name: String,
        last_name: String,
        address: String,
        city: String,
        state: String,
        zip_code: Number,
    },
    { timestamps: true }
);

const UserInfo = mongoose.model("UserInfo", userInfoSchema);
module.exports = UserInfo;

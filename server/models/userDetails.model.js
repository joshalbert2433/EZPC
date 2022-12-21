const mongoose = require("mongoose");
const User = require("../models/user.model");
const Schema = mongoose.Schema;

const userDetailsSchema = new Schema(
    {
        first_name: {
            type: String,
            required: true,
        },
        last_name: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
        zip_code: {
            type: String,
            required: true,
        },
        isMain: {
            type: Boolean,
            default: false,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);

const UserDetails = mongoose.model("UserDetails", userDetailsSchema);

module.exports = UserDetails;

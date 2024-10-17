const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
    },
    email: {
        type: String,
        required: [true, "Username is required"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Username is required"],
    },
    blogs: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Blogs",
        },
    ]

}, { timestamps: true }
);

exports.userModel = mongoose.model("Users", userSchema);


const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({

    title: {
        type: String,
        required: [true, "Title is required"],
    },

    description: {
        type: String,
        required: [true, "Description is required"],
    },

    image: {
        type: String,
        required: [true, "Image is required"],
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "Users",
        required: [true, "User is required"],
    },

}, { timestamps: true });

exports.BlogModel = mongoose.model("Blogs", blogSchema);
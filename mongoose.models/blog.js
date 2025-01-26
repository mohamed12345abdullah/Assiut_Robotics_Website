const mongoose = require("mongoose");
const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    avatar: {
        type: String,
        default: "../all-images/WWW.jpeg",
    },
});

module.exports = mongoose.model("Blog", blogSchema);

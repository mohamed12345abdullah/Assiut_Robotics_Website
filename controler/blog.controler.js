require("dotenv").config();
const MONGOURL = process.env.MONGOURL;
const mongoose = require("mongoose");
mongoose.connect(MONGOURL);
const blog = require("../mongoose.models/blog");

const addBlog = async (req, res) => {
    try {
        const { title, content, date, avatar } = req.body;

        const newblog = await new blog({
            title,
            content,
            date,
            avatar,
        });

        newblog.save();

        res.status(200).send({ message: "add blog successfully" });
    } catch (error) {
        res.status(400).send({ message: error });
    }
};

const getBlogs = async (req, res) => {
    try {
        const blogs = await blog.find({});

        res.status(200).send({ message: "get daa sucessfully", data: blogs });
    } catch (error) {
        res.status(404).send({ message: "not found" });
    }
};

module.exports = {
    addBlog,
    getBlogs,
};

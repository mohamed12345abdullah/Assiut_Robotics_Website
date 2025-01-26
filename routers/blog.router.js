const express = require("express");

const blogControler = require("../controler/blog.controler");
const JWT = require("../middlleware/jwt");
const Router = express.Router();

Router.route("/add").post(blogControler.addBlog);

Router.route("/getBlogs").get(blogControler.getBlogs);

module.exports = Router;

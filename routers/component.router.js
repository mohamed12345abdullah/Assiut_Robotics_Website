const express = require("express");
const componentControler = require("../controler/component.controler");
const JWT = require("../middlleware/jwt");
const Router = express.Router();
const multer = require("multer");

const diskStorage = multer.diskStorage({
    destination: (req, file, cb) => {
            cb(null, "uploads/");
           // console.log("file dest", file);
    },
    filename: (req, file, cb) => {
            const ext = file.mimetype.split("/")[1];

            const filename = `${file.originalname.split(".")[0]+Date.now()}.${ext}`;
           console.log("filename:", filename);
            req.myFileName=filename;
            cb(null, filename);
    },
});

const fileFilter = (req, file, cb) => {
    const imageType = file.mimetype.split("/")[1];
    // if (imageType == "jpg") {
            return cb(null, true);
    // } else {
            // return cb("I don't have a clue!", false);
    // }
};
const upload = multer({
    storage: diskStorage,
    fileFilter,
});




Router.route("/add").post(upload.single("image"),componentControler.addComponent);

Router.route("/getComponents").get(componentControler.getCombonent);

Router.route("/update").post(componentControler.updateComponent);
Router.route("/deleteAll").get(componentControler.deleteAll);
Router.route("/deleteOne").post(componentControler.deleteOne);

module.exports = Router;

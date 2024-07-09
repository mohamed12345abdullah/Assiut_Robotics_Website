const express = require("express");

const memberControler = require("../controler/member.controler");
const JWT = require("../middlleware/jwt");
const Router = express.Router();
const multer = require("multer");
const otp = require("../utils/otp");

const diskStorage = multer.diskStorage({
        destination: (req, file, cb) => {
                cb(null, "books/");
        },
        filename: (req, file, cb) => {
                const ext = file.mimetype.split("/")[1];
                const filename = `${file.originalname}_.${ext}`;
                console.log("file", file);

                cb(null, filename);
        },
});

const fileFilter = (req, file, cb) => {
        const imageType = file.mimetype.split("/")[1];
        if (imageType == "pdf") {
                return cb(null, true);
        } else {
                return cb("I don't have a clue!", false);
        }
};
const upload = multer({
        storage: diskStorage,
        fileFilter,
});

// Router.route("/book")
//         .post(upload.single("file"),async(req,res)=>{
//                 const {title }=req.body;
//                 const file =req.file;
//                 console.log("file data is : ",file);
//                 console.log("body data is : ",req.url);
//                 const newBook=await  new book({
//                         title,
//                         url:"http://localhost:3000/book/"+file.filename
//                 })
//                 newBook.save();
//                 res.end("done");
//         })

Router.route("/verifyEmail").post(memberControler.verifyEmail);

Router.route("/createAccount/:token").get(
        JWT.verify,
        memberControler.createAccount
);

Router.route("/getAllMembers").get(memberControler.getAllMembers);

Router.route("/login").post(memberControler.login);

Router.route("/verify").post(JWT.verify, memberControler.verify);

Router.route("/confirm").post(JWT.verify, memberControler.confirm);

Router.route("/changeHead").post(JWT.verify, memberControler.changeHead);

Router.route("/hr").post(JWT.verify, memberControler.controleHR);

Router.route("/generateOTP/:email").get(memberControler.generateOTP);

Router.route("/verifyOTP").post(otp.verifyOtp);

Router.route("/changePass").post(memberControler.changePass);

module.exports = Router;

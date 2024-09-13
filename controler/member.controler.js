require("dotenv").config();
const MONGOURL = process.env.MONGOURL;
const mongoose = require("mongoose");
mongoose.connect(MONGOURL);
const member = require("../mongoose.models/member");

// jwt
const jwt = require("../middlleware/jwt");

//bcrypt
const bcrypt = require("../middlleware/bcrypt");

// http status text
const httpStatusText = require("../utils/httpStatusText");

//async wrapper
const asyncWrapper = require("../middlleware/asyncWrapper");

// send email
const sendEmail = require("../utils/sendEmail");
// otp
const OTP = require("../utils/otp");
const { decode } = require("jsonwebtoken");

const verifyEmail = async (req, res) => {
    try {
        let { name, email, password, committee, gender, phoneNumber } = req.body;
        const token = await jwt.generateToken({ name, email, password, committee, gender, phoneNumber }, "5m");
        console.log("req.body is : ", req.body);
        await sendEmail({
            email: email,
            subject: "subject ",
            text: "my text",
            html: `
    <p>Please verify your email by clicking on the link below:</p>
    <br><br>
    <a href="https://assiut-robotics-website.vercel.app/members/createAccount/${token}">Verify your email</a>
  `,
        });
        res.status(200).json({
            status: httpStatusText.SUCCESS,
            data: null,
            message: "verify your email by click on the link on your email ",
            code: 400,
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: httpStatusText.FAIL,
            data: null,
            message: error.message,
            code: 400,
        });
    }
};

const createAccount = async (req, res) => {
    try {
        // console.log(req.body);
        // console.log(req.file);
        let { name, email, password, committee, gender, phoneNumber } = req.decoded;
        let oldEmail = await member.findOne({ email });
        console.log("old member", oldEmail);
        if (oldEmail) {
            console.log("old member", oldEmail);
            return res.status(400).json({
                status: httpStatusText.FAIL,
                data: null,
                message: "This email is already in use. Please log in or use a different email.",
            });
        }

        let hashedpass = await bcrypt.hashing(password);
        const newMember = new member({
            name,
            email,
            password: hashedpass,
            committee,
            gender,
            phoneNumber,
            //avatar: req.file.filename
        });

        await newMember.save();
        const token = await jwt.generateToken({ email });

        res.status(201).json({
            status: httpStatusText.SUCCESS,
            data: null,
            message: "Your account has been successfully created. <br> wait until your request be accepted",
        });
    } catch (error) {
        console.log(error.message);
        res.status(400).json({
            status: httpStatusText.ERROR,
            data: null,
            message: error.message,
        });
    }
};

const login = async (req, res) => {
    try {
        console.log("body", req.body);
        const { email, password, remember } = req.body;
        const oldMember = await member.findOne({ email });
        if (oldMember) {
            const truePass = await bcrypt.comparePassword(password, oldMember.password);
            if (truePass) {
                if (oldMember.role != 5) {
                    const token = await jwt.generateToken(
                        {
                            name: oldMember.name,
                            email: oldMember.email,
                            phoneNumber: oldMember.phoneNumber,
                            role: oldMember.role,
                            committee: oldMember.committee,
                            avatar: oldMember.avatar,
                        },
                        remember
                    );
                    // res.redirect("/index.html");

                    res.status(200).json({
                        status: httpStatusText.SUCCESS,
                        data: {
                            token: token,
                        },
                        message: "Your are logged in",
                    });
                } else {
                    res.status(400).json({
                        status: httpStatusText.FAIL,
                        data: null,
                        message:
                            "Your account has been successfully created. <br> wait until your request be accepted",
                    });
                }
            } else {
                res.status(400).json({
                    status: httpStatusText.FAIL,
                    data: null,
                    message: "wrong password",
                });
            }
        } else {
            res.status(404).json({
                status: httpStatusText.FAIL,
                message: "this user not found",
            });
        }
    } catch (error) {
        res.status(400).json({
            status: httpStatusText.FAIL,
            data: null,
            message: error.message,
            code: 400,
        });
    }
};

const getAllMembers = async (req, res) => {
    try {
        let members = await member.find({}, { password: false });

        res.status(200).json({
            status: httpStatusText.SUCCESS,
            data: {
                members,
            },
            message: "get members successfully",
        });
    } catch (error) {
        res.status(400).json({
            status: httpStatusText.FAIL,
            data: null,
            message: error.message,
        });
    }
};

const verify = async (req, res) => {
    try {
        if (req.decoded) {
            const oldMember = await member.findOne({ email: req.decoded.email });
            if (oldMember) {
                res.status(200).send({ message: "success authorization", data: req.decoded });
            } else {
                res.status(401).send({ message: " unauthorized" });
            }
        }
    } catch (error) {
        res.status(401).send({ message: " unauthorized" });
    }
};

const confirm = async (req, res) => {
    try {
        const { id, role } = req.body;
        if (role) {
            await member.findByIdAndUpdate(id, { role });
            res.status(200).json({
                status: httpStatusText.SUCCESS,
                data: null,
                message: "confirmed",
            });
        } else {
            await member.findByIdAndDelete(id);
            res.status(200).json({
                status: httpStatusText.SUCCESS,
                data: null,
                message: "deleted",
            });
        }
    } catch (error) {
        res.status(400).json({
            status: httpStatusText.ERROR,
            data: null,
            message: error.message,
        });
    }
};

const controleHR = async (req, res) => {
    try {
        const { id, committee } = req.body;

        await member.findByIdAndUpdate(id, { committee: "HR-" + committee, role: 3 });
        res.status(200).json({
            status: httpStatusText.SUCCESS,
            data: null,
            message: "done",
        });
    } catch (error) {
        res.status(501).json({
            status: httpStatusText.ERROR,
            data: null,
            message: error.message,
        });
    }
};
const changeHead = async (req, res) => {
    try {
        const old_id = req.body.old_id;
        const new_id = req.body.new_id;
        await member.findOneAndUpdate({ _id: old_id }, { role: 4 });
        const newHead = await member.findOneAndUpdate({ _id: new_id }, { role: 2 });
        // await member.save();
        newHead.save();

        res.status(200).json({
            status: httpStatusText.SUCCESS,
            data: null,
            message: "done",
        });
    } catch (error) {
        res.status(400).send({
            status: httpStatusText.FAIL,
            data: null,
            message: error.message,
        });
    }
};

const generateOTP = async (req, res) => {
    const { email } = req.params;
    // console.log(email);
    let oldmember = await member.findOne({ email });
    if (oldmember) {
        let code = await OTP.generateOtp();
        // console.log(oldmember);
        await sendEmail({
            email: oldmember.email,
            subject: " OTP",
            text: "my code is :",
            html: `  code <hr> ${code}`,
        });
        res.status(200).json({
            status: httpStatusText.SUCCESS,
            data: null,
            message: "check your email ",
        });
    } else {
        res.status(404).json({
            status: httpStatusText.FAIL,
            data: null,
            message: "this user not found",
        });
    }
};

const changePass = async (req, res) => {
    try {
        const { email, newpass } = req.body;
        let hashedpass = await bcrypt.hashing(newpass);

        const updated = await member.findOneAndUpdate({ email }, { password: hashedpass });
        if (updated) {
            res.status(200).json({
                status: httpStatusText.SUCCESS,
                data: updated,
                message: "updated success",
            });
        } else {
            res.status(404).json({
                status: httpStatusText.FAIL,
                data: null,
                message: "this user not found",
            });
        }
    } catch (error) {
        res.status(400).send({
            status: httpStatusText.FAIL,
            data: null,
            message: error.message,
        });
    }
};


const rate=async (req,res)=>{
    try {
        console.log(req.decoded);
        const committee= req.decoded.committee.split("-")[0];
        console.log(committee);
        if(committee=="HR")
        {
            const {ID,rate}=req.body;
            const MEMBER=await member.findById(ID);
            // if(MEMBER.committee=="web"){
            //     MEMBER.rate=9.5;
            // }else{
            //     MEMBER.rate=rate;
            // }
            MEMBER.rate=rate;
            if(rate<6){
                MEMBER.alerts+=1;
                if(MEMBER.alerts>2){
                    MEMBER.warnings+=1;
                    MEMBER.alerts=0;

                }
            }
            if(MEMBER.warnings>2){
                console.log("delete");
                await member.deleteOne({_id:ID});
            }
            MEMBER.save();
            res.status(200).json({
                status: httpStatusText.SUCCESS,
                data:null ,
                message: "updated success",
            });
        }else{
            res.status(401).send({
                status: httpStatusText.FAIL,
                data: null,
                message: " not HR",
            }); 
        }

  
 
    } catch (error) {
        res.status(400).send({
            status: httpStatusText.FAIL,
            data: null,
            message: error.message,
        }); 
    }
}


module.exports = {
    verifyEmail,
    createAccount,
    login,
    getAllMembers,
    verify,
    confirm,
    controleHR,
    changeHead,
    generateOTP,
    changePass,
    rate
};

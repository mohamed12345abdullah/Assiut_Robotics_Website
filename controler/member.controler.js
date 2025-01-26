require("dotenv").config();
const MONGOURL = process.env.MONGOURL;
const mongoose = require("mongoose");
mongoose.connect(MONGOURL);
const member = require("../mongoose.models/member");

// jwt
const jwt = require("../middlleware/jwt");

//bcrypt


// http status text
const httpStatusText = require("../utils/httpStatusText");

//async wrapper
const asyncWrapper = require("../middlleware/asyncWrapper");

// send email
// otp



const changeProfileImage=asyncWrapper(async(req,res)=>{

    const email=req.decoded.email;
    console.log(email);
    
    //  const{ID}=req.body;
     const oldMember = await member.findOne({email});
     console.log(oldMember)
    if(!oldMember){
        const error=createError(404,httpStatusText.SUCCESS,"user not found ")
        throw (error)
        
    }
    
    oldMember.avatar=req.imageUrl;
    oldMember.save();
    res.status(200).json({
        status: httpStatusText.SUCCESS,
        data: null,
        message: "profile image is changed successfully",
    });
})


module.exports = {

 
    changeProfileImage
};

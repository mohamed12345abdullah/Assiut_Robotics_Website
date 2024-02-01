require('dotenv').config();
const MONGOURL=process.env.MONGOURL;

const mongoose=require('mongoose');
mongoose.connect(MONGOURL)
const member = require('../mongoose.models/member');

// jwt
const jwt=require('../jwt/jwt');

const createAccount=async(req,res)=>{
try { 
    console.log(req.body);
    
    let {name,email,password,committee,gender,phoneNumber,role}=req.body;
    let oldEmail=await member.find({email});
    console.log("old member",oldEmail);
    if(oldEmail.length){
        console.log("old member",oldEmail);
       return res.status(400).send({message:"This email is already in use. Please log in or use a different email." });
    }

    const newMember=new member({ 
        name,
        email,
        password,
        committee,
        gender,
        phoneNumber,
        role
    })

    await newMember.save();
    const token =await jwt.generateToken({email})
    res.status(201).send({"message":"Your account has been successfully created.",token})
} catch (error) {
    console.log(error);
    res.status(400).send({"message":error.message});
}

}


// const login=async(req,res)=>{
//     try {
//         const {email,password}=req.body;

//         const oldMember=await member.find({email});
//     } catch (error) {
        
//     }
// }


module.exports={
    createAccount,
    // login
}
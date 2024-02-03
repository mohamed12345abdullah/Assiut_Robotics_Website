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
    let oldEmail=await member.findOne({email});
    console.log("old member",oldEmail);
    if(oldEmail){
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
    // const token =await jwt.generateToken({email})
    
    res.status(201).send({"message":"Your account has been successfully created. <br> wait until your request be acceptted"})
} catch (error) {
    console.log(error);
    res.status(400).send({"message":error.message});
}

}


const login=async(req,res)=>{
    try {
        console.log("body",req.body);
        const {email,password,remember}=req.body;
        const oldMember=await member.findOne({email});
        if(oldMember){
            if(oldMember.password==password){
                const token =await jwt.generateToken({email},remember);
                // res.redirect("/index.html");
                
                res.status(200).send({"message":"Your are logged in",token});
            }else{
                res.status(400).send({message:"wrong password"})
            }
        }else{
            res.status(404).send({message:"this user not found"})
        }
    } catch (error) {
        
    }
}


const getAllMembers=async(req,res)=>{
    let members=await member.find({},{password:false});

    res.status(200).send({message:"get data successfully",data:{members}})
}


module.exports={
    createAccount,
    login,
    getAllMembers
}
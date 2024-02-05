require('dotenv').config();
const MONGOURL=process.env.MONGOURL;
const mongoose=require('mongoose');
mongoose.connect(MONGOURL)
const member = require('../mongoose.models/member');

// jwt
const jwt=require('../middlleware/jwt');

//bcrypt
const bcrypt=require('../middlleware/bcrypt');


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
    let hashedpass= await bcrypt.hashing(password);
    const newMember=new member({ 
        name,
        email,
        password:hashedpass,
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
            const truepass=await bcrypt.comparePassword(password,oldMember.password);
            if(truepass){
                
                if(oldMember.role!=5){
                    const token =await jwt.generateToken({
                        name:oldMember.name, 
                        email:oldMember.email,
                        phoneNumber:oldMember.phoneNumber,
                        role:oldMember.role,
                        committee:oldMember.committee 
                    },remember);
                    // res.redirect("/index.html");
                    
                    res.status(200).send({"message":"Your are logged in",token});
                }
                else{
                    res.status(400).send({"message":"Your account has been successfully created. <br> wait until your request be acceptted"})

                }
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



const verify=async(req,res)=>{
    try{

    if(req.decoded){
        const oldMember=await member.findOne({email:req.decoded.email})
        if(oldMember){
            res.status(200).send({message:"success authorization",data:req.decoded});
        }else{
            res.status(401).send({message:" unauthorized"})

        }
    }
    }catch(error){
        res.status(401).send({message:" unauthorized"})

    }
}




const confirm=async(req,res)=>{
    const {id,role}=req.body;
    if(role){
        await member.findByIdAndUpdate(id,{role});
        res.status(200).send({message:"confirmed"})
    }else {
        await member.findByIdAndDelete(id);
        res.status(200).send({message:"deleted"});
    }
    // else{
    //     res.end("done")
    // }
  
}

module.exports={
    createAccount,
    login,
    getAllMembers,
    verify,
    confirm
}
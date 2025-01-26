const mongoose=require('mongoose');
const validator=require('validator');

const memberSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"name is required"]
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        validate:[validator.isEmail,"enter a valid Email"]
    },
    password:{
        type:String,
        required:[true,"password is required"],

    },
    committee:{
        type:String,
        required:[true,"committee is required"]
    },
    gender:{
        type:String,
        required:[true,"gender is required"]
    },
    phoneNumber:{
        type:String,
        required:[true,"phone number is required"],
        validate:[validator.isMobilePhone,"enter a valid phone number"]
    },
    role:{
        type:String,
        default:"not accepted"
    },
    avatar:{
        type:String,
        default:"../all-images/human.png"
    },
    rate:{
        type:Number,
    },
    alerts:{
        type:Number
    },
    warnings:{
        type:Number
    },
    verified :{
        type:Boolean,
        default:false
    },
    secretKey:{
        type:String,
    }
})

module.exports=mongoose.model("Member",memberSchema);
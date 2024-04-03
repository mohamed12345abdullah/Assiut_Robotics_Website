const mongoose=require('mongoose');
const memberSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    committee:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:Number,
        required:true
    },
    role:{
        type:Number,
        default:5
    },
    avatar:{
        type:String,
        default:"بني ادم.png"
    }
})

module.exports=mongoose.model("Member",memberSchema);
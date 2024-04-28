const mongoose=require('mongoose');
const bookSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    url:{
        type:String,
        default:"images/WWW.jpeg"
    }

});

module.exports=mongoose.model("Book",bookSchema);
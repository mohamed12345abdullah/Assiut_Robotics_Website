
const express=require('express');
const path =require("path")

const app=express();


app.use("/", express.static(__dirname+"/public"));

app.listen(3000,()=>{


    console.log("server run ");
    
})
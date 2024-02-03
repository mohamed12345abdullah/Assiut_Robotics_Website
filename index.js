require('dotenv').config();
const PORT=process.env.PORT;



const express=require("express");
const memberRouter=require('./routers/member.router')


//cors

const cors=require('cors');

const app=express(); 


//middlle wares

// pody barser
const body_parser=require('body-parser')
app.use(body_parser.json())
app.use("/",express.urlencoded({extended:true}))


app.use(cors()); 

app.use("/",express.static(__dirname+"/views"))
app.use("/members",memberRouter);
// app.use("")
app.get("/",(req,res)=>{    
    res.end("server run successfully ")
})

app.listen(PORT,()=>{
    console.log("server is run and listen to port : ",PORT);
})
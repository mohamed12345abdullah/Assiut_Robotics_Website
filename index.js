require('dotenv').config();
const PORT=process.env.PORT;


const express=require("express");
const memberRouter=require('./routers/member.router')
const blogRouter=require('./routers/blog.router')
const componentRouter=require('./routers/component.router')

// status text
const httpStatusText=require('./utils/httpStatusText');

//cors

const cors=require('cors');

const app=express(); 


//middlle wares
app.use(cors()); 

// pody barser
const body_parser=require('body-parser');
app.use(body_parser.json());
app.use(body_parser.urlencoded({extended:true}));




app.use("/uploads",express.static(__dirname+"/uploads"))
app.use("/members",memberRouter);
app.use('/blogs',blogRouter);
app.use('/components',componentRouter);
app.get("/",async (req,res)=>{    
  try{
    const members=await members.findBycommittee(req.params.committee);
  
  if(!committee){
       return res.status(404).json({msg:"committee not found"})
  }
  res.json(members);
  }catch(err){
    return res.status(400).json({msg: "error"})
  }
})


app.use("*",(req,res,next)=>{
  res.status(404).json({status:404,message:"not found "});
})


 
app.use((error, req, res ,next)=>{
    res.status(error.statusCode||400).json(  { status:error.statusText||httpStatusText.ERROR,
                            message:error.message})
})





app.listen(PORT,()=>{
    console.log("server is run and listen to port : ",`http://localhost:${PORT}/`); 
})
 
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
app.use(body_parser.urlencoded({extended:false}));



app.use("/book",express.static(__dirname+"/books "))
app.use("/",express.static(__dirname+"/views"))
app.use("/uploads",express.static(__dirname+"/uploads"))
app.use("/members",memberRouter);
app.use('/blogs',blogRouter)
app.use('/components',componentRouter)

//draft


app.use("/upload",memberRouter)
// app.use("")
app.get("/",(req,res)=>{    
    res.end("server run successfully ")
})
 
app.use((error, req, res ,next)=>{
    res.status(500).json(  { status:httpStatusText.ERROR,
                            message:Array(error)})
})


// const multer  = require('multer')
// const upload = multer({ dest: 'uploads/' })
// app.post('/profile', upload.single('avatar'), function (req, res, next) {
//     res.end('uploaded')
//     // req.file is the `avatar` file
//     // req.body will hold the text fields, if there were any
//   })


const OTP=require('./utils/otp');


//   app.get('/genOTP',);
//   app.post('/verOTP',, async (req, res) => {
    
//  try {
    

//     const {code}=req.body;
//     console.log("body",req.body);
//     const ok=await OTP.verifyOtp(code);
//     if(ok){
//         res.status(200).json({message:"ok otp "
//         })
//     }else{
//         res.end(" not ok")
//         console.log(ok);
//     }
// } catch (error) {
//     console.log(error.message);
//     res.status(400).json({message:error.message        })


// } 
  
    // });
  setInterval(() => {
    fetch("https://assiut-robotics-website.onrender.com/")
    // console.log("sen req");
  }, 3000);

app.listen(PORT,()=>{
    console.log("server is run and listen to port : ",PORT);
})
 

//  ------------- multer----------------------
const diskStorage=multer.diskStorage({
    destination:(req,file,cb)=>{
            cb(null,"books/");

    },
    filename:(req,file,cb)=>{
            const ext=file.mimetype.split('/')[1];
            const filename=`${file.originalname}_.${ext}`;
            console.log('file',file);

            cb(null,filename)

    }
})

const fileFilter=(req, file ,cb)=>{
    
    
    const imageType=file.mimetype.split('/')[1];
    if(imageType=='pdf'){
           return cb(null,true);
    }else{
            
          return  cb( 'I don\'t have a clue!' , false)
    } 

}
const upload=multer({
    storage:diskStorage,
    fileFilter
})


Router.route("/book")
    .post(upload.single("file"),async(req,res)=>{
            
            const {title }=req.body;
            const file =req.file;
            console.log("file data is : ",file);
            console.log("body data is : ",req.url);
            const newBook=await  new book({
                title,
                url:"http://localhost:3000/book/"+file.filename
        })
        newBook.save();
        res.end("done");
    })




    //  ----------------------------------mongoose model ---------------------------
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




//  midle ware for static folder 
app.use("/book",express.static(__dirname+"/books"))





const MailParser = require('mailparser').simpleParser;



// Parse the email content
MailParser(emailContent, (err, parsed) => {
    if (err) {
        console.error('Error parsing email:', err);
        return;
    }

    // Display the parsed email object
    console.log(parsed.textAsHtml); 
});



const cloudinary=require('cloudinary').v2;


cloudinary.config({
    cloud_name:"dlxwpay7b",
    secure:true,
    api_key:"957197717412299",
    api_secret:"Pv53x9A3EkgBa3b_1H7O1Wu_sWc"
});

const uploadToCloud=async (filename)=> {
try {
        

    console.log("cloudinary run");
    
   const result=await cloudinary.uploader.upload(filename)

//    console.log(result);
    const url=cloudinary.url(result.public_id,{
            transformation:{
                    fetch_format:"auto",
                    quality:"auto",
                    width:1200,
                    height:1200,
                    crop:"fill" 
    
            }
    })
    console.log(url);
    return url;
} catch (error) {
        
}        
    
};


module.exports={
    uploadToCloud,
    "cloud":cloudinary
}

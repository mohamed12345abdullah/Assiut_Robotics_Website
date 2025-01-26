module.exports= (statusCode,statusText,message)=>{
    // try {
        

    const error=new Error();
    error.message=message;
    error.statusCode=statusCode;
    error.statusText=statusText;

    return error;
    // } catch (error) {
    //     error.statusCode=400;
    //     error.statusText="error in error"
    //     return error
    // }
}
const jwt = require('jsonwebtoken');
const createError=require("../utils/createError")
const httpStatusText=require("../utils/httpStatusText")
const asyncWrapper=require("../middlleware/asyncWrapper")
const fs=require("fs")
const path = require('path');

const generateToken =()=>{

return  async (payload, rememberMe) => {

            // try {

                const token = await jwt.sign(payload, process.env.SECRET, { expiresIn: rememberMe || "10h" });
                return token;
            


        }
}

const verify =
    async (req, res, next) => {
    try {
        

        
        const authHeader = req.headers["Authorization"] ||  req.headers["authorization"];
        console.log("verify",req.params.token,authHeader);

        if (!authHeader && !req.params.token) {
            throw(createError(401,httpStatusText.FAIL,"token is required"))

            // res.status(401).send({ message: "token is required" });
        } else {
            const token= req.params.token||authHeader.split(" ") [1];
            console.log("token: ",token);
            const decoded = await jwt.verify(token, process.env.SECRET);
            if (decoded) {
                console.log("decoded is : ", decoded);
                req.decoded = decoded;
                next();
            } else {
                const error=createError(401,httpStatusText.FAIL,"invalid token !")
                throw (error)
                // res.status(401).send({ message: "unauthorized" })
            }
        }
    } catch (error) {
        const file_Path = path.join(__dirname, '../public/error.html');

        const html_Content=fs.readFileSync(file_Path,"utf-8");
        if(req.params.token){
            res.status(401).end(html_Content.replace("{{error_message}}",error.message));

        }else{
            res.status(401).json({status:401,statusText:"Fail", message: error.message })

        }
    }

}

module.exports = {
    generateToken,
    verify
}
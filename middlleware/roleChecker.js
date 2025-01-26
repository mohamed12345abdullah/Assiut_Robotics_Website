const member = require("../mongoose.models/member");
const createError = require("../utils/createError");
const asyncWrapper = require("./asyncWrapper");



const roles=["admin","head","leader"]
module.exports=asyncWrapper (
    async (req,res,next)=>{
        const {email}=req.decoded;
        const admin=member.findOne({email}).role;
        if(! roles.includes(role)){
            const error=createError(401, httpStatusText.FAIL,"un authorized")
            throw(error);
        }
        next()
    }
)
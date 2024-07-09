const jwt = require('jsonwebtoken');
const secret = "qwertyuiop1234567890asdfghjkl"
const generateToken = async (payload, rememberMe) => {

    try {
        // if(rememberMe){
        // const token=await jwt.sign(payload, secret,{});
        // console.log("remember me");
        // return token;
        // }else{
        const token = await jwt.sign(payload, secret, { expiresIn: rememberMe || "2h" });
        return token;
        // }

    } catch (error) {
        return error;
    }
}


const verify = async (req, res, next) => {
    try {
        const token = req.body.token || req.params.token;
        console.log(token);
        if (!token) {
            res.status(401).send({ message: "token is required" });
        } else {
            const decoded = await jwt.verify(token, secret);
            if (decoded) {
                console.log("decoded is : ", decoded);
                req.decoded = decoded;
                next();
            } else {
                res.status(401).send({ message: "unauthorized" })
            }
        }
    } catch (error) {

        res.status(401).send({ message: error.message })
    }

}

module.exports = {
    generateToken,
    verify
}
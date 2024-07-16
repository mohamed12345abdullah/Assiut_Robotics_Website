const speakeasy = require("speakeasy");
const secret = speakeasy.generateSecret({ length: 20 });
const httpStatusText = require('./httpStatusText');

const generateOtp = async () => {

    const code = speakeasy.totp({

        // Use the Base32 encoding of the secret key 
        secret: secret.base32,

        // Tell Speakeasy to use the Base32  
        // encoding format for the secret key 
        encoding: 'base32',
        // step:100
    });

    console.log('Secret: ', secret.base32);
    console.log('Code: ', code);
    return code;
}




const verifyOtp = async (req, res, next) => {
    try {

        var tokenValidates = speakeasy.totp.verify({
            secret: secret.base32,
            encoding: 'base32',
            token: req.body.code,
            window: 6

        });
        if (tokenValidates) {
            req.okOTP = tokenValidates;
            next();
        } else {
            res.status(404).json({
                status: httpStatusText.FAIL,
                data: null,
                message: "not okkkk"
            })
        }
    } catch (error) {
        res.status(404).json({
            // status:httpStatusText.FAIL,
            // data:null,
            message: error.message
        })

    }
}

module.exports = {
    generateOtp,
    verifyOtp
}
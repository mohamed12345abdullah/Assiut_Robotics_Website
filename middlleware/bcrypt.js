const bcrypt = require("bcryptjs");

const hashing = async (password) => {
    try {
        const hashedpass = await bcrypt.hash(password, 10);
        return hashedpass;
    } catch (error) {
        console.log(error);
        // res.status(400).send({message:"error in hashing password"})
    }
};

const comparePassword = async (password, hash) => {
    try {
        const truepass = await bcrypt.compare(password, hash);
        console.log(truepass);
        return truepass;
    } catch (error) {
        res.status(400).send({ message: "error in hashing password" });
    }
};

module.exports = {
    hashing,
    comparePassword,
};

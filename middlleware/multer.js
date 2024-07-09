const multer = require("multer");
const diskStorage = multer.diskStorage({
        destination: (req, file, cb) => {
                console.log("file", file);
                cb(null, "uploads/");
        },
        filename: (req, file, cb) => {
                const ext = file.mimetype.split("/")[1];
                const filename = req.body.email + `_profile_pic.${ext}`;
                cb(null, filename);
        },
});

const fileFilter = (req, file, cb) => {
        const imageType = file.mimetype.split("/")[0];
        if (imageType == "image") {
                return cb(null, true);
        } else {
                return cb("I don't have a clue!", false);
        }
};
const upload = multer({
        storage: diskStorage,
        fileFilter: fileFilter,
});

const uploadFile = async (req, res, next) => {
        try {
                upload.single("avatar");
                console.log("in multer");
                next();
        } catch (error) {
                return res.status(400).send({ message: error.message });
        }
};

module.exports = {
        uploadFile,
};

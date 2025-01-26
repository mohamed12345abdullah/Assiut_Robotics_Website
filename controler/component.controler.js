require("dotenv").config();
const MONGOURL = process.env.MONGOURL;
const mongoose = require("mongoose");
mongoose.connect(MONGOURL);
const component = require("../mongoose.models/component");

const cloudinary=require('../utils/cloudinary');
const { uploadToCloud } = require("../utils/cloudinary");

const addComponent = async (req, res) => {
    try {



        // if (!req.file) {
        //     return res.status(400).send('No file uploaded.');
        // }

        // // Upload image to Cloudinary using the utility function
        // const imageUrl = await uploadToCloud(req.file.path); // Passing the file path to Cloudinary

       console.log("body : : ",);

        const { title, price, taxes, ads, discount, total, category } = req.body;

        //console.log(req.file.originalname);
        // const component_image=await cloudinary.uploadToCloud(req.myFileName) ;
        // console.log("file name",req.myFileName);
        const newComponent = await new component({
            title,
            image:req.imageUrl,
            price,
            taxes,
            ads,
            discount,
            total,
            category,
        });

        await newComponent.save();

        res.status(200).send({ message: "add component successfully" });
    } catch (error) {
        console.log(error);
        
        res.status(400).send({ message: error.message });
    }
}; 

const getCombonent = async (req, res) => {
    try {
        const components = await component.find({});

        res.status(200).send({ message: "get daa sucessfully", data: components });
    } catch (error) {
        res.status(404).send({ message: "not found" });
    }
};

const updateComponent = async (req, res) => {
    try {
        console.log(req.body);
        // const {id, title,  price, taxes , ads, discount, total, category } = req.body;
        await component.findByIdAndUpdate(req.body.id, req.body.newpro);

        res.status(200).send({ message: "updated" });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

const deleteAll = async (req, res) => {
    try {
        await component.deleteMany({});
        res.status(200).send({ message: "deleted" });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

const deleteOne = async (req, res) => {
    try {
        console.log("delete one");
        const id = req.body.id;
        await component.findByIdAndDelete(id);
        res.status(200).send({ message: "deleted" });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

module.exports = {
    addComponent,
    getCombonent,
    updateComponent,
    deleteAll,
    deleteOne,
};

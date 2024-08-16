const mongoose = require("mongoose");

const componentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image:{
    type:String,
    required:true
  },
  price: {
    type: Number,
    // required: true,
  },
  taxes: {
    type: Number,
    // required: true,
  },
  ads: {
    type: Number,
    // required: true,
  },
  discount: {
    type: Number,
    // required: true,
  },
  total: {
    type: Number,
    // required: true,
  },
  category: {
    type: String,
    // required: true,
  },
});

const componentModel = mongoose.model("Component", componentSchema);

module.exports = componentModel;

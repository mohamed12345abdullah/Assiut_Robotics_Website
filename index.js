
const express = require('express');
const path = require("path")

const app = express();



app.listen(5000, () => {
    console.log("server is run and listen to port : ", `http://localhost:${5000}/`);
})
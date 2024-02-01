const express=require('express');

const memberControler=require("../controler/member.controler");

const Router=express.Router();

Router.route("/createAccount")
        .post(memberControler.createAccount)





module.exports=Router;        
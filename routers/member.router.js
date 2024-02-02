const express=require('express');

const memberControler=require("../controler/member.controler");

const Router=express.Router();

Router.route("/createAccount")
        .post(memberControler.createAccount)

Router.route("/getAllMembers")
        .get(memberControler.getAllMembers)

Router.route("/login")
        .post(memberControler.login)
module.exports=Router;        
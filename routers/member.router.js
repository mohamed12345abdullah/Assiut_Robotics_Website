const express=require('express');

const memberControler=require("../controler/member.controler");
const JWT=require('../middlleware/jwt')
const Router=express.Router();

Router.route("/createAccount")
        .post(memberControler.createAccount)

Router.route("/getAllMembers")
        .get(memberControler.getAllMembers)

Router.route("/login")
        .post(memberControler.login);

Router.route("/verify")
        .post(JWT.verify,memberControler.verify);


Router.route("/confirm")
        .post(JWT.verify, memberControler.confirm);

Router.route("/changeHead")
        .post(memberControler.changeHead);


Router.route("/hr")
        .post(JWT.verify, memberControler.controleHR);

module.exports=Router;        
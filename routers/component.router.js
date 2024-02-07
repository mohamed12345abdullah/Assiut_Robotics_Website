const express=require('express');

const componentControler=require("../controler/component.controler");
const JWT=require('../middlleware/jwt');
const Router=express.Router();


Router.route('/add')
        .post(componentControler.addComponent );

Router.route('/getComponents')
        .get(componentControler.getCombonent);

Router.route('/update')
        .post(componentControler.updateComponent);
Router.route('/deleteAll')
        .get(componentControler.deleteAll);
Router.route('/deleteOne')
        .post(componentControler.deleteOne);



module.exports=Router;
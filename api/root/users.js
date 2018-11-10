
const express = require('express');
const db = require('../db.js');
const helper = require('../helper.js');
const E = require('../messages.js');
const app = express();

app.get('/', async (req,res)=>{
    res.json(helper.success({name: req.user.name}));
});
app.post('/', async (req,res)=>{
    let name = req.body.login;
    let pass = req.body.password;

    let userExists = await db.userExists(name);
    if(userExists){
        res.json(helper.error(E.userExists));
        return;
    }

    db.addUser(name,pass);
    res.json(helper.success(E.registered));
});

module.exports = app;


const express = require('express');
const db = require('../db.js');
const helper = require('../helper.js');
const E = require('../messages.js');
const app = express();

app.post('/', async (req,res)=>{
    let name = req.body.login;
    let pass = req.body.password;

    let r = await db.loginUser(name,pass);

    if(!r){
        res.json(helper.error(E.badLogins));
        return;
    }

    res.json(helper.success({token: r.user._id+':'+r.token}));

});

module.exports = app;

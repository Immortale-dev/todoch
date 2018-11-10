
const express = require('express');
const db = require('../db.js');
const helper = require('../helper.js');
const E = require('../messages.js');
const app = express();

app.get('/', async (req,res)=>{
    let todos = await db.getTodos(req.user._id);
    res.json(helper.success(todos));
});

app.post('/', async(req,res)=>{
    //let {title, description, date, checked} = req.body;
    db.addTodo(req.user._id, req.body);
    res.json(helper.success());
});

app.delete('/:id/', async(req,res)=>{
    db.deleteTodo(req.user._id, req.params.id);
    res.json(helper.success());
})

app.put('/:id/', async(req,res)=>{
    db.changeTodo(req.user._id, req.params.id, req.body);
    res.json(helper.success());
});

module.exports = app;

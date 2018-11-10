
const express = require('express');
const auth = require('./auth.js');
const users = require('./root/users.js');
const sessions = require('./root/sessions.js');
const todos = require('./root/todos.js');

const app = express();

app.use(express.json());

app.all("*", auth);

app.use('/users/', users);
app.use('/sessions/', sessions);
app.use('/todos/', todos);



module.exports = app;

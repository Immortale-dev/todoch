const express = require('express');
const http = require('http');
const path = require('path');

const app = express();
const api = require('./api/index.js');
const port = process.env.PORT || 3001;

app.use('/api', api);

app.get('/', function(req,res){
    res.end("Hello World");
});

const server = http.createServer(app);

server.listen(port, ()=>{ console.log('Listen '+port); });

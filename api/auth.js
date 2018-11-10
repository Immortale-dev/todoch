const helper = require('./helper.js');
const E = require('./messages.js');
const db = require('./db.js');

function auth(req,res,next){

    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Headers', ['Authorization', 'Content-Type']);
    res.append('Access-Control-Allow-Methods', ['PUT', 'POST', 'GET', 'DELETE']);


    //console.log("TEST: ",req.path.toLowerCase(),req.method,req.header('Authorization'));

    if(except(req)){
        next();
        return;
    }

    if(!req.header('Authorization'))
        return res.json(helper.notAuthorized());

    let authToken = req.header('Authorization');

    db.getUserToken(authToken).then((user)=>{
        if(!user.length)
            return res.json(helper.notAuthorized());

        user = user[0];

        req.user = user;
        next();
    });


}

function except(req){
    if(
        req.method == 'POST' && /^\/users\/?$/.test(req.path.toLowerCase()) ||
        req.method == 'POST' && /^\/sessions\/?$/.test(req.path.toLowerCase())
    ){
        return true;
    }
    return false;
}

module.exports = auth;

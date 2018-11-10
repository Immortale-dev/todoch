const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
let url = "mongodb://localhost:27017/";
let crypto = require('crypto');


class DB{

    constructor(){
        this._conn().then((db)=>{
            this.db = db;
        });
    }

    async userExists(name){
        let db = this.db;
        return new Promise((resolve, reject)=>{
            db.collection("users").find({name: name}).toArray((err, res)=>{
                resolve(res.length);
            });
        });
    }

    async addUser(name, password){
        let db = this.db;
        let pass = this._hash(password);
        let token = this._generateToken();
        return new Promise((resolve, reject)=>{
            db.collection("users").insertOne({name: name, password: pass, token: token}, (err,res)=>{
                if(err) throw err;
                resolve(res);
            })
        });
    }

    async getUser(name, password){
        let db = this.db;
        let pass = crypto.createHash('md5').update(password).digest("hex");
        return new Promise((resolve, reject)=>{
            db.collection("users").find({name: name, password: pass}).toArray((err, res)=>{
                resolve(res);
            });
        });
    }

    async getUserToken(token){
        let db = this.db;
        let tokenArr = token.split(':');
        let [uId,uToken] = tokenArr;
        return new Promise((resolve, reject)=>{
            db.collection("users").find({_id: ObjectId(uId), token: uToken}).toArray((err, res)=>{
                resolve(res);
            });
        });
    }

    async loginUser(name, password){

        let user = await this.getUser(name, password);
        let db = this.db;

        return new Promise((resolve, reject)=>{
            if(!user.length){
                return resolve(null);
            }
            user = user[0];
            let token = this._generateToken();
            db.collection('users').updateOne({ "_id" : user._id }, { $set: { "token" : token } }, (err,res)=>{
                resolve({user,token});
            });
        });
    }

    async getTodos(userId){
        let db = this.db;
        return new Promise((resolve, reject)=>{
            db.collection("todos").find({userId: ObjectId(userId)}).toArray((err, res)=>{
                if(err) throw err;
                resolve(res);
            });
        });
    }

    async addTodo(userId, todo){
        let db = this.db;
        return new Promise((resolve, reject)=>{
            db.collection("todos").insertOne({title: todo.title, description: todo.description, date: todo.date, checked: todo.checked, userId: ObjectId(userId)}, (err,res)=>{
                if(err) throw err;
                resolve(res);
            });
        });
    }

    async changeTodo(userId, tId, todo){
        let db = this.db;
        return new Promise((resolve, reject)=>{
            db.collection("todos").updateOne({userId: ObjectId(userId), _id: ObjectId(tId)}, { $set: {checked: todo.checked} }, (err,res)=>{
                if(err) throw err;
                resolve(res);
            });
        });
    }

    async deleteTodo(userId, tId){
        let db = this.db;
        return new Promise((resolve, reject)=>{
            db.collection("todos").deleteOne({userId: ObjectId(userId), _id: ObjectId(tId)}, (err, res)=>{
                if(err) throw err;
                resolve(res);
            });
        });
    }

    async _conn(){
        return new Promise((resolve,reject)=>{
            MongoClient.connect(url, { useNewUrlParser: true }, function(err, dbo) {
                let db = dbo.db('todoch');
                if (err) throw err;

                resolve(db);

                process.on('SIGINT', function() {
                  dbo.close(function () {
                    console.log('Mongoose disconnected on app termination');
                    process.exit(0);
                  });
                });
                //db.close();
            });
        });
    }

    _generateToken(){
        return this._hash(Math.random().toString());
    }

    _hash(val){
        return crypto.createHash('md5').update(val).digest("hex")
    }

};

module.exports = new DB();

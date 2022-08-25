const { ServerApiVersion } = require('mongodb');

require('dotenv').config({path:"../.env"});
const MongoClient = require('mongodb').MongoClient;
module.exports  = async function getDb(){
    const db =  await MongoClient.connect(process.env.MONGO_URI,{
        useNewUrlParser:true,useUnifiedTopology:true,serverapi:ServerApiVersion.v1
    });
    return db.db(process.env.DB_NAME); 
}

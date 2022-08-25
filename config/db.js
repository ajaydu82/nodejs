require('dotenv').config({path:"../.env"});
const MongoClient = require('mongodb').MongoClient;
module.exports  = async function getDb(){
    const db =  await MongoClient.connect(process.env.MONGO_URI);
    return db.db(process.env.DB_NAME); 
}

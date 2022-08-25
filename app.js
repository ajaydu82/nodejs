const express = require("express");
const auth = require("./routes/Auth")
const product = require("./routes/Product")
const user = require("./model/user");
const AuthMiddleware = require('./middleware/AuthMiddleware');
const crud = require("./routes/crud");
var cors = require('cors')
const app = express();

app.use(express.json());
app.use(cors())

// middle ware
app.use((req,res,next)=>{
 res.setHeader("Access-Control-Allow-Orgin","*")
 res.setHeader("Access-Control-Allow-Method","GET","POST","PUT","Delete")
 res.setHeader("Access-Control-Allow-Headers","X-Requested-Width,Content-type")
 res.setHeader("Access-Control-Allow-Credentials",true)
 //res.writeHead(200,{'Content-Type':'application/json'})
 next();
})
app.use("/",(req,res,next)=>{
    // res.send("connected")
    next()
})
app.use("/auth",auth);
app.use("/product",AuthMiddleware.isValidToken,product);
app.use("/crud",AuthMiddleware.isValidToken,crud);
// app.use("/crud",crud);


module.exports = app;
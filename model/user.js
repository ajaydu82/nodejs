//const { constants } = require("crypto");
const connectDB = require("../config/db")
const validation = require("../constant/Constant");
const message = require("../constant/Message");
const constant=require("../constant/constant")
module.exports = {
    //    signUp:async function(signupData){
    //   const database =  await connectDB()
    //             if(validation.emailValidation(signupData.email)){
    //                 try{
    //                 database.collection("class").insertOne(signupData) 
    //                 const response = {};
    //                 response.name = signupData.name;
    //                 response.email= signupData.email;
    //                 response.status = "success";
    //                 return response;
    //                 }catch(err){
    //                     return {
    //                         "status":"failed",
    //                         "message":"duplicate email not allowed"
    //                     }
    //                 }



    //             }
    //             else{   
    //                 return  {
    //                     "status":"failed",
    //                     "message":"invalid email"
    //                 }
    //             }  
    //    }
    signUp: async function (signupData) {
        const database = await connectDB();
        const data = await validation.encrypt(signupData);
        return database.collection("class").insertOne(data)

    }
    ,

    login: async function (logindata) {
        database = await connectDB()
        const pass = await database.collection("class").findOne({ email: logindata.email }, { projection: { password: 1, name: 1 }, })
        if (pass && pass) {
            if (await validation.compPassword(logindata.password, pass.password)) {
                const token = constant.generateToken({ name: pass.name, logindata: logindata.email, userId: pass._id });
                console.log(token)
                const res = {
                    status: 'success',
                    message: 'Authentication Success',
                    token: token

                }
                return res;

            }
            else {
                const res = {
                    status: 'failed',
                    message: 'Password is invalid'
                }
                return res;
              }

        }
        else{
            const res = {
                status:'failed',
                message:'Invalid Email'
            }
            return res;
        }
    
    },
    getAlluser: async function () {
        const database = await connectDB()
        return database.collection("stud").find().toArray();
    }
    ,
    getuser: async function () {
        const database = await connectDB()
        return database.collection("stud").find().toArray();
    }
    ,
    postuser: async function () {
        const database = await connectDB()
        return database.collection("class").find().toArray();
    },
    updatetuser: async function () {
        const database = await connectDB()
        return database.collection("stud").find().toArray();
    }

}



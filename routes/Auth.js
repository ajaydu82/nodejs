const express = require("express");
const user = require("../model/user");
const router = express.Router();

router.post("/signup",async (request,response)=>{
   const data = request.body;
   const  result = await user.signUp(data);
   response.json(result)
})
router.post("/login",async (request,response)=>{
    const data = request.body;
    const  result = await user.login(data);
    response.json(result)
 })
 router.get("/users",async (request,response)=>{
    const  result = await user.getAlluser();
    response.json(result)
 })

module.exports = router;
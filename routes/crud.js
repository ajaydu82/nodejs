const express = require("express");
const user = require("../model/user");
const employee = require("../model/empolyee");

const router = express.Router();
const app = express();

app.use(express.json());

router.get("/getinguser",async(request,response)=>{
const res={};
try{
res.status=true;
res.data=request.query;
employee.getall_user(request.query).then((result)=>{
return response.json(result)
})
}catch(error){
     res.status=false;
     res.message="invalid url";
     return res
}
})
// router.get("/geting", async (request, response) => {
//     const result = await employee.getuser();
//     response.json(resul7t)
//     // console.log(response);
//     // response.send({name:"ajay"})
// })
router.get("/geting", async (request, response) => {
    const data = request.body;
    console.log(data)
    employee.getuser().then((result) => {
        const res = {
            data: result
        }
        return response.json(res)
    });
})
router.post("/posting", async (request, response) => {
    const data = request.body;
    employee.postuser(data).then((result)=>{
        return response.json(result)
    })
   
})
router.put("/updating/:id", async (request, response) => {
    const data=request.params;
    const body =request.body 

     employee.updateuser(data.id,body).then((result)=>{
     return response.json(result)
    })

    
   // return response.send({ result: "update" })
})
router.delete("/deleting/:id", async (request, response) => {
    const data=request.params;
    console.log(data.id);
      employee.deleteuser(data.id).then((result)=>{
     return response.json(result)
    })

    
   // return response.send({ result: "update" })
})

module.exports = router;
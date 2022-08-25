const jwt= require('jsonwebtoken');
require('dotenv').config({path:"../.env"});
module.exports = {isValidToken:function(request,response,next)
    {
    try{
      
    const token=request.headers['authorization'].split(" ")[1];
    console.log(token)
    const isYes=jwt.verify(token,process.env.SECRET_KEY);
    console.log(isYes.userId);
    if(isYes){
        next()
    }
    else{
    return response.status(401).json({status:'faild',message:'unauthorized token was expired'})
    
    }
}
    catch(err){
        return response.status(401).json({status:'faild',message:'unauthorized token was expired'})

    }
}

}
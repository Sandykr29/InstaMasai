const jwt = require('jsonwebtoken')

const auth=(req,res,next)=>{
    let token=req.headers.authorization?.split(' ')[1];
    if(token){
        const decoded = jwt.verify(token, 'user');
        req.body.userID=decoded.userID;
        req.body.email=decoded.email
        console.log(decoded)
        next();
    }
    else{
        res.status(400).send({msg:"You are not authorized..."})
    }
}
module.exports={
    auth
}
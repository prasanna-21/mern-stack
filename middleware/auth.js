const jwt=require('jsonwebtoken');
const config=require('config')

const auth=(req,res,next)=>{
    const token=req.header('x-auth-token');
    if(!token) res.status(401).send("no token,authorization denied")
    try{
        const decode=jwt.verify(token,config.get('jwt_secrete'));
        req.id=decode._id;
        console.log(req.id)
        next()
    }catch(err){
        res.status(401).send("token not valid")
    }
    
}
module.exports=auth;
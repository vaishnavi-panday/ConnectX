const jwt = require('jsonwebtoken')
async function authUser(req,res,next){
const token = req.cookies.token;
console.log("token" , token)
    if(!token){
        return res.status(401).json({
            message:"invalid user"
        })
    }
    try{
        const decoded = jwt.verify(token , process.env.JWT_SECRET_KEY);
        if(!decoded){
            return res.status(401).json({
                message:"unauthorized"
            })
        }
        console.log("DECODED:", decoded);
        req.user = decoded;
        next()
     }catch(error){
        console.log(error)
        res.status(401).json({
            message:"unauthorized"
        })
    }
    
}
    module.exports = {authUser}
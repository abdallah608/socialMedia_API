import jwt from "jsonwebtoken"
import appError from "../../utilities/error/appError.js"
export const auth = (req,res,next)=>{
    let authorization = req.headers["authorization"]
    if(!authorization || (authorization && authorization.startsWith(process.env.authorizationStart)==false)){
      return next(new appError("Invalid token or didn't provided",401))}
        let token = authorization.split(" ")[1]
        jwt.verify(token,process.env.secretKey,(err,decoded)=>{
            if(err){return next(new appError("Invalid token or didn't provided",403))}   
                req.userId=decoded.id
                next()
            
        })
    
}

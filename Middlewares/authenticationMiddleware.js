import jwt from "jsonwebtoken" ;
export let isauthenticated = (req,res,next) => {
    let token = req.headers.token
    const secret_key = process.env.JWT_SECRET ;
    if(!token){
     return   res.status(401).json({message:"no token provided"})
    }
      jwt.verify(token, secret_key, async(err, decoded) => {
           if(err){
               return res.status(401).json({message: "Invalid Token"})
           }else{
                req.user = decoded
               next();
           }
       })
}

export const guestOrUserAuthentication = async (req, res, next) => {
    const token = req.headers.token;

    if (!token) {
      return next(); // guest user
    }

    const secret_key = process.env.JWT_SECRET ;

    jwt.verify(token, secret_key, async(err, decoded) => {
        if(err){
            return res.status(401).json({message: "Invalid Token"})
        }else{
            req.user = decoded
            next();
        }
    })
};

import jwt from "jsonwebtoken" ;
export let isauthenticated = (req,res,next) => {
    const authHeader = req.headers.authorization;
    const secret_key = process.env.JWT_SECRET;

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
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
  const authHeader = req.headers.authorization;
  const secret_key = process.env.JWT_SECRET;

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
     if (!token) {
      return next(); // guest user
    }

  jwt.verify(token, secret_key, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid Token" });
    }
    req.user = decoded;
    next();
  });
};





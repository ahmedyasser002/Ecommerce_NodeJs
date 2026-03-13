import { userModel } from "../Models/User.js"
export const checkEmail =async (req,res,next)=>{
    let founduser = await userModel.findOne({email:req.body.email});
    if(req.url=="/signup"){
        if(founduser){
          return  res.status(422).json({message:"User already exists , enter another email"})
        }
        next(); 
    }
    else{
        if(founduser){
            req.founduser =founduser
            next();
        }
        else{
            return res.status(422).json({message: "Invalid Password or Email"})

        }
    }
}

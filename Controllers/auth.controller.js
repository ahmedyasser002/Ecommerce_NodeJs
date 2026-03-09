import { userModel } from "../Models/User.js" ;
import jwt from "jsonwebtoken" ;
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import asyncHandler from "../Middlewares/asyncHandler.js"



let signup = asyncHandler( async (req , res)=>{
    let newUser = await userModel.create(req.body);
    newUser.password  = undefined ;
    res.status(200).json({message:"user created succsefully" , payload : newUser})

}
)

let signin = asyncHandler(async(req , res )=>{
    let founduser = req.founduser ;
    let ismatched = bcrypt.compareSync( req.body.password,founduser.password);
    if(ismatched){
        const secret_key = process.env.JWT_SECRET ;
        let token  = jwt.sign({role:founduser.role , email:founduser.email , _id :founduser._id} , secret_key);
        return res.json({message: "Hello", data: founduser, token: token})
    }
            res.status(422).json({message: "Invalid Password or Email"})


}
)
export {signup , signin }
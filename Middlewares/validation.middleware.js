import { signupValidation , loginValidation } from "../Validations/userValidation.js";


export const validationforRegisteation = (req,res,next)=>{
    let validationResult = signupValidation.validate(req.body)
    if(validationResult.error){
        return res.status(422).json({message:validationResult.error.details[0].message})
    }
    next();
}

export const validationforLogin = (req,res,next)=>{
    let validationResult = loginValidation.validate(req.body)
    if(validationResult.error){
       return res.status(422).json({message:validationResult.error.details[0].message})
    }
    next();
}
import { reviewValidationSchema } from "../Validations/reviewValidation.js";


export const validationforReview = (req,res,next)=>{
    let validationResult = reviewValidationSchema.validate(req.body)
    if(validationResult.error){
        return res.status(422).json({message:validationResult.error.details[0].message})
    }
    next();
}

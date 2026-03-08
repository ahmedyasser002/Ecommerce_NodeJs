import Joi from "joi" ;

const attributes  ={
    name:Joi.string().max(30).min(3).messages({
        "string.empty":"name is required" ,
        "string.min":"name length must be greater than or equal to 3",
        "string.max":"name length must be less than or equal to 30 "

    }) ,
    phone :Joi.string().pattern(new RegExp('^01[0125][0-9]{8}$')).messages({
        "string.pattern.base":"phone must match egyption phone patterns" 
    }) ,
    password:Joi.string().required().pattern(new RegExp('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,16}$')).messages({
        "string.pattern.base":"Password must contain at least one uppercase letter, one lowercase letter, and one number" ,
        "string.empty":"password is required"
    }) ,
        email:Joi.string().required().pattern(new RegExp('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')).messages({
        "string.pattern.base":"email must be a valid email" ,
        "string.empty":"email is required"
    }) ,
    address:Joi.object({
        street:Joi.string().max(100).min(5).required().messages({
             "string.min":"street length must be greater than or equal to 5",
              "string.max":"street length must be less than or equal to 100 ",
            "string.empty":"street is required"

               }),
        country:Joi.string().min(3).max(30).required().messages({
              "string.min":"country length must be greater than or equal to 3",
              "string.max":"country length must be less than or equal to 30 ",
              "string.empty":"country is required"

        }),
        apartment_details:Joi.string().max(100).min(3).required().messages({
             "string.min":"apartment_details length must be greater than or equal to 3",
              "string.max":"apartment_details length must be less than or equal to 100 ",
                      "string.empty":"apartment_details is required"

        }),
        city:Joi.string().min(3).max(30).required().messages({
            "string.min":"city length must be greater than or equal to 3",
            "string.max":"city length must be less than or equal to 30 ",
            "string.empty":"city is required"

        })
        }).unknown(false)

}

export const signupValidation = Joi.object({
    email:attributes.email , 
    password:attributes.password ,
    name:attributes.name ,
    address:attributes.address,
    phone:attributes.phone
})
export const loginValidation= Joi.object({
    email:attributes.email ,
    password:attributes.password 
})

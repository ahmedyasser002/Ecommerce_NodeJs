import Joi from "joi";

const categoryValidationSchema = Joi.object({ 
    name: Joi.string().required(),
    isActive: Joi.boolean(),
    priority: Joi.number()
})

export default categoryValidationSchema;
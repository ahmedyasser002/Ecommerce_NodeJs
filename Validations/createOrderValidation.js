import Joi from "joi"
import { objectIdValidator } from "../Utils/validators.js"

export const createOrderSchema = Joi.object({

    products: Joi.array().items(

        Joi.object({
            productId: Joi.string().custom(objectIdValidator, "ObjectId validation").required(),
            quantity: Joi.number().integer().min(1).required()
        })

    ).min(1).required(),

    paymentMethod: Joi.string()
        .valid("card","cash_on_delivery","wallet")
        .required(),

    address: Joi.object({
        country: Joi.string().max(50).required(),
        city: Joi.string().max(50).required(),
        street: Joi.string().max(100).required(),
        apartment_details: Joi.string().max(50).optional()
    }).required()

})
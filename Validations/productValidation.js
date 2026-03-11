import Joi from "joi";
import { objectIdValidator } from "../Utils/validators.js";



export const productSchemaValidation = Joi.object({
  name: Joi.string().min(3).required(),
  description: Joi.string().min(10).required(),
  price: Joi.number().min(0).required(),
  category: Joi.string().custom(objectIdValidator, "ObjectId validation").required(),
  attributes: Joi.object().pattern(Joi.string(), Joi.string()),
  stock: Joi.number().min(5).required(),
  images: Joi.array().items(Joi.string().uri()),
});

export const productUpdateSchema = Joi.object({
  name: Joi.string().min(3),
  description: Joi.string().min(10),
  price: Joi.number().min(0),
  category: Joi.string().custom(objectIdValidator),
  attributes: Joi.object().pattern(Joi.string(), Joi.string()),
  stock: Joi.number().min(5),
  images: Joi.array().items(Joi.string().uri()),
}).min(1);
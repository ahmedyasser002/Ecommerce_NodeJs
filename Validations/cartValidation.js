import Joi from "joi";

const cartAttributes = {
  productId: Joi.string()
    .hex()
    .length(24)
    .required()
    .messages({
      "string.base": "Product id must be a string",
      "string.hex": "Product id must be a valid ObjectId",
      "string.length": "Product id must be 24 characters",
      "any.required": "Product id is required"
    }),

  quantity: Joi.number()
    .integer()
    .min(1)
    .messages({
      "number.base": "Quantity must be a number",
      "number.integer": "Quantity must be an integer",
      "number.min": "Quantity must be at least 1"
    })
};


const addToCartSchema = Joi.object({
  productId: cartAttributes.productId,
  quantity: cartAttributes.quantity.default(1)
});

const updateProductQuantitySchema = Joi.object({
  productId: cartAttributes.productId,
  quantity: cartAttributes.quantity.required()
});

const deleteProductInCartSchema = Joi.object({
  productId: cartAttributes.productId
});

export { addToCartSchema, updateProductQuantitySchema, deleteProductInCartSchema };

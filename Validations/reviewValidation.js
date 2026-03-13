import Joi from "joi";

 const attributes = {
    product_id: Joi.string().hex().length(24).required().messages({
        "string.length": "product_id must be 24 characters",
        "string.hex": "product_id must be a valid ObjectId",
        "string.required": "product_id is required"
    }),
    content: Joi.string().min(3).max(100).messages({
        "string.min": "the content length must be greater than 3 characters",
        "string.max": "the content length must be less than 100 characters"
    }),
    rating: Joi.number().integer().min(0).max(10).required().messages({
        "number.base": "rating must be a number",
        "number.min": "the rating must be between 0 and 10",
        "number.max": "the rating must be between 0 and 10",
        "number.required": "the rating is required"
    })
};

export const createReviewSchema = Joi.object({
        product_id:attributes.product_id ,
        content:attributes.content ,
        rating:attributes.rating
})
export const updateReviewSchema = Joi.object({
    content: attributes.content,
    rating: attributes.rating
});
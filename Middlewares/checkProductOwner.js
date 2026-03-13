import { productModel } from "../Models/Product.js"
import AppError from "../Utils/AppError.js";
import { validateObjectId } from "../Utils/validators.js";
import asyncHandler from "./asyncHandler.js";

export const checkProductOwner = asyncHandler(
    async(req,res,next) =>{

        const productID = req.params.id
        if (!validateObjectId(productID)) {
                    throw new AppError("Invalid Product ID", 400);
                }
        const product = await productModel.findById(productID);
        if(!product){
            throw new AppError("Product not found", 404);
        }

        if(!product.seller.equals(req.user._id)){
            throw new AppError("This is not product owner", 403);

        }
        next();

}
)
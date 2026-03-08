import asyncHandler from "../Middlewares/asyncHandler.js"
import { productModel } from "../Models/Product.js"

let addProduct = asyncHandler(
    async(req,res) =>{

        let user = req.user
        req.body.seller = user._id
        let newProduct = await productModel.insertMany(req.body);
        res.status(201).json({ message: "Product Created", data: newProduct })


    }

)

export { addProduct }
import asyncHandler from "../Middlewares/asyncHandler.js"
import { productModel } from "../Models/Product.js"
import AppError from "../Utils/AppError.js";
import { productSchemaValidation } from "../Validations/productValidation.js"

let addProduct = asyncHandler(
    async(req,res) =>{

        const { error } = productSchemaValidation.validate((req.body));
        if(error){
            throw new AppError(error.details ,400)
        }

        let user = req.user
        req.body.seller = user._id
        let newProduct = await productModel.insertMany(req.body);
        res.status(201).json({ message: "Product Created", data: newProduct })


    }

)

let getAllProducts = asyncHandler(
    async(req,res)=>{
        let allProducts = await productModel.find();
        res.status(200).json({ message: "List of Products ", data: allProducts })
    }
)

export { addProduct , getAllProducts }
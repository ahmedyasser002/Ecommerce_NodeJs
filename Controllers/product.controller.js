import asyncHandler from "../Middlewares/asyncHandler.js"
import { productModel } from "../Models/Product.js"
import AppError from "../Utils/AppError.js";
import { productSchemaValidation } from "../Validations/productValidation.js"

let addProduct = asyncHandler(
    async(req,res) =>{

        let user = req.user
        req.body.seller = user._id
        let newProduct = await productModel.create(req.body);
        res.status(201).json({ message: "Product Created", data: newProduct })


    }

)

let getAllProducts = asyncHandler(
    async(req,res)=>{

    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    let skip = (page-1) * limit;
    let products = await productModel.find()
      .skip(skip) 
      .limit(limit) 
      
    const totalDocuments = await productModel.countDocuments();
    
    res.status(200).json({
      page,
      limit,
      totalDocuments,
      totalPages: Math.ceil(totalDocuments / limit),
      products
    });
  
    }
)

export { addProduct , getAllProducts }
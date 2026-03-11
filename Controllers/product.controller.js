import asyncHandler from "../Middlewares/asyncHandler.js"
import { productModel } from "../Models/Product.js"
import AppError from "../Utils/AppError.js";
import { getPagination } from "../Utils/pagination.js";
import { objectIdValidator } from "../Utils/validators.js";

const addProduct = asyncHandler(
    async(req,res) =>{

        const user = req.user
        req.body.seller = user._id
        const newProduct = await productModel.create(req.body);
        res.status(201).json({ message: "Product Created", data: newProduct })


    }

)

const getAllProducts = asyncHandler(
    async(req,res)=>{
    
    const { page , limit , skip } = getPagination(req);
    const products = await productModel.find()
      .skip(skip) 
      .limit(limit)
      .sort({ createdAt: -1 })
      .populate("category","name")
      .populate("seller", "name")


    // Search about estimatedCountDocuments  
    const totalDocuments = await productModel.countDocuments();
    
    res.status(200).json({
      page,
      limit,
      totalDocuments,
      totalPages: Math.ceil(totalDocuments / limit),
      data:products
    });
  
    }
)

const getSellerProducts = asyncHandler(
    async(req,res)=>{

        const { page , limit , skip } = getPagination(req);
        const seller = req.user._id;
        const totalDocuments = await productModel.countDocuments({ seller });


        const products = await productModel.find({ seller })
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 })
            .populate("category", "name")
            ;

        res.status(200).json({
            success: true,
            message: "Seller products listed successfully",
            page,
            limit,
            totalDocuments,
            totalPages: Math.ceil(totalDocuments / limit),
            data: products
        });

    }
)

const updateSellerProduct = asyncHandler(
    async(req,res)=>{
        const productID = req.params.id;
         if (!objectIdValidator(productID)) {
            throw new AppError("Invalid Product ID", 400);
        }
        const updatedProduct = await productModel.findByIdAndUpdate(productID, req.body, {new:true,runValidators: true
        });
        if(!updatedProduct){
            throw new AppError("Product not found", 404);
        }

        res.status(200).json({ message: "Product Updated", data: updatedProduct })


    }
)




export { addProduct , getAllProducts, getSellerProducts, updateSellerProduct }
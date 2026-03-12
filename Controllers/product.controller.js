import asyncHandler from "../Middlewares/asyncHandler.js"
import { productModel } from "../Models/Product.js"
import { userModel } from "../Models/User.js"

import AppError from "../Utils/AppError.js";
import { getPagination } from "../Utils/pagination.js";
import { validateObjectId } from "../Utils/validators.js";

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
    const { name, category, minPrice, maxPrice, sellerName } = req.query;
    const query = {};

    if (name) {
        query.name = { $regex: name, $options: "i" };
    }

    if (category) {
        query.category = category;
    }

    if (minPrice || maxPrice) {
        query.price = {};

        if (minPrice) query.price.$gte = minPrice;
        if (maxPrice) query.price.$lte = maxPrice;
    }

    if (sellerName) {
    const sellers = await userModel
      .find({ role: "seller", name: { $regex: sellerName, $options: "i" } })
      .select("_id");

    query.seller = { $in: sellers.map((s) => s._id) };
  }
    const products = await productModel
      .find(query)
      .skip(skip) 
      .limit(limit)
      .sort({ createdAt: -1 })
      .populate("category","name")
      .populate("seller", "name")


    // Search about estimatedCountDocuments  
    const totalDocuments = await productModel.countDocuments(query);
    
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
        // The validation on ID is being checked in the checkProductOwner Middleware
        const updatedProduct = await productModel.findByIdAndUpdate(productID, req.body, {new:true,runValidators: true
        });
        if(!updatedProduct){
            throw new AppError("Product not found", 404);
        }

        res.status(200).json({ message: "Product Updated", data: updatedProduct })


    }
)

const deleteSellerProduct = asyncHandler(
    async(req,res)=>{
        const productID = req.params.id;

        const deletedProduct = await productModel.findByIdAndDelete(productID)
         if(!deletedProduct){
            throw new AppError("Product not found", 404);
        }

        res.status(200).json({ message: "Product Deleted", data: deletedProduct })

    }
)



export { addProduct , getAllProducts, getSellerProducts, updateSellerProduct, deleteSellerProduct }
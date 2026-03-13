import mongoose from "mongoose";
import asyncHandler from "../Middlewares/asyncHandler.js";
import { orderModel } from "../Models/Order.js";
import { productModel } from "../Models/Product.js";
import AppError from "../Utils/AppError.js";

const createOrder = asyncHandler(async (req,res)=>{

    const session = await mongoose.startSession();

    try{

        session.startTransaction();

        const { products , paymentMethod , address } = req.body;
        const user = req.user;


        const orderProducts = [];
        let subtotal = 0;

        for(const item of products){

            const { productId , quantity } = item;

            const product = await productModel.findOneAndUpdate(
                {
                    _id: productId,
                    stock: { $gte: quantity }
                },
                {
                    $inc: { stock: -quantity }
                },
                {
                    new:true,
                    session
                }
            )

            if(!product){
                throw new AppError("Product Not Available",400)
            }

            const itemPrice = product.price * quantity;

            subtotal += itemPrice;

            orderProducts.push({
                product: product._id,
                seller: product.seller,
                productName: product.name,
                price: product.price,
                quantity
            })

        }

        
        // Change this discount later after applying promo
        const discount = 0;
        const shipping = 20;

        const totalPrice = subtotal - discount + shipping;


        const [order] = await orderModel.create([{

            user: user._id,
            products: orderProducts,

            subtotal,
            discount,
            shipping,
            totalPrice,

            paymentMethod,
            paymentStatus: "pending",
            status: "pending",

            address

        }],{ session })

        await session.commitTransaction();

        res.status(201).json({
            success:true,
            order: order
        })

    }
    catch(err){

        await session.abortTransaction();
        throw err;

    }
    finally{

        session.endSession();

    }

})

export { createOrder };
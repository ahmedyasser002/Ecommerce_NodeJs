import mongoose from "mongoose";
import asyncHandler from "../Middlewares/asyncHandler.js";
import { orderModel } from "../Models/Order.js";
import { productModel } from "../Models/Product.js";
import AppError from "../Utils/AppError.js";
import { buildOrderFilter } from "../Utils/orderFilter.js";

const createOrder = asyncHandler(async (req, res) => {

    const session = await mongoose.startSession();

    try {

        session.startTransaction();

        const { products, paymentMethod, address } = req.body;
        const user = req.user;


        const orderProducts = [];
        let subtotal = 0;

        for (const item of products) {

            const { productId, quantity } = item;

            const product = await productModel.findOneAndUpdate(
                {
                    _id: productId,
                    stock: { $gte: quantity }
                },
                {
                    $inc: { stock: -quantity }
                },
                {
                    new: true,
                    session
                }
            )

            if (!product) {
                throw new AppError("Product Not Available", 400)
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

        }], { session })

        await session.commitTransaction();

        res.status(201).json({
            success: true,
            order: order
        })

    }
    catch (err) {

        await session.abortTransaction();
        throw err;

    }
    finally {

        session.endSession();

    }

})

const getCustomerOrders = asyncHandler(async (req, res) => {
    const page = Number(req.query.page) || 1;
    const limit = Math.min(Number(req.query.limit) || 10, 100);
    const skip = (page - 1) * limit;

    const filter = buildOrderFilter(req.query,req.user,"customer");

    const totalDocuments = await orderModel.countDocuments(filter);
    const orders = await orderModel
        .find(filter)
        .populate("products.product", "name price images")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit))
        .lean();

    res.status(200).json({
        success: true,
        page: Number(page),
        limit: Number(limit),
        totalDocuments,
        totalPages: Math.ceil(totalDocuments / limit),
        data: orders
    });
});

const getSellerOrders = asyncHandler(async (req, res) => {
    // const { page = 1, limit = 10, } = req.query;
    const page = Number(req.query.page) || 1;
    const limit = Math.min(Number(req.query.limit) || 10, 100);
    const skip = (page - 1) * limit;
  

    const filter = buildOrderFilter(req.query,req.user,"seller");

    const totalDocuments = await orderModel.countDocuments(filter);
    const orders = await orderModel
    .find(filter)
    .populate("products.product", "name price images")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(Number(limit))
    .lean();
    
    // Could be done with aggregation
    orders.forEach(order => {
    order.products = order.products.filter(p => p.seller.toString() === req.user._id.toString());
});
    res.status(200).json({
        success: true,
        page: Number(page),
        limit: Number(limit),
        totalDocuments,
        totalPages: Math.ceil(totalDocuments / limit),
        data: orders
    });
});


const getAdminOrders = asyncHandler(async (req, res) => {
    const page = Number(req.query.page) || 1;
    const limit = Math.min(Number(req.query.limit) || 10, 100);
    const skip = (page - 1) * limit;

    const filter = buildOrderFilter(req.query,req.user,"admin");

    const totalDocuments = await orderModel.countDocuments(filter);
    const orders = await orderModel
        .find(filter)
        .populate("products.product", "name price images")
        .populate("user", "name email")
        .populate("products.seller", "name")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit))
        .lean();

    res.status(200).json({
        success: true,
        page: Number(page),
        limit: Number(limit),
        totalDocuments,
        totalPages: Math.ceil(totalDocuments / limit),
        data: orders
    });
});

const getOrderById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const order = await orderModel
        .findById(id)
        .populate("products.product", "name price images")
        .populate("user", "name email")
        .populate("products.seller", "name");

    if (!order) throw new AppError("Order not found", 404);

    res.status(200).json({ success: true, order });
});
export { createOrder, getCustomerOrders, getSellerOrders, getAdminOrders, getOrderById };
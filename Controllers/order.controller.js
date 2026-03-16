import mongoose from "mongoose";
import asyncHandler from "../Middlewares/asyncHandler.js";
import { orderModel } from "../Models/Order.js";
import { productModel } from "../Models/Product.js";
import AppError from "../Utils/AppError.js";
import { buildOrderFilter } from "../Utils/orderFilter.js";
import { validateObjectId } from "../Utils/validators.js";
import { couponModel } from "../Models/Coupon.js";
import { generateDeliveryPath } from "../Utils/delivery.js";
import Cart from "../Models/Cart.js";
import confirmOrder from "../Utils/confirmOrder.js";

const createOrder = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const orderProducts = [];

    const cart = await Cart.findOne({ user: userId });

    if (!cart || cart.items.length === 0) {
        throw new AppError("Cart is empty", 400);
    }

    const { address, couponCode, paymentMethod } = req.body;
    const totalPrice = cart.totalPrice;

    for (const item of cart.items) {
        const { product, quantity } = item;
        const foundProduct = await productModel.findById(product);
        if (!foundProduct) {
            throw new AppError("Product is not available", 400);
        }

        orderProducts.push({
            product: foundProduct._id,
            seller: foundProduct.seller,
            productName: foundProduct.name,
            price: foundProduct.price,
            quantity
        });
    }

    let discount = 0;
    let coupon = null;

    if (couponCode) {
        coupon = await couponModel.findOne({ code: couponCode });
    }

    if (
        coupon &&
        coupon.isActive &&
        coupon.expiresAt > new Date() &&
        coupon.usedCount < coupon.maxUses &&
        totalPrice >= coupon.minOrderAmount
    ) {
        if (coupon.discountType === "fixed") {
            discount = coupon.discountValue;
        } else if (coupon.discountType === "percentage") {
            discount = (totalPrice * coupon.discountValue) / 100;
        }

        await couponModel.findOneAndUpdate(
            { code: couponCode },
            { $inc: { usedCount: 1 } }
        );
    }

    const shipping = 20;
    const finalPrice = totalPrice - discount + shipping;

    const order = await orderModel.create({
        user: userId,
        products: orderProducts,

        subtotal: totalPrice,
        discount,
        shipping,
        totalPrice: finalPrice,

        coupon: coupon
            ? {
                  id: coupon._id,
                  code: coupon.code,
                  discountValue: coupon.discountValue
              }
            : null,

        address
    });
    if(paymentMethod){
        if(paymentMethod=='card'){
            order.paymentMethod='card';
            order.expiresAt=new Date(Date.now() + 60 * 1000);
        }
        else{
            order.paymentMethod='cash_on_delivery';
            order.expiresAt=undefined;
            order.paymentId = 'cash';
            order.status = "confirmed";
            await confirmOrder('cash', order);
        }
        order.paymentStatus = "pending";
    }
    await order.save();

    res.status(201).json({
        success: true,
        order
    });
});

const getCustomerOrders = asyncHandler(async (req, res) => {
    const page = Number(req.query.page) || 1;
    const limit = Math.min(Number(req.query.limit) || 10, 100);
    const skip = (page - 1) * limit;

    const filter = buildOrderFilter(req.query, req.user, "customer");

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


    const filter = buildOrderFilter(req.query, req.user, "seller");

    const totalDocuments = await orderModel.countDocuments(filter);
    const orders = await orderModel
        .find(filter)
        .populate("products.product", "name price images")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit))
        .lean();

    // Could be done with aggregation
    // Did this because the .find(filter) will get the all products in order if only one item is owned by that seller, but now we display only the products of the seller from each order
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

    const filter = buildOrderFilter(req.query, req.user, "admin");

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
    if (!validateObjectId(id)) {
        throw new AppError("Invalid ID", 400)
    }

    const order = await orderModel
        .findById(id)
        .populate("products.product", "name price images")
        .populate("user", "name email")
        .populate("products.seller", "name");

    if (!order) throw new AppError("Order not found", 404);

    res.status(200).json({ success: true, order });
});


const updateOrder = asyncHandler(
    async (req, res) => {
        const orderId = req.params.id;
        const { status } = req.body;
       const validStatuses = ["pending", "confirmed", "shipped", "delivered", "cancelled"];
    if (status && !validStatuses.includes(status)) {
        throw new AppError("Invalid Status", 400);
    }

        const updatedOrder = await orderModel.findByIdAndUpdate(orderId, req.body, { new: true, runValidators: true })
        if (!updatedOrder) {
            throw new AppError("Order not found", 404);
        }

        res.status(200).json({ message: "Order Updated", data: updatedOrder })

    }
)

const cancelOrder = asyncHandler(async (req, res) => {
    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const orderId = req.params.id;
        const order = await orderModel.findById(orderId).session(session);

        if (!order) {
            throw new AppError("Order not found", 404);
        }

        const nonCancellableStatuses = ["confirmed", "shipped", "delivered", "cancelled"];
        if (nonCancellableStatuses.includes(order.status)) {
            throw new AppError(`Order cannot be cancelled because its status is '${order.status}'`, 400);
        }

        order.status = "cancelled";
        if(order.paymentStatus==="paid")
        {
            order.paymentStatus = "refunded";
        }
        await order.save({ session });

        for (const item of order.products) {
            await mongoose.model("Product").findByIdAndUpdate(
                item.product,
                { $inc: { stock: item.quantity } },
                { session }
            );
        }

        await session.commitTransaction();

        res.status(200).json({
            success: true,
            message: "Order cancelled successfully",
            order
        });
    } catch (err) {
        await session.abortTransaction();
        throw err;
    } finally {
        session.endSession();
    }
});


const trackOrder = asyncHandler(async (req, res) => {
    const orderId  = req.params.id;
    const io = req.app.get("io");

    const order = await orderModel.findById(orderId);
    if (!order) throw new AppError("Order not found", 404);

    if (order.status !== "shipped") {
        throw new AppError("Order is not shipped yet", 400);
    }

    const path = generateDeliveryPath(); 
    let index = 0;

    const interval = setInterval(async () => {
        if (index >= path.length) {
            clearInterval(interval);
            io.to(orderId).emit("deliveryComplete", { message: "Order delivered" });
            return;
        }
        io.to(orderId).emit("locationUpdate", path[index]);
        index++;
    }, 2000); 

    res.status(200).json({ success: true, message: "Tracking started" });
});


export { createOrder, getCustomerOrders, getSellerOrders, getAdminOrders, getOrderById, updateOrder, cancelOrder, trackOrder };
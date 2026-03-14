import { orderModel } from "../Models/Order.js";
import AppError from "../Utils/AppError.js";
import { objectIdValidator } from "../Utils/validators.js";

export const checkOrderAccess = async (req, res, next) => {
    const orderId = req.params.id;

    if (!objectIdValidator(orderId)) throw new AppError("Invalid Order ID", 400);

    const order = await orderModel.findById(orderId);
    if (!order) throw new AppError("Order not found", 404);

    const { role, _id } = req.user;

    if (role === "customer" && !order.user.equals(_id)) {
        throw new AppError("Access denied: not your order", 403);
    }

    next();
};

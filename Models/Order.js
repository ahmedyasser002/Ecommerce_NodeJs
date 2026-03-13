import mongoose from "mongoose";
import { addressSchema } from "./User.js";

const orderSchema = new mongoose.Schema({
    totalPrice: {
        type: Number,
        required: true,
        min: 1
    },
    subtotal: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    shipping: { type: Number, default: 0 },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    promoCode: { type: String },

    products: {
        type: [
            {
                // Is it better to have snapshots of product attributes or to populate?
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true
                },

                seller: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                    required: true
                },
                productName: {
                    type: String,
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: 1
                },
                // Because order should be immutable (does not depend on product changes)
                price: {
                    type: Number,
                    required: true
                }
            }
        ],
        required: true
    },

    status: {
        type: String,
        enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
        default: "pending"
    },
    paymentMethod: {
        type: String,
        enum: ["card", "cash_on_delivery", "wallet"],
    },
    paymentStatus: {
        type: String,
        enum: ["pending", "paid", "failed", "refunded"],
        default: "pending"
    },
    address: {
        type: addressSchema,
        required: true
    },


},
    {
        timestamps: true
    }
);

export const orderModel = mongoose.model("Order", orderSchema)
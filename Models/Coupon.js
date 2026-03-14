import mongoose from "mongoose";

const couponSchema = mongoose.Schema({
    code: {type: String, unique: true, uppercase:true},
    discountType: {
        type : String,
        enum: ["percentage", "fixed"],
        default : "fixed"
    },
    discountValue : Number,
    minOrderAmount : Number,
    maxUses : Number,
    usedCount : Number,
    expiresAt : Date,
    isActive: Boolean
})

export const couponModel = mongoose.model('Coupon', couponSchema)
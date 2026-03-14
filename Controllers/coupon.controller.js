import asyncHandler from "../Middlewares/asyncHandler.js";
import { couponModel } from "../Models/Coupon.js";
import reviewModel from "../Models/Review.js";

const getCoupon = asyncHandler ( async (req, res) => {
    let allCoupons = await couponModel.find() 
    res.status(201).json({message: "All Coupons", data:allCoupons})
})

const getCouponById = asyncHandler (async (req, res) => {
    let id = req.params.id
    let coupon = await couponModel.findById(id)
    res.json({message: "Coupon found", data:coupon})
})

const createCoupon = asyncHandler( async (req,res) => {
    let createdCoupon = await couponModel.insertMany(req.body)
    res.json({message: "Coupon Created", data:createdCoupon})
})

const applyCoupon = asyncHandler (async (req,res) => {
    const {code, cartTotal} = req.body
    let coupon = await couponModel.findOne({ code })
    let discountAmount = 0

    if (!coupon)
        res.status(404).json({ message: req.t("coupon_not_found" )})
    
    if (!coupon.isActive)
        res.status(404).json({ message: req.t("coupon_inactive") })

    if(coupon.expiresAt < new Date())
        res.status(404).json({ message: req.t("coupon_expired") })

    if(coupon.usedCount >= coupon.maxUses)
        res.status(404).json({ message: req.t("coupon_max_uses") })

    if(req.body.cartTotal < coupon.minOrderAmount)
        res.status(404).json({ message: req.t("coupon_low_cart") })

    if(coupon.discountType == "fixed"){
        discountAmount = coupon.discountValue
    }else{
        discountAmount = (cartTotal * coupon.discountValue) / 100
    }

    const finalTotal = cartTotal - discountAmount

    await couponModel.findByIdAndUpdate(coupon._id, { $inc: {usedCount:1} })

    res.status(200).json({ message: req.t("coupon_applied"), discountAmount, finalTotal})
    
})

export {getCoupon, createCoupon, getCouponById, applyCoupon}
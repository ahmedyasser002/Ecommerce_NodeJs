import express from 'express'
import { isauthenticated } from '../Middlewares/authenticationMiddleware.js'
import { authorizationMiddleware } from '../Middlewares/autorizationMiddleware.js'
import { ROLES } from '../Constants/roles.js'
import { applyCoupon, createCoupon, getCoupon, getCouponById } from '../Controllers/coupon.controller.js'

const couponRoutes = express.Router()

couponRoutes.get("/get-coupons", isauthenticated, authorizationMiddleware(ROLES.ADMIN), getCoupon)
couponRoutes.get("/get-coupon/:id", isauthenticated, authorizationMiddleware(ROLES.ADMIN), getCouponById)
couponRoutes.post("/add-coupons", isauthenticated, authorizationMiddleware(ROLES.ADMIN), createCoupon)
couponRoutes.post("/apply", isauthenticated, authorizationMiddleware(ROLES.CUSTOMER) , applyCoupon)

export default couponRoutes
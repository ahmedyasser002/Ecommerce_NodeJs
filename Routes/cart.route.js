import express from "express";
import { isauthenticated }from "../Middlewares/authenticationMiddleware.js";
import { authorizationMiddleware } from "../Middlewares/autorizationMiddleware.js";
import validationMiddleware from "../Middlewares/ValidationMiddleWare.js";
import { addToCartSchema, updateProductQuantitySchema, deleteProductInCartSchema } from "../Validations/cartValidation.js";
import { addToCart, deleteCart, getCartSummary, updateProductQuantityInCart, deleteProductInCart } from "../Controllers/cart.controller.js";
import { ROLES } from "../Constants/roles.js";

const cartRoutes = express.Router()

cartRoutes.post("/add-to-cart", isauthenticated, authorizationMiddleware(ROLES.CUSTOMER), validationMiddleware(addToCartSchema), addToCart)
cartRoutes.delete("/delete-cart", isauthenticated, authorizationMiddleware(ROLES.CUSTOMER), deleteCart)
cartRoutes.get("/get-cart-summary", isauthenticated, authorizationMiddleware(ROLES.CUSTOMER), getCartSummary)
cartRoutes.put("/update-product-quantity", isauthenticated, authorizationMiddleware(ROLES.CUSTOMER), validationMiddleware(updateProductQuantitySchema), updateProductQuantityInCart)
cartRoutes.delete("/delete-product", isauthenticated, authorizationMiddleware(ROLES.CUSTOMER), validationMiddleware(deleteProductInCartSchema), deleteProductInCart)

export default cartRoutes
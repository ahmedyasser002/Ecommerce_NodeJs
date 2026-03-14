import express from "express";
import { guestOrUserAuthentication }from "../Middlewares/authenticationMiddleware.js";
import validationMiddleware from "../Middlewares/validationMiddleware.js";
import { addToCartSchema, updateProductQuantitySchema, deleteProductInCartSchema } from "../Validations/cartValidation.js";
import { addToCart, deleteCart, getCartSummary, updateProductQuantityInCart, deleteProductInCart } from "../Controllers/cart.controller.js";

const cartRoutes = express.Router()

cartRoutes.post("/add-to-cart", guestOrUserAuthentication, validationMiddleware(addToCartSchema), addToCart)
cartRoutes.delete("/delete-cart", guestOrUserAuthentication, deleteCart)
cartRoutes.get("/get-cart-summary", guestOrUserAuthentication, getCartSummary)
cartRoutes.put("/update-product-quantity", guestOrUserAuthentication, validationMiddleware(updateProductQuantitySchema), updateProductQuantityInCart)
cartRoutes.delete("/delete-product", guestOrUserAuthentication, validationMiddleware(deleteProductInCartSchema), deleteProductInCart)

export default cartRoutes
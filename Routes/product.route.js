import express from "express";
import {isauthenticated }from "../Middlewares/authenticationMiddleware.js";
import { authorizationMiddleware } from "../Middlewares/autorizationMiddleware.js";
import { addProduct, getAllProducts } from "../Controllers/product.controller.js";
import { ROLES } from "../Constants/roles.js";



const productRoutes = express.Router()

productRoutes.post("/add-product",isauthenticated,authorizationMiddleware(ROLES.SELLER),addProduct)
productRoutes.get("/list-products", isauthenticated,getAllProducts)


export default productRoutes
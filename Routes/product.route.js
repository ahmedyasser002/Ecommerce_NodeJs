import express from "express";
import isauthenticated from "../Middlewares/authenticationMiddleware.js";
import { authorizationMiddleware } from "../Middlewares/autorizationMiddleware.js";
import { addProduct } from "../Controllers/product.controller.js";



const productRoutes = express.Router()

productRoutes.post("/add-product",isauthenticated,authorizationMiddleware("seller"),addProduct)


export default productRoutes
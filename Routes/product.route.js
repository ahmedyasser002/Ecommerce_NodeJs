import express from "express";
import {isauthenticated }from "../Middlewares/authenticationMiddleware.js";
import { authorizationMiddleware } from "../Middlewares/autorizationMiddleware.js";
import { addProduct, deleteSellerProduct, getAllProducts, getSellerProducts, updateSellerProduct } from "../Controllers/product.controller.js";
import { ROLES } from "../Constants/roles.js";
import validationMiddleware from "../Middlewares/validationMiddleware.js";
import { productSchemaValidation, productUpdateSchema } from "../Validations/productValidation.js";
import { checkProductOwner } from "../Middlewares/checkProductOwner.js";
import { upload } from "../Utils/upload.js";

const productRoutes = express.Router()

productRoutes.post("/add-product",isauthenticated,authorizationMiddleware(ROLES.SELLER),upload.single('image'),validationMiddleware(productSchemaValidation),addProduct)
productRoutes.get("/list-products", isauthenticated,getAllProducts)
productRoutes.get("/seller-products",isauthenticated,authorizationMiddleware(ROLES.SELLER),getSellerProducts)
productRoutes.patch(
   "/update-seller-product/:id",
   isauthenticated,
   authorizationMiddleware(ROLES.SELLER),
   checkProductOwner,
   validationMiddleware(productUpdateSchema),
   updateSellerProduct
);
productRoutes.delete(
   "/delete-seller-product/:id",
   isauthenticated,
   authorizationMiddleware(ROLES.SELLER),
   checkProductOwner,
   deleteSellerProduct
);




export default productRoutes
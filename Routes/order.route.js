import express from "express";
import { isauthenticated } from "../Middlewares/authenticationMiddleware.js";
import validationMiddleware from "../Middlewares/ValidationMiddleWare.js";
import { createOrderSchema } from "../Validations/createOrderValidation.js";
import { createOrder, getCustomerOrders, getSellerOrders } from "../Controllers/order.controller.js";
import { ROLES } from "../Constants/roles.js";
import { authorizationMiddleware } from "../Middlewares/autorizationMiddleware.js";






const orderRoutes = express.Router()
orderRoutes.post("/create-order", isauthenticated,authorizationMiddleware(ROLES.CUSTOMER) ,validationMiddleware(createOrderSchema), createOrder )
orderRoutes.get("/customer", isauthenticated,authorizationMiddleware(ROLES.CUSTOMER), getCustomerOrders )
orderRoutes.get("/seller", isauthenticated, authorizationMiddleware(ROLES.SELLER), getSellerOrders)



export default orderRoutes

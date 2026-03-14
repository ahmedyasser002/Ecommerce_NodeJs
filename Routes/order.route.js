import express from "express";
import { isauthenticated } from "../Middlewares/authenticationMiddleware.js";
import validationMiddleware from "../Middlewares/validationMiddleware.js";
import { createOrderSchema } from "../Validations/createOrderValidation.js";
import { cancelOrder, createOrder, getAdminOrders, getCustomerOrders, getOrderById, getSellerOrders, updateOrder } from "../Controllers/order.controller.js";
import { ROLES } from "../Constants/roles.js";
import { authorizationMiddleware } from "../Middlewares/autorizationMiddleware.js";
import { productUpdateSchema } from "../Validations/productValidation.js";
import { checkOrderAccess } from "../Middlewares/checkOrderAccess.js";






const orderRoutes = express.Router()
orderRoutes.post("/create-order", isauthenticated,authorizationMiddleware(ROLES.CUSTOMER) ,validationMiddleware(createOrderSchema), createOrder )
orderRoutes.get("/customer", isauthenticated,authorizationMiddleware(ROLES.CUSTOMER), getCustomerOrders )
orderRoutes.get("/seller", isauthenticated, authorizationMiddleware(ROLES.SELLER), getSellerOrders)
orderRoutes.get("/admin", isauthenticated, authorizationMiddleware(ROLES.ADMIN), getAdminOrders)
orderRoutes.get("/admin/:id", isauthenticated, authorizationMiddleware(ROLES.ADMIN), getOrderById)
orderRoutes.patch("/update/:id", isauthenticated, authorizationMiddleware(ROLES.ADMIN),validationMiddleware(productUpdateSchema), updateOrder)
orderRoutes.patch("/cancel/:id",isauthenticated,authorizationMiddleware(ROLES.CUSTOMER,ROLES.ADMIN),checkOrderAccess,cancelOrder)





export default orderRoutes

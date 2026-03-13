import express from "express";
import { isauthenticated } from "../Middlewares/authenticationMiddleware.js";
import validationMiddleware from "../Middlewares/ValidationMiddleWare.js";
import { createOrderSchema } from "../Validations/createOrderValidation.js";
import { createOrder } from "../Controllers/order.controller.js";






const orderRoutes = express.Router()
orderRoutes.post("/create-order", isauthenticated,validationMiddleware(createOrderSchema), createOrder )

export default orderRoutes

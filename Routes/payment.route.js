import express from "express";
import { createPaymentIntent, getSavedCards } from "../Controllers/payment.controller.js";
import { isauthenticated } from "../Middlewares/authenticationMiddleware.js";
import { authorizationMiddleware } from "../Middlewares/autorizationMiddleware.js";
import { ROLES } from "../Constants/roles.js";

const router = express.Router();

router.post("/create-payment-intent", isauthenticated, authorizationMiddleware(ROLES.CUSTOMER), createPaymentIntent);
router.get("/saved-cards", isauthenticated, authorizationMiddleware(ROLES.CUSTOMER), getSavedCards);

export default router;
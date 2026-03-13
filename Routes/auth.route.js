import express from "express";
import passport from "passport";
import { checkEmail } from "../Middlewares/checkEmail.js";
import validationMiddleware from "../Middlewares/validationMiddleware.js";
import { signupValidation } from "../Validations/userValidation.js";
import { signup ,signin,emailVerification , googleCallback} from "../Controllers/auth.controller.js";
import { upload } from "../Utils/upload.js";
let authRoutes = express.Router();

authRoutes.post("/signup",upload.single('image'),validationMiddleware(signupValidation),checkEmail,signup)
authRoutes.post("/signin" ,checkEmail ,signin )
authRoutes.get("/verify/:email", emailVerification)
authRoutes.get("/google",passport.authenticate("google", { scope: ["profile", "email"] }));
authRoutes.get("/google/callback",passport.authenticate("google", { failureRedirect: "/auth/signin" }),googleCallback);
export default authRoutes
import express from "express";
import { checkEmail } from "../Middlewares/checkEmail.js";
import { signup ,signin, emailVerification } from "../Controllers/auth.controller.js";
import validationMiddleware from "../Middlewares/validationMiddleware.js";
import { signupValidation, loginValidation } from "../Validations/userValidation.js";
import { upload } from "../Utils/upload.js";
let authRoutes = express.Router();
authRoutes.post("/signup",upload.single('image'),validationMiddleware(signupValidation),checkEmail,signup)
authRoutes.post("/signin" ,validationMiddleware(loginValidation),checkEmail ,signin )
authRoutes.get("/verify/:email", emailVerification)


export default authRoutes
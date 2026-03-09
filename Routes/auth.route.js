import express from "express";
import { checkEmail } from "../Middlewares/checkEmail.js";
import { signup ,signin } from "../Controllers/auth.controller.js";
import { validationforRegisteation ,validationforLogin } from "../Middlewares/validation.middleware.js";
import { upload } from "../Utils/upload.js";
let authRoutes = express.Router();
authRoutes.post("/signup",upload.single('image'),validationforRegisteation,checkEmail,signup)
authRoutes.post("/signin" ,validationforLogin,checkEmail ,signin )
export default authRoutes
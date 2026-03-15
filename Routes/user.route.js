import { Router } from "express";
import { isauthenticated } from "../Middlewares/authenticationMiddleware.js";
import { authorizationMiddleware } from "../Middlewares/autorizationMiddleware.js";
import { ROLES } from "../Constants/roles.js";
import { list_users , updateUser , deleteUser,updateUserProfile } from "../Controllers/user.controller.js";
import { userManagementValidation } from "../Validations/userValidation.js";
import validationMiddleware from "../Middlewares/validationMiddleware.js";

let userRoutes = new Router() ;
//userRoutes.get("/list_users" , isauthenticated ,authorizationMiddleware(ROLES.ADMIN),list_users) ;
userRoutes.get("/list_users" ,list_users) ;
userRoutes.put("/updateUser/:id" ,isauthenticated ,authorizationMiddleware(ROLES.ADMIN),updateUser) ;
userRoutes.delete("/deleteUser/:id" , isauthenticated ,authorizationMiddleware(ROLES.ADMIN),deleteUser);
userRoutes.put("/updateProfile",validationMiddleware(userManagementValidation),isauthenticated,authorizationMiddleware(ROLES.CUSTOMER),updateUserProfile)
export default userRoutes
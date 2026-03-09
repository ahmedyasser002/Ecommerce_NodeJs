import { Router } from "express";
import  {list_user_reviews,createReview , updateReview,deleteReview} from "../Controllers/review.controller.js" ;
import { isauthenticated } from "../Middlewares/authenticationMiddleware.js";
import { authorizationMiddleware } from "../Middlewares/autorizationMiddleware.js";
import validationMiddleware from "../Middlewares/validationMiddleWare.js";
import { reviewValidationSchema } from "../Validations/reviewValidation.js";
import { ROLES } from "../Constants/roles.js";

let reviewRoutes = new Router() ;
reviewRoutes.post("/createReview" ,validationMiddleware(reviewValidationSchema) , isauthenticated ,authorizationMiddleware(ROLES.CUSTOMER),createReview) ;
reviewRoutes.get("/myReviews" , isauthenticated ,authorizationMiddleware(ROLES.CUSTOMER),list_user_reviews) ;
reviewRoutes.put("/updateReview/:id" ,isauthenticated ,authorizationMiddleware(ROLES.CUSTOMER),updateReview) ; //put validation (mustafa)
reviewRoutes.delete("/deleteReview/:id" , isauthenticated ,authorizationMiddleware(ROLES.CUSTOMER),deleteReview) //put validation (mustafa)
export default reviewRoutes
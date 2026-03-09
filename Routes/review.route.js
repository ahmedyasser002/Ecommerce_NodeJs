import { Router } from "express";
import  {list_user_reviews,createReview , updateReview,deleteReview} from "../Controllers/review.controller.js" ;
import { isauthenticated } from "../Middlewares/authenticationMiddleware.js";
import { authorizationMiddleware } from "../Middlewares/autorizationMiddleware.js";
import { validationforReview } from "../Middlewares/review.validation.middleware.js";
import { ROLES } from "../Constants/roles.js";

let reviewRoutes = new Router() ;
reviewRoutes.post("/createReview" ,validationforReview , isauthenticated ,authorizationMiddleware(ROLES.CUSTOMER),createReview) ;
reviewRoutes.get("/myReviews" , isauthenticated ,authorizationMiddleware(ROLES.CUSTOMER),list_user_reviews) ;
reviewRoutes.put("/updateReview/:id" ,isauthenticated ,authorizationMiddleware(ROLES.CUSTOMER),updateReview) ;
reviewRoutes.delete("/deleteReview/:id" , isauthenticated ,authorizationMiddleware(ROLES.CUSTOMER),deleteReview)
export default reviewRoutes
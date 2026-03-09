import { Router } from "express";
import  {list_user_reviews,createReview , updateReview,deleteReview} from "../Controllers/review.controller.js" ;
import { isauthenticated } from "../Middlewares/authenticationMiddleware.js";
import { authorizationMiddleware } from "../Middlewares/autorizationMiddleware.js";
import { validationforReview } from "../Middlewares/review.validation.middleware.js";

let reviewRoutes = new Router() ;
reviewRoutes.post("/createReview" ,validationforReview , isauthenticated ,authorizationMiddleware("customer"),createReview) ;
reviewRoutes.get("/myReviews" , isauthenticated ,authorizationMiddleware("customer"),list_user_reviews) ;
reviewRoutes.put("/updateReview/:id" ,isauthenticated ,authorizationMiddleware("customer"),updateReview) ;
reviewRoutes.delete("/deleteReview/:id" , isauthenticated ,authorizationMiddleware("customer"),deleteReview)
export default reviewRoutes
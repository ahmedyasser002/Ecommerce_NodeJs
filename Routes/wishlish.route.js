import { Router } from "express";
import  {addToWishlist, deleteFromWishlist , getMyWishlist , clearMyWishlist} from "../Controllers/wishlist.controller.js" ;
import { isauthenticated } from "../Middlewares/authenticationMiddleware.js";
import { authorizationMiddleware } from "../Middlewares/autorizationMiddleware.js";
import { ROLES } from "../Constants/roles.js";

let wishlistRoutes = new Router() ;
wishlistRoutes.post("/createWishlist"  , isauthenticated ,authorizationMiddleware(ROLES.CUSTOMER),addToWishlist) ;
wishlistRoutes.delete("/deleteWishlist/:product_id" , isauthenticated ,authorizationMiddleware(ROLES.CUSTOMER),deleteFromWishlist) ;
wishlistRoutes.get("/getMyWishlist",  isauthenticated ,authorizationMiddleware(ROLES.CUSTOMER), getMyWishlist);
wishlistRoutes.delete("/clearMyWishlist", isauthenticated ,authorizationMiddleware(ROLES.CUSTOMER), clearMyWishlist);


export default wishlistRoutes
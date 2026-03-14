import mongoose from "mongoose";

let wishlistSchema = new mongoose.Schema({
    user_id:{
        type:mongoose.Types.ObjectId ,
        ref:"User"
    },
    product_id:[{
        type:mongoose.Types.ObjectId,
        ref:"Product"
    }    ] 
},
{
 timestamps:true ,
 versionKey:false 
}
)
let wishlistModel = new mongoose.model("Wishlist",wishlistSchema)
export default wishlistModel 
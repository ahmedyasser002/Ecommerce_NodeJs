import mongoose, { Schema } from "mongoose" ;
let reviewSchema = new Schema({
    createdBy :{
        type:mongoose.Types.ObjectId ,
        ref:"User" ,
    },
    product_id :{
        type:mongoose.Types.ObjectId ,
        ref :"Product"
    },
    content :{
        type:String ,
        maxlength:[100 ,"max number of characters is 100 character"],
        minlength:[3,"min number of characters is 3 charaters" ]
    },
    rating :{
        type:Number ,
        min:[0,"the rating number must be between 0 and 10"] ,
        max:[10 , "the rating number must be between 0 and 10" ],
        required:[true , "the rating is required"]
    }
} ,{
   timestamps :true ,
   versionKey:false 
}
)

let reviewModel = mongoose.model("Review" , reviewSchema) ;
export default reviewModel
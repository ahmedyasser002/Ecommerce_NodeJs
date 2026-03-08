import mongoose from "mongoose";
import bcrypt from "bcrypt";

const addressSchema = new mongoose.Schema({
   country: {
    type: String,
    maxlength: [50, "Country cannot exceed 50 characters"],
    trim: true
  },
   street:{
      type:String ,
      maxlength:[100,"Street cannot exceed 100 characters"],
      trim: true
   },
   city:{
   type: String,
    maxlength: [50, "City cannot exceed 50 characters"],
    trim: true
   },
   apartment_details:{
      type:String ,
      maxlength: [50, "apartment details cannot exceed 50 characters"],
      trim: true
   }
} , {
   _id : false
}

)
const userScheme = new mongoose.Schema({
 name:{
    type:String,
    minlength :3 ,
    maxlength:30 ,
    trim: true
    },
 email:{
    type:String ,
    required:true,
    unique:true,
    trim: true
 },
 phone:{
    type:String,
    trim: true
 },
 password:{
    type:String ,
    required: true
 },
 role:{
    type:String ,
    enum:["customer","seller","admin"],
    default:"customer"
 },
 address:{
    type:addressSchema,
    default :{}
 },
 isConfirmed:{
    type:Boolean ,
    default:false 

 }
},
{
 timestamps:true ,
 versionKey:false 
})

userScheme.pre("save" ,{document:true}, async function (){
   this.password = bcrypt.hashSync(this.password,8);
})
export const userModel = mongoose.model("User",userScheme)
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const addressSchema = new mongoose.Schema({
   country: {
    type: String,
    maxlength: [50, "Country name cannot exceed 50 characters"],
    trim: true
  },
   street:{
      type:String ,
      maxlength:[100,"Street name cannot exceed 100 characters"],
      trim: true
   },
   city:{
   type: String,
    maxlength: [50, "City name cannot exceed 50 characters"],
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
    minlength: [3, "Name must be at least 3 characters"],
    maxlength: [30, "Name cannot exceed 30 characters"],
    required:true,
    trim: true
    },
 email:{
    type:String ,
    required:true,
    unique:true,
    lowercase: true,
    trim: true,
    match: [
         /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
         "Please use a valid email address"
      ] },
 phone:{
    type:String,
    trim: true ,
    match: [
         /^01[0125][0-9]{8}$/,
         "Please enter a valid Egyptian phone number"
      ]

 },
 password:{
    type:String ,
    required: true ,
    minlength: [8, "Password must be at least 8 characters"],
    select: false
 },
 role:{
    type:String ,
    enum:["customer","seller","admin"],
    default:"customer"
 },
 address:{
    type:addressSchema,
    required:function(){
      return this.role == "customer" || this.role == "seller"

    }
 },
 isConfirmed:{
    type:Boolean ,
    default:false 

 }
 ,
 image:{
   type:String 
 }
},
{
 timestamps:true ,
 versionKey:false 
})

userScheme.pre("save" ,{document:true}, async function (){
   if (!this.isModified("password")) return;
   this.password = bcrypt.hashSync(this.password,8);
})
export const userModel = mongoose.model("User",userScheme)
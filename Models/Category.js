import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
    name:String,
    isActive: Boolean,
    priority: Number,
},{
    timestamps : true
})

export const categoryModel = mongoose.model('Category', categorySchema)
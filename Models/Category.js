import mongoose from "mongoose";

const categoryModel = new mongoose.Schema({
    name:String,
    isActive: Boolean,
    priority: Number,
},{
    timestamps : true
})

export default mongoose.model('categories', categoryModel)
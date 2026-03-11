import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
    },
    description: {
        type: String,
        required: true,
        minlength: 10,
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    attributes: { 
        type: Map,
        of: String 
    },
    stock: {
        type: Number,
        required: true,
        min: 5
    },
    images: [String]
},
{
    timestamps: true
}
);

productSchema.index({ name: 1, seller: 1 }, { unique: true });

export const productModel = mongoose.model("Product", productSchema)
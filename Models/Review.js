import mongoose, { Schema } from "mongoose";

let reviewSchema = new Schema({
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },

    product_id: {
        type: mongoose.Types.ObjectId,
        ref: "Product",
        required: true
    },

    content: {
        type: String,
        maxlength: [100, "max number of characters is 100"],
        minlength: [3, "min number of characters is 3"]
    },

    rating: {
        type: Number,
        min: [0, "the rating must be between 0 and 10"],
        max: [10, "the rating must be between 0 and 10"],
        required: [true, "rating is required"]
    }

}, {
    timestamps: true,
    versionKey: false
});

reviewSchema.index({ createdBy: 1, product_id: 1 }, { unique: true });

let reviewModel = mongoose.model("Review", reviewSchema);

export default reviewModel;
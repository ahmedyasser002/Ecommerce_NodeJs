import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: false
        },
        //sessionId acts as a stand-in for a user ID. It links the guest’s cart in the database to their session in the browser.
        sessionId: { 
          type: String,
          required: false, 
          unique: true,
          sparse: true
        },
        items: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true
                },
                quantity: {
                    type: Number,
                    default: 1,
                    min: 1
                },
                totalPrice: {
                    type: Number,
                    default: 0, 
                    min: 0
                }
            }
        ],
        totalPrice: {
            type: Number,
            default: 0, 
            min: 0
        }
    },
    { timestamps: true },
    { versionKey: false }
);

export default mongoose.model("Cart", cartSchema);
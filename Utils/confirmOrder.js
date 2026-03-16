import { productModel } from "../Models/Product.js";
import AppError from "../Utils/AppError.js";
import Cart from "../Models/Cart.js";

const confirmOrder = async (paymentMethod, order) => {
    try{
        if(paymentMethod==='card'){
            order.expiresAt = undefined;
            order.paymentStatus = "paid";
            order.status = "confirmed";
            await order.save();
        }

        for (const item of order.products) {
          const { product, quantity } = item;
          const updatedProduct = await productModel.findOneAndUpdate(
            {
              _id: product,
              stock: { $gte: quantity },
            },
            {
              $inc: { stock: -quantity },
            },
            {
              new: true,
            },
          );
          if (!updatedProduct) {
            throw new AppError("Product is not available", 400);
          }
        }

        await Cart.findOneAndDelete({ user: order.user });
    }
    catch(error){
        throw new AppError(error.message || "Confirmation failed", 400)
    }
};


export default confirmOrder;
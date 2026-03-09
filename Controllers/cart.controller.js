import Cart from "../Models/Cart.js";
import { productModel } from "../Models/Product.js";
import asyncHandler from "../Middlewares/asyncHandler.js";
import AppError from "../Utils/AppError.js";


const addToCart = asyncHandler(async (req, res, next) => {
    const { productId, quantity } = req.body;
    const userId = req.user._id;

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
        cart = new Cart({ user: userId, items: [] });
    }

    let product = product.items.findOne({ product: productId });
    if (product) {
        let productIndex = cart.items.findIndex(item => item.product.toString() === productId);
        if (productIndex > -1) {
            cart.items[productIndex].quantity += quantity;
        }
        else {
            cart.items.push({ product: productId, quantity });
        }
        const price = product.price * quantity;
        cart.items[productIndex].totalPrice = price;
        cart.totalPrice += price;
        await cart.save();
        res.status(200).json({ message: "Product added to cart", data: cart });
    } else {
        throw new AppError("Product not found", 404);
    }
});

const deleteCart = asyncHandler(async (req, res, next) => {
    const userId = req.user._id;
    await Cart.findOneAndDelete({ user: userId });
    res.status(200).json({ message: "Cart deleted successfully" });
});

const getCartSummary = asyncHandler(async (req, res, next) => {
    const userId = req.user._id;
    let cart = await Cart.findOne({ user: userId }).populate("items.product");
    res.status(200).json({ message: "Cart summary retrieved successfully", data: cart });
});

const updateProductQuantityInCart = asyncHandler(async (req, res, next) => {
    const { productId, quantity } = req.body;
    const userId = req.user._id;

    if (quantity <= 0) {
        throw new AppError("Quantity must be greater than zero", 400);
    }

    let cart = await Cart.findOne({ user: userId });

    let productIndex = cart.items.findIndex(item => item.product.toString() === productId);
    if (productIndex > -1) {
        const oldPrice = cart.items[productIndex].totalPrice;
        cart.items[productIndex].quantity = quantity;
        const product = await productModel.findById(productId);
        cart.items[productIndex].totalPrice = quantity * product.price;
        cart.totalPrice += cart.items[productIndex].totalPrice - oldPrice;
        await cart.save();
        res.status(200).json({ message: "Product quantity updated successfully", data: cart });
    } else {
        throw new AppError("Product not found in cart", 404);
    }
});

const deleteProductInCart = asyncHandler(async (req, res, next) => {
    const { productId } = req.body;
    const userId = req.user._id;

    let cart = await Cart.findOne({ user: userId });

    let productIndex = cart.items.findIndex(item => item.product.toString() === productId);
    if (productIndex > -1) {      
        cart.totalPrice -= cart.items[productIndex].totalPrice;
        cart.items.splice(productIndex, 1);
        await cart.save();
        res.status(200).json({ message: "Product deleted from cart successfully", data: cart });
    } else {
        throw new AppError("Product not found in cart", 404);
    }
});

export { addToCart, deleteCart, getCartSummary, updateProductQuantityInCart, deleteProductInCart }
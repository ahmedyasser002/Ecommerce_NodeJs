import express from "express";
import dotenv from "dotenv";
import {globalError} from "./Middlewares/globalError.js"
import cors from "cors";
import connectDB from "./Config/db.config.js";
import categoryRoutes from "./Routes/category.route.js";
import authRoutes from "./Routes/auth.route.js";
import productRoutes from "./Routes/product.route.js";
import reviewRoutes from "./Routes/review.route.js";
import cartRoutes from "./Routes/cart.route.js";
import userRoutes from "./Routes/user.route.js";
import orderRoutes from "./Routes/order.route.js";
import passport from "passport";
import session from "express-session";
import { setupPassport } from "./Config/passport.config.js";
import wishlistRoutes from "./Routes/wishlish.route.js";
import couponRoutes from "./Routes/coupon.route.js";
import newsletterRoutes from "./Routes/newsletter.route.js";

const app = express();
connectDB();
dotenv.config();

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());
setupPassport();


app.use(cors());
app.use(express.json());

app.use("/category", categoryRoutes);
app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/reviews", reviewRoutes);
app.use("/cart", cartRoutes);
app.use("/user", userRoutes);
app.use("/wishlist",wishlistRoutes)
app.use("/orders", orderRoutes);
app.use("/coupon", couponRoutes)
app.use("/newsletter", newsletterRoutes)

app.get("/", (req, res) => {
  res.send("Ecommerce API Running");
});

app.use(globalError);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
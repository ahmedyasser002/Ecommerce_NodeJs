import express from "express";
import {globalError} from "./Middlewares/globalError.js"
import cors from "cors";
import connectDB from "./Config/db.config.js";
import categoryRoutes from "./Routes/category.route.js";
import dotenv from "dotenv";
import authRoutes from "./Routes/auth.route.js";
import productRoutes from "./Routes/product.route.js";
import reviewRoutes from "./Routes/review.route.js";
import cartRoutes from "./Routes/cart.route.js";

dotenv.config();
const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use(globalError);

app.use("/category", categoryRoutes)
app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/reviews", reviewRoutes);
app.use("/cart", cartRoutes);

app.get("/", (req, res) => {
  res.send("Ecommerce API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
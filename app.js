import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.config.js";
import authRoutes from "./Routes/auth.route.js";
import productRoutes from "./Routes/product.route.js";
import reviewRoutes from "./Routes/review.route.js";
import userRoutes from "./Routes/user.route.js";

dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use(authRoutes)

app.use("/api/products", productRoutes);
app.use(reviewRoutes)
app.use(userRoutes)

app.get("/", (req, res) => {
  res.send("Ecommerce API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
import express from "express";
import {globalError} from "./Middlewares/globalError.js"
import cors from "cors";
import connectDB from "./Config/db.config.js";
import dotenv from "dotenv";
import authRoutes from "./Routes/auth.route.js";
import productRoutes from "./Routes/product.route.js";
import reviewRoutes from "./Routes/review.route.js";

dotenv.config();
const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use(authRoutes)
app.use("/api/products", productRoutes);
app.use(reviewRoutes)

app.get("/", (req, res) => {
  res.send("Ecommerce API Running");
});



app.use(globalError);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
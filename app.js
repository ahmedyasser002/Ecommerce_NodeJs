import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.config.js";
import authRoutes from "./Routes/auth.route.js";
import userRoutes from "./Routes/user.route.js";

dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/user", userRoutes);


app.get("/", (req, res) => {
  res.send("Ecommerce API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
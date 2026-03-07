import express from "express";
import {globalError} from "./Middlewares/globalError.js"
import cors from "cors";
import connectDB from "./Config/db.config.js";

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Ecommerce API Running");
});



app.use(globalError);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
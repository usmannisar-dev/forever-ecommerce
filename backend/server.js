import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloundinary.js";
import userRoute from "./routes/userRoute.js";
import productRoute from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRoute from "./routes/orderRoute.js";


// // Load environment variables
dotenv.config();

// APP CONFIG
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

// MIDDLEWARES
app.use(express.json());

// CORS SETUP
app.use(cors({
  origin: ["https://forever-ecommerce-inky.vercel.app"], // allow your frontend
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}));
app.use(cors());

// API ENDPOINTS
app.use("/api/user", userRoute);
app.use("/api/product", productRoute);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRoute);

app.get("/", (req, res) => {
  res.send("API WORKING");
});

// START SERVER
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

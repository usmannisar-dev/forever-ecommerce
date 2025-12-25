import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloundinary.js";

import userRoute from "./routes/userRoute.js";
import productRoute from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRoute from "./routes/orderRoute.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());

// ✅ Correct CORS (NO *)
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:5173",
      "https://forever-ecommerce.vercel.app", // frontend (future)
      "https://forever-ecommerce-admin.vercel.app", // admin (future)
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Routes
app.use("/api/user", userRoute);
app.use("/api/product", productRoute);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRoute);

// Test route
app.get("/", (req, res) => {
  res.send("API WORKING");
});

// Start server AFTER DB connection
connectDB().then(() => {
  connectCloudinary();
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});

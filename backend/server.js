import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloundinary.js";
import userRoute from "./routes/userRoute.js";
import productRoute from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRoute from "./routes/orderRoute.js";

// Load environment variables
dotenv.config();

// APP CONFIG
const app = express();
const port = process.env.PORT || 4000;

// CONNECT DATABASE & CLOUDINARY
connectDB();
connectCloudinary();

// MIDDLEWARES
app.use(express.json());

// CORS CONFIGURATION
const allowedOrigins = [
  "https://forever-ecommerce-eight.vercel.app", // frontend
  "https://forever-ecommerce-admin-wine.vercel.app", // admin
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like Postman)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = `The CORS policy for this site does not allow access from the specified Origin.`;
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

// Handle preflight OPTIONS requests for all routes
app.options("*", cors());

// ROUTES
app.use("/api/user", userRoute);
app.use("/api/product", productRoute);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRoute);

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("API WORKING");
});

// START SERVER
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

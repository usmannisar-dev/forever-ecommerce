import express from "express";
import {
  placeOrder,
  placeOrderByJazzCash,
  placeOrderByEasyPaisa,
  placeAllOrders,
  userOrders,
  updateStatus,
} from "../controllers/orderController.js";
import adminAuth from "../middleware/adminAuth.js";
import authUser from "../middleware/authUser.js";

const orderRoute = express.Router();

// ADMIN EATURES
orderRoute.post("/list", adminAuth, placeAllOrders);
orderRoute.post("/status", adminAuth, updateStatus);

// PAYMENT FEATURES
orderRoute.post("/place", authUser, placeOrder);
orderRoute.post("/jazzcash", authUser, placeOrderByJazzCash);
orderRoute.post("/easypaisa", authUser, placeOrderByEasyPaisa);

// USER FEATURES
orderRoute.post("/userorders", authUser, userOrders);

export default orderRoute;

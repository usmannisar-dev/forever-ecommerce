import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

/* =========================
   PLACE ORDER (COD)
========================= */
const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    if (!userId) {
      return res.json({ success: false, message: "User not authorized" });
    }

    const newOrder = new orderModel({
      userId,
      items,
      amount,
      address,
      paymentMethod: "COD",
      payment: false,
      status: "Order Placed",
      date: Date.now(),
    });

    await newOrder.save();
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, message: "Order Placed Successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

/* =========================
   PLACE ORDER - JAZZCASH
========================= */
const placeOrderByJazzCash = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    if (!userId) {
      return res.json({ success: false, message: "User not authorized" });
    }

    const newOrder = new orderModel({
      userId,
      items,
      amount,
      address,
      paymentMethod: "JazzCash",
      payment: false, // will be true after real gateway
      status: "Order Placed",
      date: Date.now(),
    });

    await newOrder.save();
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({
      success: true,
      message: "JazzCash Order Created (Payment Pending)",
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

/* =========================
   PLACE ORDER - EASYPAISA
========================= */
const placeOrderByEasyPaisa = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    if (!userId) {
      return res.json({ success: false, message: "User not authorized" });
    }

    const newOrder = new orderModel({
      userId,
      items,
      amount,
      address,
      paymentMethod: "EasyPaisa",
      payment: false,
      status: "Order Placed",
      date: Date.now(),
    });

    await newOrder.save();
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({
      success: true,
      message: "EasyPaisa Order Created (Payment Pending)",
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

/* =========================
   ADMIN - ALL ORDERS
========================= */
const placeAllOrders = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("userId", "name email")
      .sort({ date: -1 });

    res.json({ success: true, orders });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

/* =========================
   USER ORDERS
========================= */
const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });
    res.json({ success: true, orders });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

/* =========================
   UPDATE ORDER STATUS
========================= */
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: "Status Updated" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export {
  placeOrder,
  placeOrderByJazzCash,
  placeOrderByEasyPaisa,
  placeAllOrders,
  userOrders,
  updateStatus,
};

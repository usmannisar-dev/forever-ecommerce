import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    cartData: {
      type: Object,
      default: {}, // default empty object
    },
  },
  { minimize: false }
);

// Check if model exists to avoid recompilation errors
const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
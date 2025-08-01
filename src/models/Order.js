// src\models\Order.js
import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  email: { type: String, required: true },

  payment: {
    type: String,
    required: true,
    enum: ["cod", "bank"], // 'cod' = Cash on Delivery, 'bank' = Online
  },

  paymentStatus: {
    type: String,
    enum: ["pending", "recieved"],
    default: "pending",
  },

  transactionId: {
    type: String,
    required: function () {
      return this.payment === "bank"; // Required only for bank payment
    },
  },

  bank: {
    type: String, // optional, but often paired with bank payment
  },

  cart: [
    {
      _id: String,
      name: String,
      price: Number,
      qty: Number,
    },
  ],

  status: {
      type: String,
      default: "pending", // ✅ this is fine for new orders
    },
    
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);

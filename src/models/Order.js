import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  payment: { type: String, required: true },
  transactionId: { type: String, required: true },
  cart: [
    {
      _id: String,
      name: String,
      price: Number,
      qty: Number,
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);

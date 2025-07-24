import { connectDB } from "../../lib/db";
import Order from "../../models/Order";

export default async function handler(req, res) {
  if (req.method === "POST") {
    await connectDB();
    try {
      const order = await Order.create(req.body);
      return res.status(201).json(order);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  } else if (req.method === "GET") {
    await connectDB();
    try {
      const orders = await Order.find().sort({ createdAt: -1 });
      return res.status(200).json(orders);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  } else {
    res.status(405).end();
  }
}

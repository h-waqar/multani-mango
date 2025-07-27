import { connectDB } from "@/lib/db";
import Order from "@/models/Order";

export async function PATCH(req) {
  await connectDB();

  try {
    const body = await req.json();
    const { _id, status } = body;

    if (!_id || !status) {
      return new Response(JSON.stringify({ error: "Missing _id or status" }), {
        status: 400,
      });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      _id,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return new Response(JSON.stringify({ error: "Order not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(updatedOrder), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}

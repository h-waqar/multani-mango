import { connectDB } from "@/lib/db";
import Order from "@/models/Order";

export async function POST(req) {
  await connectDB();

  const body = await req.json();

  try {
    // ✅ Basic validation
    const {
      name,
      phone,
      address,
      email,
      payment,
      paymentStatus,
      transactionId,
      bank,
      cart,
      remarks,
    } = body;

    if (!name || !phone || !address || !email || !payment || !cart?.length) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400 }
      );
    }

    if (payment === "bank" && !transactionId) {
      return new Response(
        JSON.stringify({ error: "transactionId is required for bank payment" }),
        { status: 400 }
      );
    }

    const order = await Order.create(body);
    return new Response(JSON.stringify(order), { status: 201 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 400,
    });
  }
}

export async function GET() {
  await connectDB();

  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    return new Response(JSON.stringify(orders), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 400,
    });
  }
}

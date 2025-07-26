import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import { NextResponse } from "next/server";

// ✅ GET /api/orders/:id → Get a single order by ID
export async function GET(_req, { params }) {
  await connectDB();

  const { id } = params;

  try {
    const order = await Order.findById(id);
    if (!order) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }
    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    console.error("Error fetching order:", error);
    return NextResponse.json(
      { message: "Server error", error },
      { status: 500 }
    );
  }
}

// ✅ PATCH /api/orders/:id → Update order status (or other fields)
export async function PATCH(request, { params }) {
  await connectDB();

  const { id } = params;
  const body = await request.json();

  // Only allow updating these fields for now
  const allowedFields = ["status", "paymentStatus", "transactionId"];
  const update = {};

  for (const field of allowedFields) {
    if (field in body) update[field] = body[field];
  }

  if (Object.keys(update).length === 0) {
    return NextResponse.json(
      { message: "No valid fields to update" },
      { status: 400 }
    );
  }

  try {
    const updatedOrder = await Order.findByIdAndUpdate(id, update, {
      new: true,
    });
    if (!updatedOrder) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    return NextResponse.json(updatedOrder, { status: 200 });
  } catch (error) {
    console.error("Error updating order:", error);
    return NextResponse.json(
      { message: "Server error", error },
      { status: 500 }
    );
  }
}

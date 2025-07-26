import { NextResponse } from "next/server";
import Order from "@/models/Order";
import { connectDB } from "@/lib/db";

export async function PATCH(request, { params }) {
  await connectDB();

  const { id } = params;
  const { status } = await request.json();

  // ✅ Add your log here
  console.log("Updating order", id, "to", status);

  if (!status) {
    return NextResponse.json({ message: "Status is required" }, { status: 400 });
  }

  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    return NextResponse.json(updatedOrder, { status: 200 });
  } catch (error) {
    console.error("Error updating order:", error);
    return NextResponse.json({ message: "Server error", error }, { status: 500 });
  }
}

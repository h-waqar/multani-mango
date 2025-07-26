import { NextResponse } from "next/server";
import Order from "@/models/Order";
import { connectDB } from "@/lib/db";
export async function PATCH(request, { params }) {
  await connectDB();

  const { id } = params;
  const body = await request.json();
  const { status } = body;

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
    return NextResponse.json({ message: "Server error", error }, { status: 500 });
  }
}

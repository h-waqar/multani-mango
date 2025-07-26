import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();

  const now = new Date();
  const days30Ago = new Date();
  days30Ago.setDate(now.getDate() - 30);

  try {
    const [
      totalOrders,
      ordersLast30Days,
      completedOrders,
      declinedOrders,
      orders,
      paymentBreakdown,
      dailyOrderTrend,
      topProducts,
      topCustomers,
    ] = await Promise.all([
      Order.countDocuments(),
      Order.countDocuments({ createdAt: { $gte: days30Ago } }),
      Order.countDocuments({ status: "completed" }),
      Order.countDocuments({ status: "declined" }),

      // Get all orders (for revenue + AOV + fulfillment calc)
      Order.find(),

      // Payment breakdown
      Order.aggregate([
        {
          $group: {
            _id: "$payment",
            count: { $sum: 1 },
          },
        },
      ]),

      // Daily order count for last 30 days
      Order.aggregate([
        {
          $match: { createdAt: { $gte: days30Ago } },
        },
        {
          $group: {
            _id: {
              $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
            },
            count: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
      ]),

      // Top-selling products
      Order.aggregate([
        { $unwind: "$cart" },
        {
          $group: {
            _id: "$cart._id",
            name: { $first: "$cart.name" },
            totalSold: { $sum: "$cart.qty" },
          },
        },
        { $sort: { totalSold: -1 } },
        { $limit: 5 },
      ]),

      // Top customers by email
      Order.aggregate([
        {
          $group: {
            _id: "$email",
            orderCount: { $sum: 1 },
          },
        },
        { $sort: { orderCount: -1 } },
        { $limit: 5 },
      ]),
    ]);

    // 💰 Revenue calculations from completed orders
    const completedRevenueOrders = orders.filter(
      (o) => o.status === "completed"
    );

    const revenueOverall = completedRevenueOrders.reduce((sum, order) => {
      return (
        sum +
        order.cart.reduce((itemSum, item) => itemSum + item.price * item.qty, 0)
      );
    }, 0);

    const revenueLast30Days = completedRevenueOrders
      .filter((o) => new Date(o.createdAt) >= days30Ago)
      .reduce((sum, order) => {
        return (
          sum +
          order.cart.reduce(
            (itemSum, item) => itemSum + item.price * item.qty,
            0
          )
        );
      }, 0);

    // 💰 AOV = revenue / number of orders
    const averageOrderValue = orders.length
      ? revenueOverall / orders.length
      : 0;

    // 🕑 Avg fulfillment time (in days)
    const completedWithTime = completedRevenueOrders.filter(
      (o) => o.createdAt && o.status === "completed"
    );

    const averageFulfillmentTimeDays = completedWithTime.length
      ? completedWithTime.reduce((sum, o) => {
          const created = new Date(o.createdAt);
          const completed = new Date(o.updatedAt || o.createdAt);
          const diffMs = Math.abs(completed - created);
          const diffDays = diffMs / (1000 * 60 * 60 * 24);
          return sum + diffDays;
        }, 0) / completedWithTime.length
      : 0;

    // 🏦 Convert payment breakdown to object
    const paymentStats = {};
    paymentBreakdown.forEach((p) => {
      paymentStats[p._id] = p.count;
    });

    return NextResponse.json({
      totalOrders,
      ordersLast30Days,
      completedOrders,
      declinedOrders,
      revenueOverall: Math.round(revenueOverall),
      revenueLast30Days: Math.round(revenueLast30Days),
      averageOrderValue: Math.round(averageOrderValue),
      averageFulfillmentTimeDays: parseFloat(
        averageFulfillmentTimeDays.toFixed(2)
      ),
      paymentBreakdown: paymentStats,
      topProducts,
      topCustomers,
      dailyOrderTrend,
    });
  } catch (error) {
    console.error("Error generating order stats:", error);
    return NextResponse.json(
      { message: "Failed to generate order stats", error },
      { status: 500 }
    );
  }
}

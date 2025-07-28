"use client";
import { useState } from "react";

export default function OrderClient({ order }) {
  const [status, setStatus] = useState(order.status || "pending");

  return (
    <div className="max-w-3xl mx-auto p-6 sm:p-8 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-[--primary]">
      <h2 className="text-3xl font-bold mb-6 text-[--primary] dark:text-[--primary]">
        🧾 Order Details
      </h2>

      <div className="grid gap-4 md:grid-cols-2 text-gray-800 dark:text-gray-200">
        <p>
          <strong>Name:</strong> {order.name}
        </p>
        <p>
          <strong>Email:</strong> {order.email}
        </p>
        <p>
          <strong>Phone:</strong> {order.phone}
        </p>
        <p>
          <strong>Payment:</strong> {order.payment}
        </p>
        <p>
          <strong>Transaction Id:</strong> {order.transactionId}
        </p>
        <p>
          <strong>Address:</strong> {order.address}
        </p>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2 text-[--secondary]">
          🛒 Cart Items
        </h3>
        <ul className="list-disc ml-6 space-y-1 text-gray-700 dark:text-gray-300">
          {order.cart.map((item, index) => (
            <li key={index}>
              {item.qty} × {item.name} —{" "}
              <span className="font-medium text-[--accent]">
                Rs. {item.price}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-6 text-right text-xl font-bold text-green-600 dark:text-green-400">
        Total: Rs.{" "}
        {order.cart.reduce((total, item) => total + item.price * item.qty, 0)}
      </p>
    </div>
  );
}

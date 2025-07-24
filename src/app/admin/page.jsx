"use client";
import { useEffect, useState } from "react";
import { ScrollArea } from "@radix-ui/react-scroll-area";

export default function Admin() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("/api/order")
      .then(res => res.json())
      .then(data => {
        setOrders(data);
        setLoading(false);
      });
  }, []);
  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-[#F4C430]">Admin: Sales Orders</h1>
      {loading ? <div>Loading...</div> : (
        <ScrollArea className="border rounded-lg bg-white shadow p-4">
          {orders.length === 0 ? <div>No orders yet.</div> : orders.map(order => (
            <div key={order._id} className="mb-6 border-b pb-4">
              <div className="font-bold text-lg">{order.name} ({order.phone})</div>
              <div className="mb-1">{order.address}</div>
              <div className="mb-1">Payment: {order.payment} | TxID: {order.transactionId}</div>
              <div className="mb-1">Date: {new Date(order.createdAt).toLocaleString()}</div>
              <div className="mb-2 font-semibold">Cart:</div>
              <ul className="ml-4 list-disc">
                {order.cart.map(item => (
                  <li key={item._id}>{item.name} x {item.qty} @ Rs. {item.price}/kg</li>
                ))}
              </ul>
            </div>
          ))}
        </ScrollArea>
      )}
    </div>
  );
}

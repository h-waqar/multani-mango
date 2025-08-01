// src\app\admin\orders\page.jsx
import { notFound } from "next/navigation";
import OrderClient from "@/components/OrderClient"; 

import { headers } from "next/headers";

export default async function SingleOrderPage({ params }) {
  const host = headers().get("host");
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const url = `${protocol}://${host}/api/order?id=${params.id}`;

  const res = await fetch(url, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch");

  const orders = await res.json();
  const foundOrder = orders.find((o) => o._id === params.id);

  if (!foundOrder) return notFound();

  return <OrderClient order={foundOrder} />;
}

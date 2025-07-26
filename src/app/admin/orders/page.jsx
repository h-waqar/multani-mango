"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/order");
        if (!res.ok) throw new Error("Failed to fetch orders");
        const data = await res.json();
        setOrders(data);
        setFilteredOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  useEffect(() => {
    const filtered = orders.filter((order) =>
      order.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredOrders(filtered);
    setCurrentPage(1);
  }, [searchTerm, orders]);

  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  const goToPage = (pageNum) => {
    if (pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const res = await fetch(`/api/order/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error("Failed to update status");

      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (err) {
      alert("Status update failed.");
    }
  };

  return (
    <div
      className="p-6 sm:p-8 md:p-10 shadow-xl rounded-2xl transition-all duration-300 bg-white" 
      style={{
        color: "var(--foreground)",
      }}
    >
      <h2
        className="text-3xl sm:text-4xl font-extrabold mb-6"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--primary), var(--accent), var(--destructive))",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        📋 Orders Table View
      </h2>

      <input
        type="text"
        placeholder="Search by name..."
        className="mb-4 px-4 py-2 border rounded w-full sm:w-1/2"
        style={{
          backgroundColor: "var(--input)",
          color: "var(--foreground)",
          borderColor: "var(--border)",
        }}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {loading ? (
        <p style={{ color: "var(--muted-foreground)" }}>Loading orders...</p>
      ) : error ? (
        <p style={{ color: "var(--destructive)" }}>{error}</p>
      ) : filteredOrders.length === 0 ? (
        <p style={{ color: "var(--muted-foreground)" }}>No orders found.</p>
      ) : (
        <>
          <div className="overflow-auto">
            <table className="min-w-full text-sm" style={{ borderColor: "var(--border)" }}>
              <thead
                style={{
                  backgroundColor: "var(--popover)",
                  color: "var(--popover-foreground)",
                }}
              >
                <tr>
                  {[
                    "#",
                    "Name",
                    "Email",
                    "Phone",
                    "Payment",
                    "Total",
                    "Date",
                    "Actions",
                  ].map((heading) => (
                    <th key={heading} className="p-3 text-left">
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentOrders.map((order, i) => (
                  <tr
                    key={order._id}
                    style={{
                      borderBottom: "1px solid var(--border)",
                      backgroundColor: "var(--card)",
                    }}
                    className="hover:bg-opacity-80 transition"
                  >
                    <td className="p-3">{indexOfFirstOrder + i + 1}</td>
                    <td className="p-3">{order.name}</td>
                    <td className="p-3">{order.email}</td>
                    <td className="p-3">{order.phone}</td>
                    <td className="p-3 capitalize">{order.payment}</td>
                    <td
                      className="p-3 font-semibold"
                      style={{ color: "var(--primary)" }}
                    >
                      Rs.{" "}
                      {order.cart.reduce(
                        (total, item) => total + item.price * item.qty,
                        0
                      )}
                    </td>
                    <td className="p-3">
                      {new Date(order.createdAt).toLocaleString()}
                    </td>
                    <td className="p-3 space-y-2">
                      <Link
                        href={`/admin/orders/${order._id}`}
                        className="block text-xs font-semibold rounded text-center"
                        style={{
                          backgroundColor: "var(--primary)",
                          color: "var(--primary-foreground)",
                          padding: "0.25rem 0.75rem",
                        }}
                      >
                        View
                      </Link>

                      <select
                        value={order.status || "pending"}
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        className="block w-full text-xs rounded"
                        style={{
                          backgroundColor: "var(--input)",
                          color: "var(--foreground)",
                          padding: "0.25rem",
                          border: "1px solid var(--border)",
                        }}
                      >
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                        <option value="declined">Declined</option>
                        <option value="shipped">Shipped</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-wrap items-center justify-center mt-6 gap-2">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              style={{
                backgroundColor: "var(--muted)",
                color: "var(--foreground)",
                padding: "0.5rem 0.75rem",
                borderRadius: "0.5rem",
                opacity: currentPage === 1 ? 0.5 : 1,
              }}
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                onClick={() => goToPage(num)}
                style={{
                  backgroundColor:
                    num === currentPage ? "var(--primary)" : "var(--muted)",
                  color:
                    num === currentPage
                      ? "var(--primary-foreground)"
                      : "var(--foreground)",
                  padding: "0.5rem 0.75rem",
                  borderRadius: "0.5rem",
                }}
              >
                {num}
              </button>
            ))}

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              style={{
                backgroundColor: "var(--muted)",
                color: "var(--foreground)",
                padding: "0.5rem 0.75rem",
                borderRadius: "0.5rem",
                opacity: currentPage === totalPages ? 0.5 : 1,
              }}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

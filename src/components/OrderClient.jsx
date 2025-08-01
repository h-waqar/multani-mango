// "use client";
// import { useState } from "react";

// export default function OrderClient({ order }) {
//   const [status, setStatus] = useState(order.status || "pending");

//   return (
//     <div className="max-w-3xl mx-auto p-6 sm:p-8 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-[--primary]">
//       <h2 className="text-3xl font-bold mb-6 text-[--primary] dark:text-[--primary]">
//         🧾 Order Details
//       </h2>

//       <div className="grid gap-4 md:grid-cols-2 text-gray-800 dark:text-gray-200">
//         <p>
//           <strong>Name:</strong> {order.name}
//         </p>
//         <p>
//           <strong>Email:</strong> {order.email}
//         </p>
//         <p>
//           <strong>Phone:</strong> {order.phone}
//         </p>
//         <p>
//           <strong>Payment:</strong> {order.payment}
//         </p>
//         <p>
//           <strong>Transaction Id:</strong> {order.transactionId}
//         </p>
//         <p>
//           <strong>Address:</strong> {order.address}
//         </p>
//       </div>

//       <div className="mt-6">
//         <h3 className="text-xl font-semibold mb-2 text-[--secondary]">
//           🛒 Cart Items
//         </h3>
//         <ul className="list-disc ml-6 space-y-1 text-gray-700 dark:text-gray-300">
//           {order.cart.map((item, index) => (
//             <li key={index}>
//               {item.qty} × {item.name} —{" "}
//               <span className="font-medium text-[--accent]">
//                 Rs. {item.price}
//               </span>
//             </li>
//           ))}
//         </ul>
//       </div>

//       <p className="mt-6 text-right text-xl font-bold text-green-600 dark:text-green-400">
//         Total: Rs.{" "}
//         {order.cart.reduce((total, item) => total + item.price * item.qty, 0)}
//       </p>
//     </div>
//   );
// }

"use client";
import { useState } from "react";

export default function OrderClient({ order }) {
  const [status, setStatus] = useState(order.status || "pending");

  const totalAmount = order.cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <div className="max-w-3xl mx-auto p-6 sm:p-8 bg-card text-card-foreground rounded-2xl shadow-2xl border border-[--primary] space-y-6">
      <h2 className="text-3xl font-bold text-[--primary] flex items-center gap-2">
        🧾 Order Details
        <span className="text-sm font-medium bg-[--muted] text-[--muted-foreground] px-3 py-1 rounded-full">
          #{order._id.slice(-6).toUpperCase()}
        </span>
      </h2>

      <section className="grid md:grid-cols-2 gap-4 border border-[--border] p-4 rounded-xl bg-[--popover]">
        <p>
          <strong className="text-[--secondary]">Name:</strong> {order.name}
        </p>
        <p>
          <strong className="text-[--secondary]">Email:</strong> {order.email}
        </p>
        <p>
          <strong className="text-[--secondary]">Phone:</strong> {order.phone}
        </p>
        <p>
          <strong className="text-[--secondary]">Payment:</strong>{" "}
          {order.payment === "cod" ? "Cash on Delivery" : "Bank Transfer"}
        </p>
        {order.transactionId && (
          <p className="md:col-span-2">
            <strong className="text-[--secondary]">Transaction ID:</strong>{" "}
            {order.transactionId}
          </p>
        )}
        <p className="md:col-span-2">
          <strong className="text-[--secondary]">Address:</strong>{" "}
          {order.address}
        </p>
      </section>

      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-[--secondary] border-b pb-2">
          🛍️ Cart Items
        </h3>
        <div className="divide-y divide-[--border] border border-[--border] rounded-xl">
          {order.cart.map((item, idx) => (
            <div key={idx} className="flex justify-between items-center p-4">
              <div>
                <p className="font-medium text-[--foreground]">
                  {item.qty} × {item.name}
                </p>
                <p className="text-sm text-[--muted-foreground]">
                  Rs. {item.price.toLocaleString()} each
                </p>
              </div>
              <p className="font-bold text-[--accent]">
                Rs. {(item.qty * item.price).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </section>

      <div className="text-right text-2xl font-bold text-green-600 dark:text-green-400">
        Total: Rs. {totalAmount.toLocaleString()}
      </div>
    </div>
  );
}

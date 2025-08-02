"use client";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";
// import { useCart } from "@/context/CartContext";

export default function ProductCard({ mango, onAdd }) {
  const [qty, setQty] = useState(1);
  const [showMsg, setShowMsg] = useState(false);

  // const {updateQty} = useCart(); // Import updateQty from context

  function handleAdd() {
    mango.qty = qty; // Set the quantity on the mango object
    onAdd({ ...mango, qty });
    console.log("Added to cart:", mango);
    setShowMsg(true);
    setTimeout(() => setShowMsg(false), 1200);
  }

  function increment() {
    setQty((prev) => prev + 1);
  }

  function decrement() {
    setQty((prev) => (prev > 1 ? prev - 1 : 1));
  }

  return (
    <div className="rounded-2xl bg-[var(--card)] text-[var(--card-foreground)] p-4 shadow-md hover:shadow-xl transition duration-300 relative group border border-[var(--border)]">
      {/* Image */}
      <div className="overflow-hidden rounded-xl">
        <img
          src={mango.image}
          alt={mango.name}
          className="w-full h-auto object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Product Info */}
      <h3 className="mt-4 text-xl font-semibold text-[var(--primary)]">
        {mango.name}
      </h3>
      <p className="text-sm text-[var(--muted-foreground)] mt-1">
        {mango.description}
      </p>
      <div className="mt-2 font-medium text-green-600">
        Rs. {mango.price.toLocaleString()} / kg
      </div>

      {/* Quantity Controls & Add Button */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={decrement}
            disabled={qty === 1}
            className="bg-[var(--muted)] text-[var(--muted-foreground)] p-2 rounded-md hover:bg-[var(--accent)] disabled:opacity-50"
          >
            <Minus size={16} />
          </button>
          <span className="min-w-[2rem] text-center font-medium">{qty}</span>
          <button
            onClick={increment}
            className="bg-[var(--muted)] text-[var(--muted-foreground)] p-2 rounded-md hover:bg-[var(--accent)]"
          >
            <Plus size={16} />
          </button>
        </div>

        <button
          onClick={handleAdd}
          className="bg-[var(--primary)] text-[var(--primary-foreground)] px-4 py-2 rounded-lg font-bold hover:bg-[var(--accent)] transition-colors"
        >
          Add to Cart
        </button>
      </div>

      {/* Feedback Message */}
      {showMsg && (
        <div className="absolute top-3 right-3 bg-green-500 text-white text-xs px-3 py-1 rounded-full shadow">
          Added!
        </div>
      )}
    </div>
  );
}

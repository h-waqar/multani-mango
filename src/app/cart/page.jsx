"use client";
import { useCart } from "@/context/CartContext";
import { Minus, Plus, Trash2 } from "lucide-react";

export default function CartPage() {
  const { cart, updateQty, removeFromCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  if (cart.length === 0) {
    return (
      <div className="text-center py-20 text-xl font-semibold text-gray-500">
        Your cart is empty.
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-[var(--primary)]">Your Cart</h1>
      {cart.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between border-b py-4"
        >
          <div className="flex items-center gap-4">
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 rounded-lg object-cover"
            />
            <div>
              <h2 className="font-semibold text-lg">{item.name}</h2>
              <p className="text-sm text-gray-500">
                Rs. {item.price.toLocaleString()} / kg
              </p>
              <div className="flex items-center mt-2 gap-2">
                <button
                  onClick={() => updateQty(item._id, item.qty - 1)}
                  disabled={item.qty <= 1}
                  className="p-1 bg-gray-200 rounded"
                >
                  <Minus size={14} />
                </button>
                <span>{item.qty}</span>
                <button
                  onClick={() => updateQty(item._id, item.qty + 1)}
                  className="p-1 bg-gray-200 rounded"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>
          </div>

          <div className="text-right">
            <p className="font-medium">
              Rs. {(item.price * item.qty).toLocaleString()}
            </p>
            <button
              onClick={() => removeFromCart(item._id)}
              className="text-red-500 mt-2 hover:underline text-sm flex items-center gap-1"
            >
              <Trash2 size={14} /> Remove
            </button>
          </div>
        </div>
      ))}
      <div className="text-right text-xl font-bold">
        Total: Rs. {total.toLocaleString()}
      </div>
    </div>
  );
}

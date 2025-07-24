"use client";
import { useState } from "react";

export default function ProductCard({ mango, onAdd }) {
  const [qty, setQty] = useState(1);
  const [showMsg, setShowMsg] = useState(false);

  function handleAdd() {
    onAdd({ ...mango, qty });
    setShowMsg(true);
    setTimeout(() => setShowMsg(false), 1200);
  }

  return (
    <div className="border rounded-lg p-4 bg-white shadow relative hover:shadow-lg transition">
      <img src={mango.image} alt={mango.name} className="w-full h-40 object-cover mb-2 rounded" />
      <h3 className="font-bold text-lg text-[#F4C430]">{mango.name}</h3>
      <p>{mango.description}</p>
      <div className="mt-2 font-semibold text-[#4CAF50]">Rs. {mango.price} / kg</div>
      <div className="flex items-center gap-2 mt-2">
        <input type="number" min={1} value={qty} onChange={e => setQty(Number(e.target.value))} className="border rounded px-2 w-16" />
        <button className="bg-[#F4C430] text-white px-4 py-2 rounded font-bold shadow hover:bg-[#4CAF50] transition" onClick={handleAdd}>
          Add to Cart
        </button>
      </div>
      {showMsg && (
        <div className="absolute top-2 right-2 bg-green-500 text-white px-3 py-1 rounded shadow text-xs">Added!</div>
      )}
    </div>
  );
}

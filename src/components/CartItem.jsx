"use client";
export default function CartItem({ item, onUpdate, onRemove }) {
  return (
    <div className="flex items-center justify-between p-2 border-b">
      <div>{item.name}</div>
      <div>Qty: {item.qty}</div>
      <div>Total: Rs. {item.price * item.qty}</div>
      <button className="px-2" onClick={() => onUpdate(item._id, item.qty + 1)}>+</button>
      <button className="px-2" onClick={() => onUpdate(item._id, item.qty - 1)} disabled={item.qty <= 1}>-</button>
      <button className="px-2 text-red-600" onClick={() => onRemove(item._id)}>Remove</button>
    </div>
  );
}

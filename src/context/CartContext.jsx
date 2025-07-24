"use client";
import { createContext, useContext, useState } from "react";

const CartContext = createContext();


export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  function addToCart(mango) {
    setCart((prev) => {
      const id = mango._id || mango.slug;
      const qtyToAdd = mango.qty || 1;
      const existing = prev.find((item) => item._id === id);
      let updated;
      if (existing) {
        updated = prev.map((item) =>
          item._id === id ? { ...item, qty: item.qty + qtyToAdd } : item
        );
      } else {
        updated = [...prev, { ...mango, _id: id, qty: qtyToAdd }];
      }
      console.log('Cart updated:', updated);
      return updated;
    });
  }

  function updateQty(id, qty) {
    setCart((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, qty: qty } : item
      ).filter((item) => item.qty > 0)
    );
  }

  function removeFromCart(id) {
    setCart((prev) => prev.filter((item) => item._id !== id));
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQty, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}

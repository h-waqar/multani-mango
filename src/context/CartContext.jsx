"use client";
import { createContext, useContext, useEffect, useState } from "react";

// 1. Create a new context to hold cart data and actions
const CartContext = createContext();

// 2. This is the provider component that wraps your app and provides cart functionality
export function CartProvider({ children }) {
  // Initialize cart from localStorage if available
  const [cart, setCart] = useState(() => {
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem("cart");
      return storedCart ? JSON.parse(storedCart) : [];
    }
    return [];
  });

  // 3. Store updated cart to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  console.log("Cart:", cart); // Optional: remove in production

  // 4. Add or replace item in the cart with specific quantity
  function addToCart(mango) {
    setCart((prev) => {
      const id = mango.id;
      const qtyToSet = mango.qty || 1;

      const existing = prev.find((item) => item.id === id);

      let updated;
      if (existing) {
        // If item exists, replace the quantity (not add to it)
        updated = prev.map((item) =>
          item.id === id ? { ...item, qty: qtyToSet } : item
        );
      } else {
        // If item doesn't exist, add it to the cart
        updated = [...prev, { ...mango, qty: qtyToSet }];
      }

      console.log("Cart updated:", updated);
      return updated;
    });
  }

  // 5. Update quantity of an item directly
  function updateQty(id, qty) {
    setCart((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, qty } : item))
        .filter((item) => item.qty > 0) // Remove if qty is 0
    );
  }

  // 6. Remove item from the cart by ID
  function removeFromCart(id) {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }

  // 7. Expose the cart and all actions to components
  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateQty, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

// 8. Custom hook to easily access cart context
export function useCart() {
  return useContext(CartContext);
}

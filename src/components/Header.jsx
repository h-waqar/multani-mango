"use client";
import { useCart } from '../context/CartContext';

export default function Header() {
  const { cart } = useCart();
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  return (
    <header className="bg-yellow-400 p-4 flex justify-between items-center">
      <div className="font-pacifico text-2xl">Multani Mango</div>
      <nav>
        <a href="/" className="mx-2">Home</a>
        <a href="/shop" className="mx-2">Shop</a>
        <a href="/cart" className="mx-2 relative">
          Cart
          {count > 0 && (
            <span className="absolute -top-2 -right-3 bg-[#4CAF50] text-white rounded-full px-2 text-xs">{count}</span>
          )}
        </a>
      </nav>
    </header>
  );
}

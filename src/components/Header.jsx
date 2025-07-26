"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { Menu, X } from "lucide-react"; // Install lucide-react for icons

export default function Header() {
  const { cart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const count = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <header className="bg-[var(--header-color)] text-[var(--foreground)] shadow-md px-4 py-3 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <img
            src="/images/logo.png" // replace with your image path
            alt="Mango Brand Logo"
            className="w-24 object-contain"
          />
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 text-md font-medium">
          <Link
            href="/"
            className="hover:text-[var(--primary)] transition-colors"
          >
            Home
          </Link>
          <Link
            href="/shop"
            className="hover:text-[var(--primary)] transition-colors"
          >
            Shop
          </Link>
          <Link
            href="/cart"
            className="relative hover:text-[var(--primary)] transition-colors"
          >
            Cart
            {isMounted && count > 0 && (
              <span className="absolute -top-2 -right-3 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-full px-2 text-xs font-bold">
                {count}
              </span>
            )}
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-[var(--foreground)]"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <nav className="md:hidden mt-2 flex flex-col gap-3 px-2 text-sm font-medium bg-[var(--background)] border-t border-[var(--border)] pt-3">
          <Link
            href="/"
            className="hover:text-[var(--primary)] transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/shop"
            className="hover:text-[var(--primary)] transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            Shop
          </Link>
          <Link
            href="/cart"
            className="relative hover:text-[var(--primary)] transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            Cart
            {isMounted && count > 0 && (
              <span className="absolute top-0 right-0 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-full px-2 text-xs font-bold">
                {count}
              </span>
            )}
          </Link>
        </nav>
      )}
    </header>
  );
}

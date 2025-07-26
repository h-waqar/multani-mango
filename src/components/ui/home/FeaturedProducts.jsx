"use client";

import ProductCard from "@/components/ProductCard";
import { useCart } from "@/context/CartContext";

const mangoes = [
  {
    id: "chaunsa",
    name: "Chaunsa Mango",
    price: 1200,
    image: "/images/chaunsa.jpg",
    description: "Juicy, sweet and aromatic—perfect for summer delight.",
  },
  {
    id: "chaunsa",
    name: "Chaunsa Mango",
    price: 1200,
    image: "/images/chaunsa.jpg",
    description: "Juicy, sweet and aromatic—perfect for summer delight.",
  },
  {
    id: "chaunsa",
    name: "Chaunsa Mango",
    price: 1200,
    image: "/images/chaunsa.jpg",
    description: "Juicy, sweet and aromatic—perfect for summer delight.",
  },
];

export default function FeaturedProducts() {
  const { addToCart } = useCart();

  return (
    <section className="px-6 py-20 bg-[var(--muted)] text-[var(--foreground)]">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-[var(--primary)] mb-4">
          Best Sellers
        </h2>
        <p className="text-[var(--muted-foreground)] max-w-xl mx-auto mb-10">
          Explore our most loved mango varieties fresh from Multan.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {mangoes.map((mango, index) => (
            <ProductCard key={index} mango={mango} onAdd={addToCart} />
          ))}
        </div>
      </div>
    </section>
  );
}

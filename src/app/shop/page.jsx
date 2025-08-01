"use client";
// src/app/shop/page.jsx
import { useState, useMemo } from "react";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/productData";
import { useCart } from "@/context/CartContext";

const categories = ["All", ...new Set(products.map((p) => p.category))];

export default function Shop() {
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState(["All"]);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [currentPage, setCurrentPage] = useState(1);
  const [showSidebar, setShowSidebar] = useState(false);
  const itemsPerPage = 6;

  const { addToCart } = useCart(); // ✅ Use addToCart from context

  const handleCategoryChange = (category) => {
    if (category === "All") {
      setSelectedCategories(["All"]);
    } else {
      let updated = selectedCategories.includes(category)
        ? selectedCategories.filter((c) => c !== category)
        : [...selectedCategories.filter((c) => c !== "All"), category];

      if (updated.length === 0) updated = ["All"];
      setSelectedCategories(updated);
    }
    setCurrentPage(1);
  };

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => p.name.toLowerCase().includes(search.trim().toLowerCase()))
      .filter((p) =>
        selectedCategories.includes("All")
          ? true
          : selectedCategories.includes(p.category)
      )
      .filter((p) => p.price <= maxPrice);
  }, [search, selectedCategories, maxPrice]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <main className="min-h-screen text-[var(--foreground)] px-4 py-12 relative">
        {/* Mobile/Tablet Sidebar Toggle Button */}
        <div className="md:hidden fixed top-20 left-4 z-40">
          <button
            onClick={() => setShowSidebar(true)}
            className="px-4 py-2 bg-[var(--primary)] text-white rounded shadow"
          >
            Show Filters
          </button>
        </div>

        {showSidebar && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
            onClick={() => setShowSidebar(false)}
          />
        )}

        <div className="max-w-7xl mx-auto flex gap-8">
          {/* Sidebar */}
          <aside
            className={`md:static md:translate-x-0 fixed top-0 left-0 z-40 w-3/4 max-w-xs h-full md:h-auto overflow-y-auto bg-white shadow-md border-r transition-transform duration-300 transform ${
              showSidebar ? "translate-x-0" : "-translate-x-full"
            } md:w-1/4 p-4 rounded-md md:rounded-xl`}
          >
            <div className="flex justify-between items-center mb-4 md:hidden">
              <h2 className="text-lg font-semibold">Filters</h2>
              <button
                onClick={() => setShowSidebar(false)}
                className="text-gray-700 text-xl"
              >
                ✕
              </button>
            </div>

            <input
              type="text"
              placeholder="Search mango..."
              className="w-full border border-gray-300 p-2 rounded mb-4"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />

            <div className="mb-4">
              <h3 className="font-medium mb-2">Category</h3>
              {categories.map((category) => (
                <label key={category} className="block mb-1 capitalize">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                    className="mr-2"
                  />
                  {category}
                </label>
              ))}
            </div>

            <div className="mb-4">
              <h3 className="font-medium mb-2">Max Price: Rs. {maxPrice}</h3>
              <input
                type="range"
                min="500"
                max="1000"
                step="50"
                value={maxPrice}
                onChange={(e) => {
                  setMaxPrice(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="w-full"
              />
            </div>
          </aside>

          {/* Products Section */}
          <section className="md:w-3/4 w-full">
            <h1 className="text-2xl font-bold mb-6 text-center md:text-left">
              Shop Fresh Mangoes
            </h1>

            {paginatedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedProducts.map((mango) => (
                  <ProductCard
                    key={mango.id}
                    mango={mango}
                    onAdd={() => addToCart(mango)} // ✅ using context function
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center mt-20">
                No mangoes found 😢
              </p>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-10 flex justify-center items-center gap-2 flex-wrap">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className={`px-4 py-2 border rounded ${
                    currentPage === 1
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-white text-black"
                  }`}
                >
                  Prev
                </button>

                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-4 py-2 border rounded ${
                      currentPage === i + 1
                        ? "bg-[var(--primary)] text-white"
                        : "bg-white text-black"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 border rounded ${
                    currentPage === totalPages
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-white text-black"
                  }`}
                >
                  Next
                </button>
              </div>
            )}
          </section>
        </div>
      </main>
    </>
  );
}

"use client";
import { useEffect } from "react";
import { X } from "lucide-react";
import Link from "next/link";

export default function Sidebar({ isOpen, onClose }) {
  // Close sidebar on outside click (for mobile)
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        isOpen &&
        !e.target.closest(".admin-sidebar") &&
        !e.target.closest(".sidebar-toggle-btn")
      ) {
        onClose();
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpen, onClose]);

  // Define routes
  const links = [
    { name: "Dashboard", href: "/admin" },
    { name: "Orders", href: "/admin/orders" },
    { name: "Products", href: "/products" },
    { name: "Settings", href: "/settings" },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`admin-sidebar md:static fixed top-0 left-0 h-full w-64 bg-[var(--sidebar)] border-r border-[var(--sidebar-border)] shadow transition-transform duration-300 z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b border-[var(--sidebar-border)]">
          <h2 className="text-lg font-bold text-[var(--primary-color)]">
            Admin
          </h2>
          <button className="md:hidden" onClick={onClose}>
            <X />
          </button>
        </div>

        <ul className="p-4 space-y-2">
          {links.map(({ name, href }, index) => (
            <li key={index}>
              <Link
                href={href}
                className="block p-2 rounded  hover:bg-[var(--sidebar-hover)] hover:text-black transition-colors"
                onClick={onClose} // close sidebar on navigation
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

"use client";
// src/app/admin/layout.jsx

import { useState, useEffect } from "react";
import Sidebar from "@/components/ui/admin/Sidebar";
import { Menu } from "lucide-react";

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

    const verify = () => {
      const input = prompt("🔒 Enter admin password:");
      console.log(input, adminPassword);
      if (input === adminPassword) {
        setAuthenticated(true);
      } else {
        alert("❌ Incorrect password!");
        verify(); // Retry recursively
      }
    };

    verify();
  }, []);

  if (!authenticated) return null;

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 w-0">
        <header className="sticky top-0 z-10 bg-white border-b shadow-sm px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="sidebar-toggle-btn text-gray-700 hover:text-black focus:outline-none md:hidden"
          >
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold">Admin Panel</h1>
          <div className="hidden md:block" />
        </header>

        <main
          className="flex-1 overflow-y-auto p-6 bg-background text-foreground scrollbar"
          onClick={() => {
            if (isSidebarOpen) setIsSidebarOpen(false);
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { Package, Users, ShoppingCart, PackageCheck, BanknoteArrowUp, PackageX } from "lucide-react";
import StatsCard from "@/components/ui/admin/StatsCard";

export default function AdminPage() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/order/stats");
        if (!res.ok) throw new Error("Failed to fetch stats");
        const data = await res.json();
        setStats(data);
        console.log(data);
      } catch (err) {
        console.error("Error fetching stats:", err.message);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="p-6 sm:p-8 md:p-10 bg-white dark:bg-zinc-900 shadow-xl rounded-2xl transition-all duration-300">
      <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 bg-gradient-to-r from-yellow-500 via-orange-500 to-pink-500 text-transparent bg-clip-text">
        🚀 Welcome to Your Admin Panel
      </h2>
      <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
        This is your control center for managing your mango business. Monitor
        orders, track revenue, manage loyal customers, and ensure smooth
        operations—all from one place.
      </p>

      {stats ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatsCard title="Total Orders" value={stats.totalOrders} icon={<ShoppingCart />} />
          <StatsCard title="Last 30 Days Orders" value={stats.ordersLast30Days} icon={<ShoppingCart />} />
          <StatsCard title="Orders Completed" value={stats.completedOrders} icon={<PackageCheck />} iconColor="text-green-600" />
          <StatsCard title="Orders Declined" value={stats.declinedOrders} icon={<PackageX />} iconColor="text-red-600" />
          <StatsCard title="Total Revenue" value={`Rs ${stats.revenueOverall}`} icon={<BanknoteArrowUp />} iconColor="text-green-600" />
          <StatsCard title="Last 30 Days Revenue" value={`Rs ${stats.revenueLast30Days}`} icon={<BanknoteArrowUp />} iconColor="text-green-600" />
          <StatsCard title="Top Customers" value={stats.topCustomers?.length || 0} icon={<Users />} iconColor="text-blue-600" />
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-400">Loading stats...</p>
      )}
    </div>
  );
}

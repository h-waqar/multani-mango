
import React from "react";

export default function StatsCard({ title, value, icon, iconColor = "text-yellow-600" }) {
  return (
    <div className="flex items-center justify-between bg-zinc-100 dark:bg-zinc-800 p-5 rounded-xl shadow-sm hover:shadow-md transition">
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
        <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">{value}</h3>
      </div>
      <div className="bg-white dark:bg-zinc-700 p-2 rounded-full shadow">
        {React.cloneElement(icon, { className: `w-6 h-6 ${iconColor}` })}
      </div>
    </div>
  );
}

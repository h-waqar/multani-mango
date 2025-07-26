import { Package, Users, ShoppingCart,  } from "lucide-react";

export default function AdminPage() {
  const stats = [
    {
      title: "Orders",
      value: 1240,
      icon: <ShoppingCart className="w-6 h-6 text-yellow-600" />,
    },
    {
      title: "Products",
      value: 312,
      icon: <Package className="w-6 h-6 text-green-600" />,
    },
    {
      title: "Users",
      value: 980,
      icon: <Users className="w-6 h-6 text-blue-600" />,
    },
  ];

  return (
    <div className="p-6 sm:p-8 md:p-10 bg-white dark:bg-zinc-900 shadow-xl rounded-2xl transition-all duration-300">
      {/* Welcome Section */}
      <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 bg-gradient-to-r from-yellow-500 via-orange-500 to-pink-500 text-transparent bg-clip-text">
        🚀 Welcome to Your Admin Panel
      </h2>
      <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
        This is your control center. Manage users, add and list games, create tournaments, and tailor your platform settings—all from one place.
      </p>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((item, i) => (
          <div
            key={i}
            className="flex items-center justify-between bg-zinc-100 dark:bg-zinc-800 p-5 rounded-xl shadow-sm hover:shadow-md transition"
          >
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">{item.title}</p>
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">{item.value}</h3>
            </div>
            <div className="bg-white dark:bg-zinc-700 p-2 rounded-full shadow">
              {item.icon}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import {
  BarChart3,
  Bell,
  Cpu,
  Factory,
  LayoutDashboard,
  Settings,
  Users,
} from "lucide-react";

const menuItems = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    name: "Devices",
    icon: Cpu,
    path: "/devices",
  },
  {
    name: "Production",
    icon: Factory,
    path: "/production",
  },
  {
    name: "Alerts",
    icon: Bell,
    path: "/alerts",
  },
  {
    name: "Users",
    icon: Users,
    path: "/users",
  },
  {
    name: "Reports",
    icon: BarChart3,
    path: "/reports",
  },
  {
    name: "Settings",
    icon: Settings,
    path: "/settings",
  },
];

export default function Sidebar() {
  const currentPath = window.location.pathname;

  return (
    <aside className="sticky top-0 flex h-screen w-64 shrink-0 flex-col bg-slate-900 p-6 text-white">
      <div>
        <h1 className="text-2xl font-bold text-emerald-400">
          IndusMate
        </h1>

        <p className="mt-1 text-xs text-slate-400">
          Virtual Industry Platform
        </p>
      </div>

      <nav className="mt-10 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPath === item.path;

          return (
            <a
              key={item.name}
              href={item.path}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                isActive
                  ? "bg-emerald-500 text-slate-950"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </a>
          );
        })}
      </nav>

      <div className="mt-auto border-t border-slate-800 pt-6">
        <div className="rounded-xl bg-slate-800 p-4">
          <p className="text-sm font-semibold text-white">
            Factory status
          </p>

          <div className="mt-3 flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />

            <span className="text-sm text-slate-300">
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-slate-900 text-white p-6">
      <h1 className="text-2xl font-bold text-emerald-400">
        IndusMate
      </h1>

      <nav className="mt-10 space-y-4">
        <a href="#" className="block hover:text-emerald-400">
          Dashboard
        </a>

        <a href="#" className="block hover:text-emerald-400">
          Devices
        </a>

        <a href="#" className="block hover:text-emerald-400">
          Production
        </a>

        <a href="#" className="block hover:text-emerald-400">
          Alerts
        </a>

        <a href="#" className="block hover:text-emerald-400">
          Settings
        </a>
      </nav>
    </aside>
  );
}
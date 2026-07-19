export default function Header() {
  return (
    <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-8">
      <div>
        <p className="text-sm text-slate-500">Good afternoon</p>
        <h2 className="text-xl font-semibold text-slate-900">
          Welcome back, Mohamed
        </h2>
      </div>

      <div className="flex items-center gap-4">
        <button className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
          Notifications
        </button>

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 font-semibold text-white">
          MS
        </div>
      </div>
    </header>
  );
}
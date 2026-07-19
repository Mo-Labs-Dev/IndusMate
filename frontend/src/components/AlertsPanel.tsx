const alerts = [
  {
    id: 1,
    title: "Machine 12 temperature high",
    location: "Assembly Line 2",
    severity: "Critical",
    time: "2 min ago",
  },
  {
    id: 2,
    title: "Camera 4 disconnected",
    location: "Packing Area",
    severity: "Warning",
    time: "8 min ago",
  },
  {
    id: 3,
    title: "Maintenance due soon",
    location: "Conveyor 3",
    severity: "Info",
    time: "1 hour ago",
  },
];

export default function AlertsPanel() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900">
          Recent Alerts
        </h2>

        <button className="text-sm font-medium text-emerald-600 hover:text-emerald-700">
          View all
        </button>
      </div>

      <div className="mt-6 space-y-4">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className="rounded-xl border border-slate-100 bg-slate-50 p-4"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-medium text-slate-900">
                  {alert.title}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  {alert.location}
                </p>
              </div>

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  alert.severity === "Critical"
                    ? "bg-red-100 text-red-700"
                    : alert.severity === "Warning"
                    ? "bg-amber-100 text-amber-700"
                    : "bg-blue-100 text-blue-700"
                }`}
              >
                {alert.severity}
              </span>
            </div>

            <p className="mt-3 text-xs text-slate-400">{alert.time}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
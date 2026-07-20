import DashboardLayout from "../layouts/DashboardLayout";

const alerts = [
  {
    id: "ALT-001",
    title: "Machine-012 temperature high",
    location: "Assembly Line 2",
    severity: "Critical",
    status: "Open",
    time: "2 min ago",
  },
  {
    id: "ALT-002",
    title: "Camera 4 disconnected",
    location: "Packing Area",
    severity: "Warning",
    status: "Open",
    time: "8 min ago",
  },
  {
    id: "ALT-003",
    title: "Maintenance due soon",
    location: "Conveyor 3",
    severity: "Info",
    status: "Acknowledged",
    time: "1 hour ago",
  },
];

export default function AlertsPage() {
  return (
    <DashboardLayout>
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Alerts</h1>

        <p className="mt-2 text-slate-500">
          Review critical events, warnings, and maintenance notifications.
        </p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Open Alerts</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">2</p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Critical</p>
          <p className="mt-2 text-2xl font-bold text-red-600">1</p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Warnings</p>
          <p className="mt-2 text-2xl font-bold text-amber-600">1</p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Acknowledged</p>
          <p className="mt-2 text-2xl font-bold text-emerald-600">1</p>
        </div>
      </div>

      <section className="mt-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              Active Alerts
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Current events that require attention.
            </p>
          </div>

          <button className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
            Filter
          </button>
        </div>

        <div className="mt-6 space-y-4">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className="rounded-xl border border-slate-100 bg-slate-50 p-4"
            >
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <p className="font-semibold text-slate-900">
                      {alert.title}
                    </p>

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

                  <p className="mt-2 text-sm text-slate-500">
                    {alert.location} · {alert.id}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    {alert.time}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-slate-500">
                    {alert.status}
                  </span>

                  {alert.status === "Open" && (
                    <button className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-emerald-400">
                      Acknowledge
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </DashboardLayout>
  );
}
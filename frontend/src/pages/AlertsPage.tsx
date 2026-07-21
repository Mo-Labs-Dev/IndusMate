import { useEffect, useMemo, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import api from "../services/api";

type Alert = {
  id: string;
  title: string;
  location: string;
  severity: "Critical" | "Warning" | "Info";
  status: "Open" | "Acknowledged";
  time: string;
};

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadAlerts() {
      try {
        setError("");

        const response = await api.get<Alert[]>("/alerts");
        setAlerts(response.data);
      } catch {
        setError("Could not load alerts from the backend.");
      } finally {
        setLoading(false);
      }
    }

    loadAlerts();
  }, []);

  const summary = useMemo(() => {
    return {
      open: alerts.filter((alert) => alert.status === "Open").length,
      critical: alerts.filter((alert) => alert.severity === "Critical").length,
      warnings: alerts.filter((alert) => alert.severity === "Warning").length,
      acknowledged: alerts.filter(
        (alert) => alert.status === "Acknowledged"
      ).length,
    };
  }, [alerts]);

  async function handleAcknowledge(alertId: string) {
  try {
    const response = await api.patch<Alert>(
      `/alerts/${alertId}/acknowledge`
    );

    setAlerts((currentAlerts) =>
      currentAlerts.map((alert) =>
        alert.id === alertId ? response.data : alert
      )
    );
  } catch {
    setError("Could not acknowledge the alert.");
  }
}

  if (loading) {
    return (
      <DashboardLayout>
        <div className="rounded-xl border border-slate-200 bg-white p-5 text-slate-500 shadow-sm">
          Loading alerts...
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-red-700">
          {error}
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Alerts
        </h1>

        <p className="mt-2 text-slate-500">
          Review critical events, warnings, and maintenance notifications.
        </p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Open Alerts</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">
            {summary.open}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Critical</p>
          <p className="mt-2 text-2xl font-bold text-red-600">
            {summary.critical}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Warnings</p>
          <p className="mt-2 text-2xl font-bold text-amber-600">
            {summary.warnings}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Acknowledged</p>
          <p className="mt-2 text-2xl font-bold text-emerald-600">
            {summary.acknowledged}
          </p>
        </div>
      </div>

      <section className="mt-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              Active Alerts
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Alerts loaded from the Spring Boot backend.
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
                    <button
                      type="button"
                      onClick={() => handleAcknowledge(alert.id)}
                      className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-emerald-400"
                    >
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
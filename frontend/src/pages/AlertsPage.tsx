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
  source: string;
};

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [acknowledgingId, setAcknowledgingId] = useState<string | null>(
    null
  );

  useEffect(() => {
    let active = true;

    async function loadAlerts() {
      try {
        const response = await api.get<Alert[]>("/alerts");

        if (active) {
          setAlerts(response.data);
          setError("");
        }
      } catch {
        if (active) {
          setError("Could not load alerts from the backend.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadAlerts();

    const timer = window.setInterval(loadAlerts, 10000);

    return () => {
      active = false;
      window.clearInterval(timer);
    };
  }, []);

  const summary = useMemo(() => {
    return {
      open: alerts.filter((alert) => alert.status === "Open").length,
      critical: alerts.filter(
        (alert) =>
          alert.severity === "Critical" &&
          alert.status === "Open"
      ).length,
      warnings: alerts.filter(
        (alert) =>
          alert.severity === "Warning" &&
          alert.status === "Open"
      ).length,
      acknowledged: alerts.filter(
        (alert) => alert.status === "Acknowledged"
      ).length,
    };
  }, [alerts]);

  async function handleAcknowledge(alertId: string) {
    try {
      setAcknowledgingId(alertId);
      setError("");

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
    } finally {
      setAcknowledgingId(null);
    }
  }

  function formatAlertTime(time: string) {
    const parsedDate = new Date(time);

    if (Number.isNaN(parsedDate.getTime())) {
      return time;
    }

    return parsedDate.toLocaleString();
  }

  function getSeverityClasses(severity: Alert["severity"]) {
    if (severity === "Critical") {
      return "bg-red-100 text-red-700";
    }

    if (severity === "Warning") {
      return "bg-amber-100 text-amber-700";
    }

    return "bg-blue-100 text-blue-700";
  }

  function getStatusClasses(status: Alert["status"]) {
    if (status === "Open") {
      return "bg-red-50 text-red-700";
    }

    return "bg-emerald-50 text-emerald-700";
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

  return (
    <DashboardLayout>
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Alerts
        </h1>

        <p className="mt-2 text-slate-500">
          Monitor automatic Bolt IoT alerts, warnings, and
          factory events.
        </p>
      </div>

      {error && (
        <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
          {error}
        </div>
      )}

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Open Alerts
          </p>

          <p className="mt-2 text-2xl font-bold text-slate-900">
            {summary.open}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Critical
          </p>

          <p className="mt-2 text-2xl font-bold text-red-600">
            {summary.critical}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Warnings
          </p>

          <p className="mt-2 text-2xl font-bold text-amber-600">
            {summary.warnings}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Acknowledged
          </p>

          <p className="mt-2 text-2xl font-bold text-emerald-600">
            {summary.acknowledged}
          </p>
        </div>
      </div>

      <section className="mt-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            Active Alerts
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Alerts refresh automatically every 10 seconds.
          </p>
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
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${getSeverityClasses(
                        alert.severity
                      )}`}
                    >
                      {alert.severity}
                    </span>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClasses(
                        alert.status
                      )}`}
                    >
                      {alert.status}
                    </span>
                  </div>

                  <p className="mt-2 text-sm text-slate-500">
                    {alert.location} · {alert.id}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Source: {alert.source}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    {formatAlertTime(alert.time)}
                  </p>
                </div>

                {alert.status === "Open" && (
                  <button
                    type="button"
                    disabled={acknowledgingId === alert.id}
                    onClick={() =>
                      handleAcknowledge(alert.id)
                    }
                    className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {acknowledgingId === alert.id
                      ? "Acknowledging..."
                      : "Acknowledge"}
                  </button>
                )}
              </div>
            </div>
          ))}

          {alerts.length === 0 && (
            <div className="rounded-xl border border-dashed border-slate-200 p-8 text-center text-slate-500">
              No alerts are currently available.
            </div>
          )}
        </div>
      </section>
    </DashboardLayout>
  );
}
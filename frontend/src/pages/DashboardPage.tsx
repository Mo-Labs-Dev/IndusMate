import { useEffect, useState } from "react";
import AlertsPanel from "../components/AlertsPanel";
import StatCard from "../components/StatCard";
import DashboardLayout from "../layouts/DashboardLayout";
import api from "../services/api";

type Telemetry = {
  id: number;
  machineId: string;
  temperature: number;
  vibration: number;
  status: string;
  createdAt: string;
};

export default function DashboardPage() {
  const [telemetry, setTelemetry] = useState<Telemetry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadTelemetry() {
      try {
        const response = await api.get<Telemetry[]>("/telemetry");
        setTelemetry(response.data);
      } catch {
        setError("Could not connect to the IndusMate backend.");
      } finally {
        setLoading(false);
      }
    }

    loadTelemetry();
  }, []);

  const latestTelemetry = telemetry.at(-1);

  return (
    <DashboardLayout>
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Factory Overview
        </h1>

        <p className="mt-2 text-slate-500">
          Live industrial information from the IndusMate backend.
        </p>
      </div>

      {loading && (
        <p className="mt-6 text-slate-500">Loading machine data...</p>
      )}

      {error && (
        <div className="mt-6 rounded-xl bg-red-100 p-4 text-red-700">
          {error}
        </div>
      )}

      {!loading && !error && (
        <>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              title="Machine"
              value={latestTelemetry?.machineId ?? "No data"}
              description="Latest connected machine."
            />

            <StatCard
              title="Machine Status"
              value={latestTelemetry?.status ?? "UNKNOWN"}
              description="Current machine operating state."
            />

            <StatCard
              title="Temperature"
              value={
                latestTelemetry
                  ? `${latestTelemetry.temperature} °C`
                  : "No data"
              }
              description="Latest temperature reading."
            />

            <StatCard
              title="Vibration"
              value={
                latestTelemetry
                  ? `${latestTelemetry.vibration}`
                  : "No data"
              }
              description={`${telemetry.length} telemetry record(s) received.`}
            />
          </div>

          <div className="mt-8 grid gap-6 xl:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm xl:col-span-2">
              <h2 className="text-lg font-semibold text-slate-900">
                Production Overview
              </h2>

              <div className="mt-6 flex h-72 items-center justify-center rounded-xl bg-slate-50 text-slate-400">
                Production chart coming next
              </div>
            </div>

            <AlertsPanel />
          </div>
        </>
      )}
    </DashboardLayout>
  );
}
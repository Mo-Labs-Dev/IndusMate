import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import api from "../services/api";

type Telemetry = {
  id: number;
  machineId: string;
  status: string;
  temperature: number;
  vibration: number;
  createdAt: string;
};

export default function DeviceDetailsPage() {
  const { deviceId } = useParams();

  const [latestTelemetry, setLatestTelemetry] =
    useState<Telemetry | null>(null);

  const [history, setHistory] = useState<Telemetry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
  let isMounted = true;

  async function loadDeviceData(showLoading: boolean) {
    if (!deviceId) {
      setError("Device ID is missing.");
      setLoading(false);
      return;
    }

    try {
      if (showLoading) {
        setLoading(true);
      }

      setError("");

      const [latestResponse, historyResponse] = await Promise.all([
        api.get<Telemetry>(`/telemetry/${deviceId}`),
        api.get<Telemetry[]>(`/telemetry/${deviceId}/history`),
      ]);

      if (!isMounted) {
        return;
      }

      setLatestTelemetry(latestResponse.data);
      setHistory(historyResponse.data);
    } catch {
      if (isMounted) {
        setError("Could not load device data from the backend.");
      }
    } finally {
      if (isMounted) {
        setLoading(false);
      }
    }
  }

  loadDeviceData(true);

  const refreshTimer = window.setInterval(() => {
    loadDeviceData(false);
  }, 5000);

  return () => {
    isMounted = false;
    window.clearInterval(refreshTimer);
  };
}, [deviceId]);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="rounded-xl border border-slate-200 bg-white p-5 text-slate-500 shadow-sm">
          Loading device data...
        </div>
      </DashboardLayout>
    );
  }

  if (error || !latestTelemetry) {
    return (
      <DashboardLayout>
        <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-red-700">
          {error || "Device not found."}
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-emerald-600">
            Device Details
          </p>

          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            {latestTelemetry.machineId}
          </h1>

          <p className="mt-2 text-slate-500">
            Live operating status and recent telemetry from Spring Boot.
          </p>
        </div>

        <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
          {latestTelemetry.status}
        </span>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Temperature</p>

          <p className="mt-2 text-2xl font-bold text-slate-900">
            {latestTelemetry.temperature.toFixed(1)}°C
          </p>

          <p className="mt-2 text-sm text-emerald-600">
            Latest reading
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Vibration</p>

          <p className="mt-2 text-2xl font-bold text-slate-900">
            {latestTelemetry.vibration}
          </p>

          <p className="mt-2 text-sm text-emerald-600">
            Latest reading
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Telemetry Records</p>

          <p className="mt-2 text-2xl font-bold text-slate-900">
            {history.length}
          </p>

          <p className="mt-2 text-sm text-slate-500">
            Records for this machine
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Last Updated</p>

          <p className="mt-2 text-lg font-bold text-slate-900">
            {new Date(latestTelemetry.createdAt).toLocaleString()}
          </p>

          <p className="mt-2 text-sm text-slate-500">
            Backend timestamp
          </p>
        </div>
      </div>

      <section className="mt-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            Telemetry History
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Recent measurements for {latestTelemetry.machineId}.
          </p>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 text-left text-sm text-slate-500">
                <th className="pb-3">Time</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Temperature</th>
                <th className="pb-3">Vibration</th>
              </tr>
            </thead>

            <tbody>
              {history.map((record) => (
                <tr
                  key={record.id}
                  className="border-b border-slate-100 last:border-0"
                >
                  <td className="py-4 text-slate-600">
                    {new Date(record.createdAt).toLocaleString()}
                  </td>

                  <td className="py-4">
                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                      {record.status}
                    </span>
                  </td>

                  <td className="py-4 text-slate-600">
                    {record.temperature.toFixed(1)}°C
                  </td>

                  <td className="py-4 text-slate-600">
                    {record.vibration}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </DashboardLayout>
  );
}
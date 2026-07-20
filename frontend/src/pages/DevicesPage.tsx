import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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

export default function DevicesPage() {
  const [devices, setDevices] = useState<Telemetry[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadDevices(showLoading: boolean) {
      try {
        if (showLoading) {
          setLoading(true);
        } else {
          setRefreshing(true);
        }

        setError("");

        const response = await api.get<Telemetry[]>("/telemetry");

        if (!isMounted) {
          return;
        }

        /*
         * The API may contain multiple telemetry records for one machine.
         * Keep only the newest record for each machine.
         */
        const latestByMachine = new Map<string, Telemetry>();

        response.data.forEach((record) => {
          const existingRecord = latestByMachine.get(record.machineId);

          if (
            !existingRecord ||
            new Date(record.createdAt).getTime() >
              new Date(existingRecord.createdAt).getTime()
          ) {
            latestByMachine.set(record.machineId, record);
          }
        });

        const latestDevices = Array.from(latestByMachine.values()).sort(
          (firstDevice, secondDevice) =>
            firstDevice.machineId.localeCompare(secondDevice.machineId)
        );

        setDevices(latestDevices);
        setLastUpdated(new Date());
      } catch {
        if (isMounted) {
          setError("Could not connect to the IndusMate backend.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
          setRefreshing(false);
        }
      }
    }

    loadDevices(true);

    const refreshTimer = window.setInterval(() => {
      loadDevices(false);
    }, 5000);

    return () => {
      isMounted = false;
      window.clearInterval(refreshTimer);
    };
  }, []);

  function getStatusStyles(status: string) {
    const normalizedStatus = status.toUpperCase();

    if (
      normalizedStatus === "RUNNING" ||
      normalizedStatus === "ONLINE"
    ) {
      return "bg-emerald-100 text-emerald-700";
    }

    if (normalizedStatus === "IDLE") {
      return "bg-amber-100 text-amber-700";
    }

    return "bg-red-100 text-red-700";
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Devices
          </h1>

          <p className="mt-2 text-slate-500">
            Live machines and telemetry from the IndusMate backend.
          </p>

          <p className="mt-2 text-xs text-slate-400">
            {refreshing
              ? "Refreshing telemetry..."
              : lastUpdated
                ? `Last refreshed: ${lastUpdated.toLocaleTimeString()}`
                : "Waiting for telemetry..."}
          </p>
        </div>

        <button className="rounded-xl bg-emerald-500 px-5 py-3 font-semibold text-slate-950 transition hover:bg-emerald-400">
          Add Device
        </button>
      </div>

      {loading && (
        <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5 text-slate-500 shadow-sm">
          Loading devices...
        </div>
      )}

      {error && !loading && (
        <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-5 text-red-700">
          {error}
        </div>
      )}

      {!loading && !error && (
        <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          {devices.length === 0 ? (
            <p className="text-slate-500">
              No telemetry records are available.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200 text-left text-sm text-slate-500">
                    <th className="pb-3">Device</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3">Temperature</th>
                    <th className="pb-3">Vibration</th>
                    <th className="pb-3">Last Updated</th>
                    <th className="pb-3">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {devices.map((device) => (
                    <tr
                      key={device.machineId}
                      className="border-b border-slate-100 last:border-0"
                    >
                      <td className="py-4 font-semibold text-slate-900">
                        {device.machineId}
                      </td>

                      <td className="py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyles(
                            device.status
                          )}`}
                        >
                          {device.status}
                        </span>
                      </td>

                      <td className="py-4 text-slate-600">
                        {device.temperature.toFixed(1)}°C
                      </td>

                      <td className="py-4 text-slate-600">
                        {device.vibration}
                      </td>

                      <td className="py-4 text-slate-600">
                        {new Date(device.createdAt).toLocaleString()}
                      </td>

                      <td className="py-4">
                        <Link
                          to={`/devices/${device.machineId}`}
                          className="font-medium text-emerald-600 hover:text-emerald-700"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </DashboardLayout>
  );
}
import { useParams } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";

const telemetryHistory = [
  { time: "10:00", temperature: "31.8°C", vibration: "1.0", status: "Normal" },
  { time: "10:10", temperature: "32.0°C", vibration: "1.1", status: "Normal" },
  { time: "10:20", temperature: "32.3°C", vibration: "1.2", status: "Normal" },
  { time: "10:30", temperature: "32.5°C", vibration: "1.2", status: "Normal" },
];

export default function DeviceDetailsPage() {
  const { deviceId } = useParams();

  return (
    <DashboardLayout>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-emerald-600">
            Device Details
          </p>

          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            {deviceId}
          </h1>

          <p className="mt-2 text-slate-500">
            Live operating status and recent telemetry.
          </p>
        </div>

        <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
          Online
        </span>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Temperature</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">
            32.5°C
          </p>
          <p className="mt-2 text-sm text-emerald-600">
            Normal range
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Vibration</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">
            1.2
          </p>
          <p className="mt-2 text-sm text-emerald-600">
            Stable
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Runtime Today</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">
            7h 42m
          </p>
          <p className="mt-2 text-sm text-slate-500">
            Since 06:00
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Last Updated</p>
          <p className="mt-2 text-xl font-bold text-slate-900">
            Just now
          </p>
          <p className="mt-2 text-sm text-slate-500">
            Connection healthy
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-3">
        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-2">
          <h2 className="text-xl font-semibold text-slate-900">
            Recent Telemetry
          </h2>

          <div className="mt-5 overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 text-left text-sm text-slate-500">
                  <th className="pb-3">Time</th>
                  <th className="pb-3">Temperature</th>
                  <th className="pb-3">Vibration</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>

              <tbody>
                {telemetryHistory.map((row) => (
                  <tr
                    key={row.time}
                    className="border-b border-slate-100 last:border-0"
                  >
                    <td className="py-4 text-slate-600">{row.time}</td>
                    <td className="py-4 text-slate-600">
                      {row.temperature}
                    </td>
                    <td className="py-4 text-slate-600">
                      {row.vibration}
                    </td>
                    <td className="py-4">
                      <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">
            Device Information
          </h2>

          <div className="mt-5 space-y-4 text-sm">
            <div>
              <p className="text-slate-500">Device Type</p>
              <p className="mt-1 font-semibold text-slate-900">
                CNC Machine
              </p>
            </div>

            <div>
              <p className="text-slate-500">Location</p>
              <p className="mt-1 font-semibold text-slate-900">
                Production Unit A
              </p>
            </div>

            <div>
              <p className="text-slate-500">Protocol</p>
              <p className="mt-1 font-semibold text-slate-900">
                MQTT
              </p>
            </div>

            <div>
              <p className="text-slate-500">Last Maintenance</p>
              <p className="mt-1 font-semibold text-slate-900">
                12 July 2026
              </p>
            </div>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
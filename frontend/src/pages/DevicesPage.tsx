import DashboardLayout from "../layouts/DashboardLayout";
import { Link } from "react-router-dom";

const devices = [
  {
    id: "Machine-001",
    type: "CNC Machine",
    status: "Online",
    temperature: "32.5°C",
    vibration: "1.2",
  },
  {
    id: "Machine-002",
    type: "Conveyor",
    status: "Online",
    temperature: "31.8°C",
    vibration: "1.1",
  },
  {
    id: "Machine-003",
    type: "Industrial Pump",
    status: "Idle",
    temperature: "28.0°C",
    vibration: "0.3",
  },
  {
    id: "Machine-004",
    type: "Packaging Unit",
    status: "Offline",
    temperature: "--",
    vibration: "--",
  },
];

export default function DevicesPage() {
  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Devices
          </h1>

          <p className="mt-2 text-slate-500">
            Monitor machines, PLCs, sensors, and connected equipment.
          </p>
        </div>

        <button className="rounded-xl bg-emerald-500 px-5 py-3 font-semibold text-slate-900 hover:bg-emerald-400">
          Add Device
        </button>
      </div>

      {/* Table */}
      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 text-left text-sm text-slate-500">
                <th className="pb-3">Device</th>
                <th className="pb-3">Type</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Temperature</th>
                <th className="pb-3">Vibration</th>
                <th className="pb-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {devices.map((device) => (
                <tr
                  key={device.id}
                  className="border-b border-slate-100 last:border-0"
                >
                  <td className="py-4 font-semibold text-slate-900">
                    {device.id}
                  </td>

                  <td className="py-4 text-slate-600">
                    {device.type}
                  </td>

                  <td className="py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        device.status === "Online"
                          ? "bg-emerald-100 text-emerald-700"
                          : device.status === "Idle"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {device.status}
                    </span>
                  </td>

                  <td className="py-4 text-slate-600">
                    {device.temperature}
                  </td>

                  <td className="py-4 text-slate-600">
                    {device.vibration}
                  </td>

                  <td className="py-4">
                    <Link
                      to={`/devices/${device.id}`}
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
      </div>
    </DashboardLayout>
  );
}
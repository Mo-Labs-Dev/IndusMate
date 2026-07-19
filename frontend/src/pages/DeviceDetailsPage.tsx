import { useParams } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";

export default function DeviceDetailsPage() {
  const { deviceId } = useParams();

  return (
    <DashboardLayout>
      <div>
        <p className="text-sm font-medium text-emerald-600">
          Device Details
        </p>

        <h1 className="mt-2 text-3xl font-bold text-slate-900">
          {deviceId}
        </h1>

        <p className="mt-2 text-slate-500">
          Live status and telemetry for this connected device.
        </p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Status</p>
          <p className="mt-2 text-2xl font-bold text-emerald-600">
            Online
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Temperature</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">
            32.5°C
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Vibration</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">
            1.2
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Last Updated</p>
          <p className="mt-2 text-lg font-bold text-slate-900">
            Just now
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import api from "../services/api";

type ProductionOrder = {
  id: string;
  product: string;
  target: number;
  produced: number;
  status: string;
};

type ProductionData = {
  targetToday: number;
  producedToday: number;
  efficiency: number;
  downtimeMinutes: number;
  orders: ProductionOrder[];
};

export default function ProductionPage() {
  const [data, setData] = useState<ProductionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProductionData() {
      try {
        setError("");

        const response = await api.get<ProductionData>("/production");

        setData(response.data);
      } catch {
        setError("Could not load production data from the backend.");
      } finally {
        setLoading(false);
      }
    }

    loadProductionData();
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="rounded-xl border border-slate-200 bg-white p-5 text-slate-500 shadow-sm">
          Loading production data...
        </div>
      </DashboardLayout>
    );
  }

  if (error || !data) {
    return (
      <DashboardLayout>
        <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-red-700">
          {error || "Production data is unavailable."}
        </div>
      </DashboardLayout>
    );
  }

  const completionPercent = Math.round(
    (data.producedToday / data.targetToday) * 100
  );

  return (
    <DashboardLayout>
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Production
        </h1>

        <p className="mt-2 text-slate-500">
          Live production targets, output, efficiency, and active orders.
        </p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Today&apos;s Target</p>

          <p className="mt-2 text-2xl font-bold text-slate-900">
            {data.targetToday.toLocaleString()}
          </p>

          <p className="mt-2 text-sm text-slate-500">
            Units planned
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Produced Today</p>

          <p className="mt-2 text-2xl font-bold text-slate-900">
            {data.producedToday.toLocaleString()}
          </p>

          <p className="mt-2 text-sm text-emerald-600">
            {completionPercent}% completed
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Production Efficiency
          </p>

          <p className="mt-2 text-2xl font-bold text-slate-900">
            {data.efficiency}%
          </p>

          <p className="mt-2 text-sm text-emerald-600">
            Current operating efficiency
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Downtime</p>

          <p className="mt-2 text-2xl font-bold text-slate-900">
            {data.downtimeMinutes} min
          </p>

          <p className="mt-2 text-sm text-slate-500">
            Across all production lines
          </p>
        </div>
      </div>

      <section className="mt-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              Production Orders
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Current orders loaded from Spring Boot.
            </p>
          </div>

          <button className="rounded-xl bg-emerald-500 px-5 py-3 font-semibold text-slate-950 hover:bg-emerald-400">
            New Order
          </button>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="border-b border-slate-200 text-left text-sm text-slate-500">
                <th className="px-3 pb-3">Order</th>
                <th className="px-3 pb-3">Product</th>
                <th className="px-3 pb-3">Target</th>
                <th className="px-3 pb-3">Produced</th>
                <th className="px-3 pb-3">Progress</th>
                <th className="px-3 pb-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {data.orders.map((order) => {
                const progress = Math.round(
                  (order.produced / order.target) * 100
                );

                return (
                  <tr
                    key={order.id}
                    className="border-b border-slate-100 last:border-0"
                  >
                    <td className="px-3 py-4 font-semibold text-slate-900">
                      {order.id}
                    </td>

                    <td className="px-3 py-4 text-slate-600">
                      {order.product}
                    </td>

                    <td className="px-3 py-4 text-slate-600">
                      {order.target.toLocaleString()}
                    </td>

                    <td className="px-3 py-4 text-slate-600">
                      {order.produced.toLocaleString()}
                    </td>

                    <td className="px-3 py-4">
                      <div className="w-48">
                        <div className="h-2 rounded-full bg-slate-200">
                          <div
                            className="h-2 rounded-full bg-emerald-500"
                            style={{
                              width: `${Math.min(progress, 100)}%`,
                            }}
                          />
                        </div>

                        <p className="mt-1 text-xs text-slate-500">
                          {progress}%
                        </p>
                      </div>
                    </td>

                    <td className="px-3 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          order.status === "Completed"
                            ? "bg-emerald-100 text-emerald-700"
                            : order.status === "Delayed"
                              ? "bg-red-100 text-red-700"
                              : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </DashboardLayout>
  );
}
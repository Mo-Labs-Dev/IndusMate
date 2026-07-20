import DashboardLayout from "../layouts/DashboardLayout";

const productionOrders = [
  {
    id: "ORD-1001",
    product: "Gear Assembly",
    target: 1200,
    produced: 1200,
    status: "Completed",
  },
  {
    id: "ORD-1002",
    product: "Motor Housing",
    target: 850,
    produced: 620,
    status: "In Progress",
  },
  {
    id: "ORD-1003",
    product: "Bearing Unit",
    target: 600,
    produced: 410,
    status: "Delayed",
  },
];

export default function ProductionPage() {
  return (
    <DashboardLayout>
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Production</h1>

        <p className="mt-2 text-slate-500">
          Track targets, output, efficiency, and active production orders.
        </p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Today&apos;s Target</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">5,000</p>
          <p className="mt-2 text-sm text-slate-500">Units planned</p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Produced Today</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">4,620</p>
          <p className="mt-2 text-sm text-emerald-600">92% completed</p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Production Efficiency</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">94%</p>
          <p className="mt-2 text-sm text-emerald-600">Above target</p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Downtime</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">38 min</p>
          <p className="mt-2 text-sm text-slate-500">Across all lines</p>
        </div>
      </div>

      <section className="mt-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              Production Orders
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Current orders and completion progress.
            </p>
          </div>

          <button className="rounded-xl bg-emerald-500 px-5 py-3 font-semibold text-slate-950 hover:bg-emerald-400">
            New Order
          </button>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 text-left text-sm text-slate-500">
                <th className="pb-3">Order</th>
                <th className="pb-3">Product</th>
                <th className="pb-3">Target</th>
                <th className="pb-3">Produced</th>
                <th className="pb-3">Progress</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {productionOrders.map((order) => {
                const progress = Math.round(
                  (order.produced / order.target) * 100
                );

                return (
                  <tr
                    key={order.id}
                    className="border-b border-slate-100 last:border-0"
                  >
                    <td className="py-4 font-semibold text-slate-900">
                      {order.id}
                    </td>

                    <td className="py-4 text-slate-600">{order.product}</td>

                    <td className="py-4 text-slate-600">{order.target}</td>

                    <td className="py-4 text-slate-600">{order.produced}</td>

                    <td className="py-4">
                      <div className="w-40">
                        <div className="h-2 rounded-full bg-slate-200">
                          <div
                            className="h-2 rounded-full bg-emerald-500"
                            style={{ width: `${progress}%` }}
                          />
                        </div>

                        <p className="mt-1 text-xs text-slate-500">
                          {progress}%
                        </p>
                      </div>
                    </td>

                    <td className="py-4">
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
const orders = [
  {
    id: "ORD-1001",
    customer: "Toyota",
    product: "Gear Assembly",
    quantity: 1200,
    status: "Completed",
  },
  {
    id: "ORD-1002",
    customer: "Hyundai",
    product: "Motor Housing",
    quantity: 850,
    status: "In Progress",
  },
  {
    id: "ORD-1003",
    customer: "Tata",
    product: "Bearing Unit",
    quantity: 600,
    status: "Delayed",
  },
];

export default function OrdersPanel() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            Today&apos;s Orders
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Current production orders and progress.
          </p>
        </div>

        <button className="text-sm font-medium text-emerald-600 hover:text-emerald-700">
          View all
        </button>
      </div>

      <div className="mt-6 space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="rounded-xl border border-slate-100 bg-slate-50 p-4"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-semibold text-slate-900">
                  {order.customer}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  {order.product} · {order.quantity} units
                </p>

                <p className="mt-2 text-xs text-slate-400">
                  {order.id}
                </p>
              </div>

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
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
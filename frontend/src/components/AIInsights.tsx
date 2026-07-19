const insights = [
  {
    title: "Production improved",
    message: "Output is 8% higher than last month.",
    type: "positive",
  },
  {
    title: "Machine inspection recommended",
    message: "Machine-012 shows increasing temperature.",
    type: "warning",
  },
  {
    title: "Energy savings detected",
    message: "Energy usage is 4% lower this week.",
    type: "positive",
  },
];

export default function AIInsights() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div>
        <p className="text-sm font-medium text-emerald-600">
          IndusMate AI
        </p>

        <h2 className="mt-1 text-xl font-semibold text-slate-900">
          Factory Insights
        </h2>
      </div>

      <div className="mt-6 space-y-4">
        {insights.map((insight) => (
          <div
            key={insight.title}
            className="rounded-xl border border-slate-100 bg-slate-50 p-4"
          >
            <div className="flex gap-3">
              <span
                className={`mt-1 h-3 w-3 shrink-0 rounded-full ${
                  insight.type === "warning"
                    ? "bg-amber-500"
                    : "bg-emerald-500"
                }`}
              />

              <div>
                <p className="font-semibold text-slate-900">
                  {insight.title}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  {insight.message}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
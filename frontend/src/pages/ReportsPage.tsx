import DashboardLayout from "../layouts/DashboardLayout";

const reports = [
  {
    id: 1,
    name: "Daily Production Report",
    category: "Production",
    period: "20 July 2026",
    format: "PDF",
    status: "Ready",
  },
  {
    id: 2,
    name: "Monthly Machine Health",
    category: "Maintenance",
    period: "July 2026",
    format: "Excel",
    status: "Ready",
  },
  {
    id: 3,
    name: "Attendance Summary",
    category: "Workforce",
    period: "July 2026",
    format: "PDF",
    status: "Generating",
  },
  {
    id: 4,
    name: "Energy Consumption Analysis",
    category: "Energy",
    period: "Q3 2026",
    format: "Excel",
    status: "Ready",
  },
];

export default function ReportsPage() {
  return (
    <DashboardLayout>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Reports
          </h1>

          <p className="mt-2 text-slate-500">
            Generate, review, and export industrial performance reports.
          </p>
        </div>

        <button className="rounded-xl bg-emerald-500 px-5 py-3 font-semibold text-slate-950 hover:bg-emerald-400">
          Generate Report
        </button>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Reports This Month</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">24</p>
          <p className="mt-2 text-sm text-slate-500">
            Across all departments
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Production Reports</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">9</p>
          <p className="mt-2 text-sm text-slate-500">
            Daily and monthly summaries
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Maintenance Reports</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">7</p>
          <p className="mt-2 text-sm text-slate-500">
            Machine health and service
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Scheduled Reports</p>
          <p className="mt-2 text-2xl font-bold text-emerald-600">5</p>
          <p className="mt-2 text-sm text-slate-500">
            Automatically generated
          </p>
        </div>
      </div>

      <section className="mt-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              Available Reports
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Download or review generated reports.
            </p>
          </div>

          <div className="flex gap-3">
            <select className="rounded-xl border border-slate-200 px-4 py-2 text-slate-700 outline-none focus:border-emerald-500">
              <option>All categories</option>
              <option>Production</option>
              <option>Maintenance</option>
              <option>Workforce</option>
              <option>Energy</option>
            </select>

            <input
              type="search"
              placeholder="Search reports..."
              className="rounded-xl border border-slate-200 px-4 py-2 outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 text-left text-sm text-slate-500">
                <th className="pb-3">Report</th>
                <th className="pb-3">Category</th>
                <th className="pb-3">Period</th>
                <th className="pb-3">Format</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {reports.map((report) => (
                <tr
                  key={report.id}
                  className="border-b border-slate-100 last:border-0"
                >
                  <td className="py-4 font-semibold text-slate-900">
                    {report.name}
                  </td>

                  <td className="py-4 text-slate-600">
                    {report.category}
                  </td>

                  <td className="py-4 text-slate-600">
                    {report.period}
                  </td>

                  <td className="py-4">
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                      {report.format}
                    </span>
                  </td>

                  <td className="py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        report.status === "Ready"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {report.status}
                    </span>
                  </td>

                  <td className="py-4">
                    <button
                      disabled={report.status !== "Ready"}
                      className="font-medium text-emerald-600 hover:text-emerald-700 disabled:cursor-not-allowed disabled:text-slate-400"
                    >
                      Download
                    </button>
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
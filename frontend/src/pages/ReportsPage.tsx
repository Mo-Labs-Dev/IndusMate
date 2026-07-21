import { useEffect, useMemo, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import api from "../services/api";

type Report = {
  id: number;
  name: string;
  category: string;
  period: string;
  format: string;
  status: "Ready" | "Generating";
};

export default function ReportsPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    async function loadReports() {
      try {
        setError("");
        const response = await api.get<Report[]>("/reports");
        setReports(response.data);
      } catch {
        setError("Could not load reports from the backend.");
      } finally {
        setLoading(false);
      }
    }

    loadReports();
  }, []);

  const filteredReports = useMemo(() => {
    return reports.filter((report) => {
      const matchesCategory =
        category === "All" || report.category === category;

      const query = searchTerm.trim().toLowerCase();

      const matchesSearch =
        !query ||
        report.name.toLowerCase().includes(query) ||
        report.category.toLowerCase().includes(query) ||
        report.period.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [reports, category, searchTerm]);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="rounded-xl border border-slate-200 bg-white p-5 text-slate-500 shadow-sm">
          Loading reports...
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-red-700">
          {error}
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Reports
          </h1>

          <p className="mt-2 text-slate-500">
            Review and export industrial performance reports.
          </p>
        </div>

        <button className="rounded-xl bg-emerald-500 px-5 py-3 font-semibold text-slate-950 hover:bg-emerald-400">
          Generate Report
        </button>
      </div>

      <section className="mt-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              Available Reports
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Reports loaded from Spring Boot.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="rounded-xl border border-slate-200 px-4 py-2"
            >
              <option value="All">All categories</option>
              <option value="Production">Production</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Workforce">Workforce</option>
              <option value="Energy">Energy</option>
            </select>

            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search reports..."
              className="rounded-xl border border-slate-200 px-4 py-2 outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="border-b border-slate-200 text-left text-sm text-slate-500">
                <th className="px-3 pb-3">Report</th>
                <th className="px-3 pb-3">Category</th>
                <th className="px-3 pb-3">Period</th>
                <th className="px-3 pb-3">Format</th>
                <th className="px-3 pb-3">Status</th>
                <th className="px-3 pb-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredReports.map((report) => (
                <tr
                  key={report.id}
                  className="border-b border-slate-100 last:border-0"
                >
                  <td className="px-3 py-4 font-semibold text-slate-900">
                    {report.name}
                  </td>

                  <td className="px-3 py-4 text-slate-600">
                    {report.category}
                  </td>

                  <td className="px-3 py-4 text-slate-600">
                    {report.period}
                  </td>

                  <td className="px-3 py-4">
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                      {report.format}
                    </span>
                  </td>

                  <td className="px-3 py-4">
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

                  <td className="px-3 py-4">
                    <button
                      disabled={report.status !== "Ready"}
                      className="font-medium text-emerald-600 hover:text-emerald-700 disabled:cursor-not-allowed disabled:text-slate-400"
                    >
                      Download
                    </button>
                  </td>
                </tr>
              ))}

              {filteredReports.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-3 py-8 text-center text-slate-500"
                  >
                    No reports found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </DashboardLayout>
  );
}
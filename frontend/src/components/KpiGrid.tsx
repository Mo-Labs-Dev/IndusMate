import { useEffect, useState } from "react";
import api from "../services/api";
import StatCard from "./StatCard";

type DashboardSummary = {
  factoryHealth: number;
  productionToday: number;
  productionTarget: number;
  attendanceToday: number;
  attendanceTarget: number;
  machinesRunning: number;
  machinesTotal: number;
  energyUsage: number;
  downtimeMinutes: number;
  activeAlerts: number;
  budgetUsed: number;
};

export default function KpiGrid() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadSummary() {
      try {
        setError("");

        const response = await api.get<DashboardSummary>(
          "/dashboard/summary"
        );

        setSummary(response.data);
      } catch {
        setError("Could not load dashboard summary.");
      } finally {
        setLoading(false);
      }
    }

    loadSummary();
  }, []);

  if (loading) {
    return (
      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5 text-slate-500 shadow-sm">
        Loading dashboard summary...
      </div>
    );
  }

  if (error || !summary) {
    return (
      <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-5 text-red-700">
        {error || "Dashboard summary is unavailable."}
      </div>
    );
  }

  const productionPercent = Math.round(
    (summary.productionToday / summary.productionTarget) * 100
  );

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        title="Factory Health"
        value={`${summary.factoryHealth}%`}
        description="All major systems are operating normally."
      />

      <StatCard
        title="Production Today"
        value={`${summary.productionToday.toLocaleString()} / ${summary.productionTarget.toLocaleString()}`}
        description={`${productionPercent}% of today’s target completed.`}
      />

      <StatCard
        title="Attendance Today"
        value={`${summary.attendanceToday} / ${summary.attendanceTarget}`}
        description={`${
          summary.attendanceTarget - summary.attendanceToday
        } employees are absent or on leave.`}
      />

      <StatCard
        title="Machines Running"
        value={`${summary.machinesRunning} / ${summary.machinesTotal}`}
        description={`${
          summary.machinesTotal - summary.machinesRunning
        } machines require attention.`}
      />

      <StatCard
        title="Energy Usage"
        value={`${summary.energyUsage} MWh`}
        description="Current factory energy consumption."
      />

      <StatCard
        title="Downtime Today"
        value={`${summary.downtimeMinutes} min`}
        description="Total downtime across all production lines."
      />

      <StatCard
        title="Active Alerts"
        value={String(summary.activeAlerts)}
        description="Alerts currently requiring attention."
      />

      <StatCard
        title="Budget Used"
        value={`${summary.budgetUsed}%`}
        description="Current operational budget usage."
      />
    </div>
  );
}
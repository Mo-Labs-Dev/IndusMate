import StatCard from "./StatCard";

export default function KpiGrid() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        title="Factory Health"
        value="98%"
        description="All major systems are operating normally."
      />

      <StatCard
        title="Production Today"
        value="4,620 / 5,000"
        description="92% of today’s target completed."
      />

      <StatCard
        title="Attendance Today"
        value="186 / 200"
        description="14 employees are absent or on leave."
      />

      <StatCard
        title="Machines Running"
        value="46 / 48"
        description="Two machines require attention."
      />

      <StatCard
        title="Energy Usage"
        value="18.2 MWh"
        description="4% lower than last week."
      />

      <StatCard
        title="Downtime Today"
        value="38 min"
        description="12 minutes below the daily limit."
      />

      <StatCard
        title="Active Alerts"
        value="2"
        description="One critical and one warning."
      />

      <StatCard
        title="Budget Used"
        value="72%"
        description="₹18.2M used from ₹25M."
      />
    </div>
  );
}
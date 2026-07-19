import AIInsights from "../components/AIInsights";
import AlertsPanel from "../components/AlertsPanel";
import DashboardBanner from "../components/DashboardBanner";
import KpiGrid from "../components/KpiGrid";
import LiveMachines from "../components/LiveMachines";
import OrdersPanel from "../components/OrdersPanel";
import ProductionChart from "../components/ProductionChart";
import DashboardLayout from "../layouts/DashboardLayout";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      {/* Welcome Banner */}
      <DashboardBanner />

      {/* KPI Cards */}
      <KpiGrid />

      {/* Production Chart + Alerts */}
      <div className="mt-6 grid gap-4 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <ProductionChart />
        </div>

        <AlertsPanel />
      </div>

      {/* Live Machines */}
      <div className="mt-6">
        <LiveMachines />
      </div>

      {/* Orders + AI Insights */}
      <div className="mt-6 grid gap-4 xl:grid-cols-2">
        <OrdersPanel />
        <AIInsights />
      </div>
    </DashboardLayout>
  );
}
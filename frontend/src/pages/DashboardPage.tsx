import AIInsights from "../components/AIInsights";
import AlertsPanel from "../components/AlertsPanel";
import DashboardBanner from "../components/DashboardBanner";
import LiveMachines from "../components/LiveMachines";
import OrdersPanel from "../components/OrdersPanel";
import ProductionChart from "../components/ProductionChart";
import DashboardLayout from "../layouts/DashboardLayout";
import BoltReadingCard from "../components/BoltReadingCard";
import BoltHistoryChart from "../components/BoltHistoryChart";
import ProductionStatusGrid from "../components/ProductionStatusGrid";
import LiveProductionKpis from "../components/LiveProductionKpis";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <DashboardBanner />

      <div className="mt-6">
        <BoltReadingCard />
      </div>

      <div className="mt-6">
        <BoltHistoryChart />
      </div>

      <div className="mt-6">
        <ProductionStatusGrid />
      </div>

      <div className="mt-6">
        <LiveProductionKpis />
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <ProductionChart />
        </div>

        <AlertsPanel />
      </div>

      <div className="mt-6">
        <LiveMachines />
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-2">
        <OrdersPanel />
        <AIInsights />
      </div>
    </DashboardLayout>
  );
}
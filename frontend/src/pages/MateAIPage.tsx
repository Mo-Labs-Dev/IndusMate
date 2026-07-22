import DashboardLayout from "../layouts/DashboardLayout";
import AIChat from "../components/AIChat";
import AIInsights from "../components/AIInsights";

export default function MateAIPage() {
  return (
    <DashboardLayout>
      <div>
        <p className="text-sm font-medium text-emerald-600">
          Intelligent Factory Assistant
        </p>

        <h1 className="mt-1 text-3xl font-bold text-slate-900">
          Mate AI
        </h1>

        <p className="mt-2 text-slate-500">
          Ask questions and receive insights based on live sensor,
          production, machine, and alert data.
        </p>
      </div>

      <div className="mt-6">
        <AIChat />
      </div>

      <div className="mt-6">
        <AIInsights />
      </div>
    </DashboardLayout>
  );
}
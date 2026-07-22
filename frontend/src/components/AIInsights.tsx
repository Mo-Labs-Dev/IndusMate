import { useEffect, useState } from "react";
import api from "../services/api";

type AIInsight = {
  type: "critical" | "warning" | "info" | "success";
  title: string;
  message: string;
};

export default function AIInsights() {
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadInsights() {
      try {
        const response = await api.get<AIInsight[]>("/ai-insights");

        if (active) {
          setInsights(response.data);
          setError("");
        }
      } catch {
        if (active) {
          setError("Could not load AI factory insights.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadInsights();

    const timer = window.setInterval(loadInsights, 10000);

    return () => {
      active = false;
      window.clearInterval(timer);
    };
  }, []);

  function getInsightClasses(type: AIInsight["type"]) {
    if (type === "critical") {
      return {
        container: "border-red-200 bg-red-50",
        badge: "bg-red-100 text-red-700",
        label: "Critical",
      };
    }

    if (type === "warning") {
      return {
        container: "border-amber-200 bg-amber-50",
        badge: "bg-amber-100 text-amber-700",
        label: "Warning",
      };
    }

    if (type === "success") {
      return {
        container: "border-emerald-200 bg-emerald-50",
        badge: "bg-emerald-100 text-emerald-700",
        label: "Healthy",
      };
    }

    return {
      container: "border-blue-200 bg-blue-50",
      badge: "bg-blue-100 text-blue-700",
      label: "Info",
    };
  }

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div>
        <p className="text-sm font-medium text-emerald-600">
          AI Factory Assistant
        </p>

        <h2 className="mt-1 text-xl font-semibold text-slate-900">
          Smart Insights
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Analysis generated from sensor readings, production data,
          machine status, and alerts.
        </p>
      </div>

      {loading && (
        <p className="mt-5 text-sm text-slate-500">
          Analyzing factory data...
        </p>
      )}

      {error && (
        <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {!loading && !error && (
        <div className="mt-5 space-y-3">
          {insights.map((insight, index) => {
            const styles = getInsightClasses(insight.type);

            return (
              <article
                key={`${insight.title}-${index}`}
                className={`rounded-xl border p-4 ${styles.container}`}
              >
                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                  <div>
                    <h3 className="font-semibold text-slate-900">
                      {insight.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {insight.message}
                    </p>
                  </div>

                  <span
                    className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${styles.badge}`}
                  >
                    {styles.label}
                  </span>
                </div>
              </article>
            );
          })}

          {insights.length === 0 && (
            <div className="rounded-xl border border-dashed border-slate-200 p-6 text-center text-sm text-slate-500">
              No AI insights are currently available.
            </div>
          )}
        </div>
      )}
    </section>
  );
}
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import api from "../services/api";
import {
  predictMachineHealth,
  type PredictionResponse,
} from "../services/predictiveMaintenanceService";

type Telemetry = {
  id: number;
  machineId: string;
  status: string;
  temperature: number;
  vibration: number;
  runningHours: number;
  load: number;
  previousFailures: number;
  createdAt: string;
};

export default function DeviceDetailsPage() {
  const { deviceId } = useParams();

  const [latestTelemetry, setLatestTelemetry] =
    useState<Telemetry | null>(null);

  const [history, setHistory] = useState<Telemetry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [prediction, setPrediction] =
    useState<PredictionResponse | null>(null);

  const [predictionLoading, setPredictionLoading] =
    useState(false);

  const [predictionError, setPredictionError] =
    useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadDeviceData(showLoading: boolean) {
      if (!deviceId) {
        setError("Device ID is missing.");
        setLoading(false);
        return;
      }

      try {
        if (showLoading) {
          setLoading(true);
        }

        setError("");

        const [latestResponse, historyResponse] =
          await Promise.all([
            api.get<Telemetry>(`/telemetry/${deviceId}`),
            api.get<Telemetry[]>(
              `/telemetry/${deviceId}/history`
            ),
          ]);

        if (!isMounted) {
          return;
        }

        setLatestTelemetry(latestResponse.data);
        setHistory(historyResponse.data);
      } catch {
        if (isMounted) {
          setError(
            "Could not load device data from the backend."
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadDeviceData(true);

    const refreshTimer = window.setInterval(() => {
      loadDeviceData(false);
    }, 5000);

    return () => {
      isMounted = false;
      window.clearInterval(refreshTimer);
    };
  }, [deviceId]);

  async function handlePredictHealth() {
    if (!latestTelemetry) {
      return;
    }

    setPredictionLoading(true);
    setPredictionError("");

    try {
      const result = await predictMachineHealth({
        temperature: latestTelemetry.temperature,
        vibration: latestTelemetry.vibration,
        running_hours: latestTelemetry.runningHours ?? 0,
        load: latestTelemetry.load ?? 0,
        previous_failures:
          latestTelemetry.previousFailures ?? 0,
      });

      setPrediction(result);
    } catch {
      setPredictionError(
        "Could not generate a machine health prediction."
      );
    } finally {
      setPredictionLoading(false);
    }
  }

  function getRiskStyles(risk: string) {
    if (risk === "HIGH") {
      return {
        badge: "bg-red-100 text-red-700",
        bar: "bg-red-500",
        border: "border-red-200",
        background: "bg-red-50",
      };
    }

    if (risk === "MEDIUM") {
      return {
        badge: "bg-amber-100 text-amber-700",
        bar: "bg-amber-500",
        border: "border-amber-200",
        background: "bg-amber-50",
      };
    }

    return {
      badge: "bg-emerald-100 text-emerald-700",
      bar: "bg-emerald-500",
      border: "border-emerald-200",
      background: "bg-emerald-50",
    };
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="rounded-xl border border-slate-200 bg-white p-5 text-slate-500 shadow-sm">
          Loading device data...
        </div>
      </DashboardLayout>
    );
  }

  if (error || !latestTelemetry) {
    return (
      <DashboardLayout>
        <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-red-700">
          {error || "Device not found."}
        </div>
      </DashboardLayout>
    );
  }

  const riskStyles = prediction
    ? getRiskStyles(prediction.risk)
    : null;

  return (
    <DashboardLayout>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <p className="text-sm font-medium text-emerald-600">
            Device Details
          </p>

          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            {latestTelemetry.machineId}
          </h1>

          <p className="mt-2 text-slate-500">
            Live operating status, telemetry, and ML-based
            predictive maintenance analysis.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
            {latestTelemetry.status}
          </span>

          <button
            type="button"
            onClick={handlePredictHealth}
            disabled={predictionLoading}
            className="rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {predictionLoading
              ? "Analyzing..."
              : "Predict Health"}
          </button>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Temperature
          </p>

          <p className="mt-2 text-2xl font-bold text-slate-900">
            {latestTelemetry.temperature.toFixed(1)}°C
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Vibration
          </p>

          <p className="mt-2 text-2xl font-bold text-slate-900">
            {latestTelemetry.vibration}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Running Hours
          </p>

          <p className="mt-2 text-2xl font-bold text-slate-900">
            {latestTelemetry.runningHours ?? 0} h
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Machine Load
          </p>

          <p className="mt-2 text-2xl font-bold text-slate-900">
            {latestTelemetry.load ?? 0}%
          </p>
        </div>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Previous Failures
          </p>

          <p className="mt-2 text-2xl font-bold text-slate-900">
            {latestTelemetry.previousFailures ?? 0}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Telemetry Records
          </p>

          <p className="mt-2 text-2xl font-bold text-slate-900">
            {history.length}
          </p>
        </div>
      </div>

      {predictionError && (
        <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {predictionError}
        </div>
      )}

      {prediction && riskStyles && (
        <section
          className={`mt-6 rounded-xl border p-5 shadow-sm ${riskStyles.border} ${riskStyles.background}`}
        >
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
            <div>
              <p className="text-sm font-medium text-emerald-600">
                ML Predictive Maintenance
              </p>

              <h2 className="mt-1 text-xl font-semibold text-slate-900">
                Machine Health Prediction
              </h2>
            </div>

            <span
              className={`rounded-full px-4 py-2 text-sm font-semibold ${riskStyles.badge}`}
            >
              {prediction.risk} RISK
            </span>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl bg-white p-5">
              <p className="text-sm text-slate-500">
                Health Score
              </p>

              <p className="mt-2 text-3xl font-bold text-slate-900">
                {prediction.health_score.toFixed(1)}%
              </p>

              <div className="mt-4 h-2 rounded-full bg-slate-200">
                <div
                  className={`h-full rounded-full ${riskStyles.bar}`}
                  style={{
                    width: `${Math.max(
                      0,
                      Math.min(
                        prediction.health_score,
                        100
                      )
                    )}%`,
                  }}
                />
              </div>
            </div>

            <div className="rounded-xl bg-white p-5">
              <p className="text-sm text-slate-500">
                Failure Probability
              </p>

              <p className="mt-2 text-3xl font-bold text-slate-900">
                {(
                  prediction.failure_probability * 100
                ).toFixed(1)}
                %
              </p>
            </div>

            <div className="rounded-xl bg-white p-5">
              <p className="text-sm text-slate-500">
                Risk Level
              </p>

              <p className="mt-2 text-3xl font-bold text-slate-900">
                {prediction.risk}
              </p>
            </div>
          </div>

          <div className="mt-4 rounded-xl bg-white p-5">
            <p className="text-sm font-semibold text-slate-900">
              Recommended Action
            </p>

            <p className="mt-2 leading-7 text-slate-600">
              {prediction.recommended_action}
            </p>
          </div>
        </section>
      )}

      <section className="mt-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">
          Telemetry History
        </h2>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 text-left text-sm text-slate-500">
                <th className="pb-3">Time</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Temperature</th>
                <th className="pb-3">Vibration</th>
              </tr>
            </thead>

            <tbody>
              {history.map((record) => (
                <tr
                  key={record.id}
                  className="border-b border-slate-100 last:border-0"
                >
                  <td className="py-4 text-slate-600">
                    {new Date(
                      record.createdAt
                    ).toLocaleString()}
                  </td>

                  <td className="py-4">
                    {record.status}
                  </td>

                  <td className="py-4 text-slate-600">
                    {record.temperature.toFixed(1)}°C
                  </td>

                  <td className="py-4 text-slate-600">
                    {record.vibration}
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
import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import api from "../services/api";

type BoltReading = {
  id: number;
  deviceId: string;
  pin: string;
  sensorType: string;
  value: number;
  createdAt: string;
};

export default function BoltHistoryChart() {
  const [readings, setReadings] = useState<BoltReading[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadHistory() {
      try {
        const response = await api.get<BoltReading[]>("/bolt/history");

        if (active) {
          setReadings([...response.data].reverse());
          setError("");
        }
      } catch {
        if (active) {
          setError("Could not load Bolt history.");
        }
      }
    }

    loadHistory();

    const timer = window.setInterval(loadHistory, 5000);

    return () => {
      active = false;
      window.clearInterval(timer);
    };
  }, []);

  const chartData = readings.map((reading) => ({
    time: new Date(reading.createdAt).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }),
    value: reading.value,
  }));

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div>
        <p className="text-sm font-medium text-emerald-600">
          Bolt IoT History
        </p>

        <h2 className="mt-1 text-xl font-semibold text-slate-900">
          Live Sensor Trend
        </h2>
      </div>

      {error && (
        <p className="mt-4 text-sm text-red-600">
          {error}
        </p>
      )}

      {!error && chartData.length === 0 && (
        <p className="mt-4 text-sm text-slate-500">
          No readings saved yet.
        </p>
      )}

      {chartData.length > 0 && (
        <div className="mt-6 h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />

              <Line
                type="monotone"
                dataKey="value"
                name="Sensor value"
                stroke="#10b981"
                strokeWidth={3}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </section>
  );
}
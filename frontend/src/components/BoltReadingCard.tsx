import { useEffect, useState } from "react";
import api from "../services/api";

type BoltReading = {
  id: number;
  deviceId: string;
  pin: string;
  sensorType: string;
  value: number;
  createdAt: string;
};

export default function BoltReadingCard() {
  const [reading, setReading] = useState<BoltReading | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadReading() {
      try {
        const response = await api.get<BoltReading>("/bolt/reading");

        if (active) {
          setReading(response.data);
          setError("");
        }
      } catch {
        if (active) {
          setError("Could not load Bolt sensor reading.");
        }
      }
    }

    loadReading();

    const timer = window.setInterval(loadReading, 60000);

    return () => {
      active = false;
      window.clearInterval(timer);
    };
  }, []);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-emerald-600">
        Live Bolt IoT
      </p>

      <h2 className="mt-1 text-xl font-semibold text-slate-900">
        Sensor Reading
      </h2>

      {error && (
        <p className="mt-4 text-sm text-red-600">
          {error}
        </p>
      )}

      {!error && !reading && (
        <p className="mt-4 text-sm text-slate-500">
          Loading Bolt data...
        </p>
      )}

      {reading && (
        <div className="mt-5">
          <p className="text-4xl font-bold text-slate-900">
            {reading.value}
          </p>

          <p className="mt-2 text-sm text-slate-500">
            {reading.sensorType} · {reading.deviceId} · {reading.pin}
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Updated:{" "}
            {new Date(reading.createdAt).toLocaleString()}
          </p>
        </div>
      )}
    </div>
  );
}
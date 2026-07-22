import { useEffect, useState } from "react";
import { Client } from "@stomp/stompjs";
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
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    let active = true;

    async function loadLatestReading() {
      try {
        const response = await api.get<BoltReading>("/bolt/latest");

        if (active) {
          setReading(response.data);
          setError("");
        }
      } catch {
        if (active) {
          setError("Could not load the latest Bolt reading.");
        }
      }
    }

    loadLatestReading();

    const client = new Client({
      brokerURL: "ws://localhost:8080/ws",

      reconnectDelay: 5000,

      onConnect: () => {
        if (active) {
          setConnected(true);
          setError("");
        }

        client.subscribe("/topic/bolt-reading", (message) => {
          const newReading = JSON.parse(
            message.body
          ) as BoltReading;

          if (active) {
            setReading(newReading);
          }
        });
      },

      onDisconnect: () => {
        if (active) {
          setConnected(false);
        }
      },

      onWebSocketError: () => {
        if (active) {
          setConnected(false);
          setError("WebSocket connection failed.");
        }
      },

      onStompError: () => {
        if (active) {
          setConnected(false);
          setError("WebSocket messaging error.");
        }
      },
    });

    client.activate();

    return () => {
      active = false;
      void client.deactivate();
    };
  }, []);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-emerald-600">
            Latest Bolt IoT Reading
          </p>

          <h2 className="mt-1 text-xl font-semibold text-slate-900">
            Sensor Reading
          </h2>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            connected
              ? "bg-emerald-100 text-emerald-700"
              : "bg-slate-100 text-slate-600"
          }`}
        >
          {connected ? "Live" : "Connecting"}
        </span>
      </div>

      {error && (
        <p className="mt-4 text-sm text-red-600">
          {error}
        </p>
      )}

      {!reading && !error && (
        <p className="mt-4 text-sm text-slate-500">
          Loading saved Bolt data...
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
            Updated: {new Date(reading.createdAt).toLocaleString()}
          </p>
        </div>
      )}
    </div>
  );
}
import { useEffect, useState } from "react";
import { Client } from "@stomp/stompjs";
import api from "../services/api";

type ProductionStatus = {
  machineName: string;
  status: "Running" | "Idle" | "Stopped";
  todayCount: number;
  target: number;
  efficiency: number;
};

export default function ProductionStatusGrid() {
  const [machines, setMachines] = useState<ProductionStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    let active = true;

    async function loadProductionStatuses() {
      try {
        const response = await api.get<ProductionStatus[]>(
          "/production-status"
        );

        if (active) {
          setMachines(response.data);
          setError("");
        }
      } catch {
        if (active) {
          setError("Could not load production machine statuses.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadProductionStatuses();

    const client = new Client({
      brokerURL: "ws://localhost:8080/ws",
      reconnectDelay: 5000,

      onConnect: () => {
        if (active) {
          setConnected(true);
          setError("");
        }

        client.subscribe(
          "/topic/production-status",
          (message) => {
            const updatedMachines = JSON.parse(
              message.body
            ) as ProductionStatus[];

            if (active) {
              setMachines(updatedMachines);
            }
          }
        );
      },

      onDisconnect: () => {
        if (active) {
          setConnected(false);
        }
      },

      onWebSocketError: () => {
        if (active) {
          setConnected(false);
          setError("Production WebSocket connection failed.");
        }
      },
    });

    client.activate();

    return () => {
      active = false;
      void client.deactivate();
    };
  }, []);

  function getStatusClasses(
    status: ProductionStatus["status"]
  ) {
    if (status === "Running") {
      return "bg-emerald-100 text-emerald-700";
    }

    if (status === "Idle") {
      return "bg-amber-100 text-amber-700";
    }

    return "bg-red-100 text-red-700";
  }

  function getProgressWidth(machine: ProductionStatus) {
    if (machine.target <= 0) {
      return 0;
    }

    return Math.min(
      100,
      Math.round(
        (machine.todayCount / machine.target) * 100
      )
    );
  }

  if (loading) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-5 text-slate-500 shadow-sm">
        Loading production status...
      </div>
    );
  }

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-emerald-600">
            Production Monitoring
          </p>

          <h2 className="mt-1 text-xl font-semibold text-slate-900">
            Live Machine Status
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Current output, target completion, and operating status.
          </p>
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

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {machines.map((machine) => {
          const progress = getProgressWidth(machine);

          return (
            <div
              key={machine.machineName}
              className="rounded-xl border border-slate-200 bg-slate-50 p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-slate-900">
                    {machine.machineName}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Today&apos;s production
                  </p>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClasses(
                    machine.status
                  )}`}
                >
                  {machine.status}
                </span>
              </div>

              <div className="mt-5 flex items-end justify-between gap-4">
                <div>
                  <p className="text-3xl font-bold text-slate-900">
                    {machine.todayCount.toLocaleString()}
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    Target: {machine.target.toLocaleString()}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-lg font-semibold text-slate-900">
                    {machine.efficiency.toFixed(1)}%
                  </p>

                  <p className="text-xs text-slate-500">
                    Efficiency
                  </p>
                </div>
              </div>

              <div className="mt-5">
                <div className="flex justify-between text-xs text-slate-500">
                  <span>Progress</span>
                  <span>{progress}%</span>
                </div>

                <div className="mt-2 h-2 rounded-full bg-slate-200">
                  <div
                    className="h-2 rounded-full bg-emerald-500 transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
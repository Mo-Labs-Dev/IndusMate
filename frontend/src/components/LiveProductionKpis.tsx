import { useEffect, useMemo, useState } from "react";
import { Client } from "@stomp/stompjs";
import api from "../services/api";

type ProductionStatus = {
  machineName: string;
  status: "Running" | "Idle" | "Stopped";
  todayCount: number;
  target: number;
  efficiency: number;
};

export default function LiveProductionKpis() {
  const [machines, setMachines] = useState<ProductionStatus[]>([]);
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadStatuses() {
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
          setError("Could not load production KPIs.");
        }
      }
    }

    loadStatuses();

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
          setError("Production KPI WebSocket connection failed.");
        }
      },
    });

    client.activate();

    return () => {
      active = false;
      void client.deactivate();
    };
  }, []);

  const summary = useMemo(() => {
    const producedToday = machines.reduce(
      (total, machine) => total + machine.todayCount,
      0
    );

    const productionTarget = machines.reduce(
      (total, machine) => total + machine.target,
      0
    );

    const runningMachines = machines.filter(
      (machine) => machine.status === "Running"
    ).length;

    const idleMachines = machines.filter(
      (machine) => machine.status === "Idle"
    ).length;

    const stoppedMachines = machines.filter(
      (machine) => machine.status === "Stopped"
    ).length;

    const averageEfficiency =
      machines.length === 0
        ? 0
        : machines.reduce(
            (total, machine) => total + machine.efficiency,
            0
          ) / machines.length;

    const completion =
      productionTarget === 0
        ? 0
        : Math.round(
            (producedToday / productionTarget) * 100
          );

    return {
      producedToday,
      productionTarget,
      runningMachines,
      idleMachines,
      stoppedMachines,
      averageEfficiency,
      completion,
    };
  }, [machines]);

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-emerald-600">
            Live Production KPIs
          </p>

          <h2 className="mt-1 text-xl font-semibold text-slate-900">
            Factory Performance
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
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Production Today
          </p>

          <p className="mt-2 text-2xl font-bold text-slate-900">
            {summary.producedToday.toLocaleString()} /{" "}
            {summary.productionTarget.toLocaleString()}
          </p>

          <p className="mt-2 text-sm text-emerald-600">
            {summary.completion}% completed
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Average Efficiency
          </p>

          <p className="mt-2 text-2xl font-bold text-slate-900">
            {summary.averageEfficiency.toFixed(1)}%
          </p>

          <p className="mt-2 text-sm text-slate-500">
            Across all production machines
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Machines Running
          </p>

          <p className="mt-2 text-2xl font-bold text-emerald-600">
            {summary.runningMachines} / {machines.length}
          </p>

          <p className="mt-2 text-sm text-slate-500">
            {summary.idleMachines} idle
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Machines Stopped
          </p>

          <p className="mt-2 text-2xl font-bold text-red-600">
            {summary.stoppedMachines}
          </p>

          <p className="mt-2 text-sm text-slate-500">
            Require operator attention
          </p>
        </div>
      </div>
    </section>
  );
}
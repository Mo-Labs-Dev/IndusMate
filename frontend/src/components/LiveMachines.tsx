export default function LiveMachines() {
  const machines = [
    {
      id: "Machine-001",
      status: "Running",
      temp: "32.5°C",
      vibration: "1.2",
    },
    {
      id: "Machine-002",
      status: "Running",
      temp: "31.8°C",
      vibration: "1.1",
    },
    {
      id: "Machine-003",
      status: "Idle",
      temp: "28.0°C",
      vibration: "0.3",
    },
    {
      id: "Machine-004",
      status: "Offline",
      temp: "--",
      vibration: "--",
    },
  ];

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold">
        Live Machines
      </h2>

      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="py-2 text-left">Machine</th>
            <th className="text-left">Status</th>
            <th className="text-left">Temperature</th>
            <th className="text-left">Vibration</th>
          </tr>
        </thead>

        <tbody>
          {machines.map((m) => (
            <tr key={m.id} className="border-b">
              <td className="py-3">{m.id}</td>
              <td>{m.status}</td>
              <td>{m.temp}</td>
              <td>{m.vibration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
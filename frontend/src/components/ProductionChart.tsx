import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { month: "Jan", thisYear: 4200, lastYear: 3900 },
  { month: "Feb", thisYear: 4800, lastYear: 4100 },
  { month: "Mar", thisYear: 5200, lastYear: 4600 },
  { month: "Apr", thisYear: 6100, lastYear: 5300 },
  { month: "May", thisYear: 6800, lastYear: 5900 },
  { month: "Jun", thisYear: 7600, lastYear: 6400 },
  { month: "Jul", thisYear: 8100, lastYear: 7000 },
  { month: "Aug", thisYear: 8600, lastYear: 7400 },
  { month: "Sep", thisYear: 9000, lastYear: 7900 },
  { month: "Oct", thisYear: 9500, lastYear: 8300 },
  { month: "Nov", thisYear: 10100, lastYear: 8800 },
  { month: "Dec", thisYear: 10800, lastYear: 9300 },
];

export default function ProductionChart() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-900">
          Production Comparison
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          This year compared with last year.
        </p>
      </div>

      <ResponsiveContainer width="100%" height={240}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Legend />

          <Line
            type="monotone"
            dataKey="thisYear"
            name="This Year"
            stroke="#10b981"
            strokeWidth={3}
          />

          <Line
            type="monotone"
            dataKey="lastYear"
            name="Last Year"
            stroke="#94a3b8"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
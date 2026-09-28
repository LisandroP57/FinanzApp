import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from "recharts";
import { money, monthKey, monthLabel } from "../utils/format";

export default function MonthlyChart({ transactions }) {
  const grouped = transactions.reduce((acc, t) => {
    const key = monthKey(t.date);
    acc[key] = acc[key] || { ingresos: 0, gastos: 0 };
    if (t.type === "ingreso") acc[key].ingresos += t.amount;
    else acc[key].gastos += t.amount;
    return acc;
  }, {});

  const data = Object.keys(grouped)
    .sort()
    .slice(-6)
    .map((key) => ({ mes: monthLabel(key), ...grouped[key] }));

  return (
    <div className="panel">
      <h2>Evolución mensual</h2>
      {data.length === 0 ? (
        <p className="empty">Todavía no hay movimientos para mostrar.</p>
      ) : (
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--line)" vertical={false} />
            <XAxis dataKey="mes" stroke="var(--muted)" />
            <YAxis stroke="var(--muted)" tickFormatter={(v) => `${Math.round(v / 1000)}k`} />
            <Tooltip formatter={(v) => money(v)} />
            <Legend />
            <Bar dataKey="ingresos" name="Ingresos" fill="var(--income)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="gastos" name="Gastos" fill="var(--expense)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

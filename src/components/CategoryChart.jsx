import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { money, categoryColor } from "../utils/format";

export default function CategoryChart({ transactions }) {
  const totals = transactions
    .filter((t) => t.type === "gasto")
    .reduce((acc, t) => ({ ...acc, [t.category]: (acc[t.category] || 0) + t.amount }), {});
  const data = Object.entries(totals).map(([name, value]) => ({ name, value }));

  return (
    <div className="panel">
      <h2>Gastos por categoría</h2>
      {data.length === 0 ? (
        <p className="empty">Todavía no hay gastos para mostrar.</p>
      ) : (
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" innerRadius={60} outerRadius={100} paddingAngle={2}>
              {data.map((d) => (
                <Cell key={d.name} fill={categoryColor(d.name)} stroke="none" />
              ))}
            </Pie>
            <Tooltip formatter={(v) => money(v)} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

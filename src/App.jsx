import { useEffect, useMemo, useState } from "react";
import { useTransactions } from "./hooks/useTransactions";
import { ALL_CATEGORIES, monthKey, monthLabel } from "./utils/format";
import SummaryCards from "./components/SummaryCards";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import CategoryChart from "./components/CategoryChart";
import MonthlyChart from "./components/MonthlyChart";

export default function App() {
  const { transactions, add, remove, loadDemo, clearAll } = useTransactions();
  const [month, setMonth] = useState("all");
  const [category, setCategory] = useState("all");
  const [theme, setTheme] = useState(() =>
    window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const months = useMemo(
    () => [...new Set(transactions.map((t) => monthKey(t.date)))].sort().reverse(),
    [transactions]
  );

  useEffect(() => {
    if (month !== "all" && !months.includes(month)) setMonth("all");
  }, [months, month]);

  const byCategory = useMemo(
    () => transactions.filter((t) => category === "all" || t.category === category),
    [transactions, category]
  );

  const filtered = useMemo(
    () =>
      byCategory
        .filter((t) => month === "all" || monthKey(t.date) === month)
        .sort((a, b) => b.date.localeCompare(a.date)),
    [byCategory, month]
  );

  return (
    <div className="app">
      <header className="top">
        <h1>FinanzApp</h1>
         <h2>Tus finanzas personales</h2>
        <div className="actions">
          {transactions.length === 0 ? (
            <button className="ghost" onClick={loadDemo}>Cargar datos de ejemplo</button>
          ) : (
            <button
              className="ghost"
              onClick={() => window.confirm("¿Borrar todos los movimientos?") && clearAll()}
            >
              Borrar todo
            </button>
          )}
          <button className="ghost" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {theme === "dark" ? "Modo claro" : "Modo oscuro"}
          </button>
        </div>
      </header>

      <SummaryCards transactions={filtered} />

      <div className="filters">
        <label>
          Mes
          <select value={month} onChange={(e) => setMonth(e.target.value)}>
            <option value="all">Todos</option>
            {months.map((m) => (
              <option key={m} value={m}>{monthLabel(m)}</option>
            ))}
          </select>
        </label>
        <label>
          Categoría
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="all">Todas</option>
            {ALL_CATEGORIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </label>
      </div>

      <main className="grid">
        <TransactionForm onAdd={add} />
        <CategoryChart transactions={filtered} />
        <MonthlyChart transactions={byCategory} />
        <div className="wide">
          <TransactionList transactions={filtered} onRemove={remove} />
        </div>
      </main>
    </div>
  );
}

import { useEffect, useState } from "react";

const STORAGE_KEY = "finanzas:transactions";

// este lee los movimientos guardados en el navegador si es q hay
function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

const row = (type, category, amount, date, description) => ({
  id: crypto.randomUUID(),
  type,
  category,
  amount,
  date,
  description,
});

// Genera datos de ejemplo para los últimos 4 meses
function buildDemo() {
  const now = new Date();
  const rows = [];
  for (let i = 0; i < 4; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const iso = (day) =>
      `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    rows.push(
      row("ingreso", "Sueldo", 850000, iso(5), "Sueldo mensual"),
      row("ingreso", "Freelance", 120000 + i * 30000, iso(18), "Proyecto web"),
      row("gasto", "Vivienda", 280000, iso(8), "Alquiler"),
      row("gasto", "Comida", 150000 + i * 12000, iso(12), "Supermercado"),
      row("gasto", "Transporte", 45000 + i * 5000, iso(14), "SUBE y combustible"),
      row("gasto", "Servicios", 62000, iso(20), "Luz, gas e internet"),
      row("gasto", "Ocio", 55000 + i * 8000, iso(23), "Salidas y streaming"),
      row("gasto", "Salud", 30000, iso(25), "Farmacia")
    );
  }
  return rows;
}

export function useTransactions() {
  const [transactions, setTransactions] = useState(load);

  // Cada vez que cambian los movimientos, se guardan en el navegador
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
    } catch {
      /* si el navegador bloquea el storage, la app sigue funcionando en memoria */
    }
  }, [transactions]);

  const add = (t) => setTransactions((prev) => [{ ...t, id: crypto.randomUUID() }, ...prev]);
  const remove = (id) => setTransactions((prev) => prev.filter((t) => t.id !== id));
  const loadDemo = () => setTransactions(buildDemo());
  const clearAll = () => setTransactions([]);

  return { transactions, add, remove, loadDemo, clearAll };
}

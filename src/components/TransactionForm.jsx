import { useState } from "react";
import { CATEGORIES, today } from "../utils/format";

export default function TransactionForm({ onAdd }) {
  const [type, setType] = useState("gasto");
  const [category, setCategory] = useState(CATEGORIES.gasto[0]);
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(today());
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const changeType = (newType) => {
    setType(newType);
    setCategory(CATEGORIES[newType][0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = Number(amount);
    if (!value || value <= 0) {
      setError("Ingresá un monto mayor a 0.");
      return;
    }
    onAdd({ type, category, amount: value, date, description: description.trim() || category });
    setAmount("");
    setDescription("");
    setError("");
  };

  return (
    <form className="panel form" onSubmit={handleSubmit}>
      <h2>Nuevo movimiento</h2>

      <div className="toggle" role="group" aria-label="Tipo de movimiento">
        <button type="button" className={type === "gasto" ? "on" : ""} onClick={() => changeType("gasto")}>
          Gasto
        </button>
        <button type="button" className={type === "ingreso" ? "on" : ""} onClick={() => changeType("ingreso")}>
          Ingreso
        </button>
      </div>

      <label>
        Monto
        <input type="number" min="0" step="any" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0" />
      </label>

      <label>
        Categoría
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {CATEGORIES[type].map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </label>

      <label>
        Fecha
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      </label>

      <label>
        Descripción
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Opcional" />
      </label>

      {error && <p className="error" role="alert">{error}</p>}
      <button type="submit" className="primary">Agregar movimiento</button>
    </form>
  );
}

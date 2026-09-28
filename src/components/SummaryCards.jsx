import { money } from "../utils/format";

export default function SummaryCards({ transactions }) {
  const sum = (type) => transactions.filter((t) => t.type === type).reduce((acc, t) => acc + t.amount, 0);
  const income = sum("ingreso");
  const expense = sum("gasto");
  const balance = income - expense;

  return (
    <section className="summary" aria-label="Resumen">
      <div className="balance">
        <span className="label">Balance</span>
        <strong className={balance < 0 ? "neg" : ""}>{money(balance)}</strong>
      </div>
      <div className="stat">
        <span className="label">Ingresos</span>
        <strong className="pos">{money(income)}</strong>
      </div>
      <div className="stat">
        <span className="label">Gastos</span>
        <strong className="neg">{money(expense)}</strong>
      </div>
    </section>
  );
}

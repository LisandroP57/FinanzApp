import { formatDate, money, categoryColor } from "../utils/format";

export default function TransactionList({ transactions, onRemove }) {
  if (transactions.length === 0) {
    return (
      <div className="panel">
        <h2>Movimientos</h2>
        <p className="empty">No hay movimientos con estos filtros. Agregá uno con el formulario.</p>
      </div>
    );
  }

  return (
    <div className="panel">
      <h2>Movimientos</h2>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Descripción</th>
              <th>Categoría</th>
              <th className="right">Monto</th>
              <th><span className="sr">Acciones</span></th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t) => (
              <tr key={t.id}>
                <td>{formatDate(t.date)}</td>
                <td>{t.description}</td>
                <td>
                  <span className="dot" style={{ background: categoryColor(t.category) }} />
                  {t.category}
                </td>
                <td className={"right " + (t.type === "ingreso" ? "pos" : "neg")}>
                  {t.type === "ingreso" ? "+" : "−"}
                  {money(t.amount)}
                </td>
                <td className="right">
                  <button className="ghost" onClick={() => onRemove(t.id)} aria-label={`Eliminar ${t.description}`}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

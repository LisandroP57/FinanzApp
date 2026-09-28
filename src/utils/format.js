export const CATEGORIES = {
  gasto: ["Comida", "Transporte", "Vivienda", "Servicios", "Ocio", "Salud", "Otros"],
  ingreso: ["Sueldo", "Freelance", "Otros ingresos"],
};

export const ALL_CATEGORIES = [...CATEGORIES.gasto, ...CATEGORIES.ingreso];

const PALETTE = ["#E4572E", "#0F8B8D", "#F2A541", "#5B6C9D", "#A3466B", "#6BA368", "#8D8D8D", "#2E86AB", "#7A5195", "#C1A35F"];
export const categoryColor = (name) => PALETTE[ALL_CATEGORIES.indexOf(name) % PALETTE.length];

export const money = (n) =>
  new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(n);

export const monthKey = (date) => date.slice(0, 7);

export const monthLabel = (key) => {
  const [y, m] = key.split("-");
  return new Date(Number(y), Number(m) - 1, 1).toLocaleDateString("es-AR", { month: "short", year: "2-digit" });
};

export const formatDate = (date) => date.split("-").reverse().join("/");

export const today = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

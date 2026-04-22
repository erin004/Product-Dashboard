export const fmt      = (n) => `$${Number(n || 0).toFixed(2)}`;
export const star     = (n) => "★".repeat(Math.round(n)) + "☆".repeat(5 - Math.round(n));
export const avgRating = (products) =>
  products.length
    ? (products.reduce((s, p) => s + p.rating, 0) / products.length).toFixed(1)
    : "0.0";

export const BAR_COLORS = [
  "#6366f1","#8b5cf6","#a78bfa","#818cf8","#c4b5fd",
  "#7c3aed","#5b21b6","#4c1d95","#ddd6fe","#ede9fe",
];

import { fmt } from "../../utils/formatters";

export default function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-xs text-white">
      <p className="text-zinc-400 mb-1">{label}</p>
      {payload.map((p) => (
        <p key={p.name}>
          <span style={{ color: p.color }}>{p.name}</span>:{" "}
          {p.name === "price" ? fmt(p.value) : p.value}
        </p>
      ))}
    </div>
  );
}

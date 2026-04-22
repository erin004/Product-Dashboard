export default function StatCard({ label, value, sub, accent }) {
  return (
    <div
      style={{ borderLeft: `3px solid ${accent}` }}
      className="bg-[#0f0f17] rounded-xl p-5 flex flex-col gap-1"
    >
      <span className="text-xs font-mono uppercase tracking-widest text-zinc-300">
        {label}
      </span>
      <span className="text-3xl font-bold text-white leading-none">{value}</span>
      {sub && <span className="text-xs text-zinc-300 mt-1">{sub}</span>}
    </div>
  );
}

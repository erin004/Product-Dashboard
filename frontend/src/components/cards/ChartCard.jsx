export default function ChartCard({ title, children, className = "" }) {
  return (
    <div className={`bg-[#0f0f17] border border-zinc-900 rounded-2xl p-5 ${className}`}>
      <p className="text-sm font-mono uppercase tracking-widest text-zinc-300 mb-4">
        {title}
      </p>
      {children}
    </div>
  );
}

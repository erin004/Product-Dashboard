export default function PageHeader({ title, subtitle, action }) {
  return (
    <div className="flex items-start justify-between mb-8">
      <div>
        {subtitle && (
          <p className="text-xs font-mono text-zinc-600 uppercase tracking-widest mb-1">
            {subtitle}
          </p>
        )}
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
      </div>
      {action}
    </div>
  );
}

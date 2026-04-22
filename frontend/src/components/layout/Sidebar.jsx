const NAV_ITEMS = [
  { icon: "⊞", label: "Dashboard" },
  { icon: "☰", label: "Produk" },
  { icon: "↗", label: "Stats" },
];

export default function Sidebar() {
  return (
    <aside className="fixed top-0 left-0 h-full w-16 bg-[#0a0a14] border-r border-zinc-900 flex flex-col items-center py-5 gap-6 z-40">
      <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">
        E
      </div>
      {NAV_ITEMS.map(({ icon, label }) => (
        <button
          key={label}
          title={label}
          className="w-9 h-9 rounded-lg text-zinc-600 hover:text-white hover:bg-zinc-800 flex items-center justify-center text-lg transition-colors"
        >
          {icon}
        </button>
      ))}
    </aside>
  );
}

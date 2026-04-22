export default function Pagination({ page, totalPages, total, onPageChange }) {
  const pages = Array.from(
    { length: Math.min(5, totalPages) },
    (_, i) => Math.max(1, Math.min(page - 2, totalPages - 4)) + i
  );

  return (
    <div className="flex items-center justify-between px-5 py-3 border-t border-zinc-900">
      <span className="text-xs text-zinc-600 font-mono">
        {total} produk · halaman {page}/{totalPages}
      </span>
      <div className="flex gap-1">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className="px-3 py-1 text-xs rounded-lg border border-zinc-800 text-zinc-500 hover:border-zinc-600 disabled:opacity-30"
        >
          ←
        </button>
        {pages.map((n) => (
          <button
            key={n}
            onClick={() => onPageChange(n)}
            className={`px-3 py-1 text-xs rounded-lg border ${
              n === page
                ? "border-indigo-600 text-indigo-400"
                : "border-zinc-800 text-zinc-500 hover:border-zinc-600"
            }`}
          >
            {n}
          </button>
        ))}
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          className="px-3 py-1 text-xs rounded-lg border border-zinc-800 text-zinc-500 hover:border-zinc-600 disabled:opacity-30"
        >
          →
        </button>
      </div>
    </div>
  );
}

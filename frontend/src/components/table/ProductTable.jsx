import { fmt, star } from "../../utils/formatters";
import Pagination from "./Pagination";

const COLUMNS = [
  { label: "ID",     key: "id" },
  { label: "Judul",  key: "title" },
  { label: "Harga",  key: "price" },
  { label: "Rating", key: "rating" },
  { label: "",       key: null },
];

function SortIcon({ sortKey, colKey, sortDir }) {
  if (sortKey !== colKey) return <span className="ml-1 text-zinc-700">↕</span>;
  return <span className="ml-1 text-indigo-400">{sortDir === "asc" ? "↑" : "↓"}</span>;
}

export default function ProductTable({
  paginated, filtered, loading,
  search, onSearch,
  sortKey, sortDir, onSort,
  page, totalPages, onPageChange,
  onEdit,
}) {
  return (
    <div className="bg-[#0f0f17] border border-zinc-900 rounded-2xl overflow-hidden">
      {/* toolbar */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-900">
        <p className="text-sm font-mono uppercase tracking-widest text-zinc-300">
          Semua Produk
        </p>
        <input
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Cari produk…"
          className="bg-zinc-900 border border-zinc-800 text-sm text-white rounded-lg px-3 py-1.5 w-48 focus:outline-none focus:border-indigo-600 placeholder-zinc-600"
        />
      </div>

      {/* body */}
      {loading ? (
        <div className="py-16 text-center text-zinc-600 text-sm">Memuat data…</div>
      ) : paginated.length === 0 ? (
        <div className="py-16 text-center text-zinc-600 text-sm">Tidak ada produk.</div>
      ) : (
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-900">
              {COLUMNS.map(({ label, key }) => (
                <th
                  key={label}
                  onClick={key ? () => onSort(key) : undefined}
                  className={`px-5 py-3 text-left text-xs font-mono uppercase tracking-wider text-zinc-600 ${key ? "cursor-pointer hover:text-zinc-400" : ""}`}
                >
                  {label}
                  {key && <SortIcon sortKey={sortKey} colKey={key} sortDir={sortDir} />}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-900/60">
            {paginated.map((p) => (
              <tr key={p.id} className="hover:bg-white/[0.02] transition-colors">
                <td className="px-5 py-3 text-zinc-700 font-mono text-xs">{p.id}</td>
                <td className="px-5 py-3 text-zinc-200 max-w-[280px] truncate">{p.title}</td>
                <td className="px-5 py-3 font-mono text-indigo-400">{fmt(p.price)}</td>
                <td className="px-5 py-3">
                  <span className="text-amber-400 text-xs tracking-tighter">{star(p.rating)}</span>
                  <span className="text-zinc-600 text-xs ml-1">({p.rating})</span>
                </td>
                <td className="px-5 py-3 text-right">
                  <button
                    onClick={() => onEdit(p)}
                    className="text-xs text-zinc-500 hover:text-white border-[2px] border-indigo-400 hover:bg-indigo-800 px-3 py-1 rounded-lg transition-all"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {totalPages > 1 && (
        <Pagination
          page={page}
          totalPages={totalPages}
          total={filtered.length}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
}

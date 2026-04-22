export default function SyncButton({ syncing, onClick }) {
  return (
    <button
      onClick={onClick}
      disabled={syncing}
      className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors"
    >
      <span className={syncing ? "animate-spin" : ""}>⟳</span>
      {syncing ? "Fetching…" : "Reset API"}
    </button>
  );
}

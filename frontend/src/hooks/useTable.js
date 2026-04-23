import { useState, useMemo } from "react";

export function useTable(data, perPage = 8) {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("id");
  const [sortDir, setSortDir] = useState("asc");
  const [page, setPage] = useState(1);

  const toggleSort = (key) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir("asc");
    }
    setPage(1);
  };

  // sorting price
  const filtered = useMemo(() => {
    return data
      .filter((p) => p.title?.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => {
        const v = sortDir === "asc" ? 1 : -1;

        const aVal = a[sortKey];
        const bVal = b[sortKey];

        // handle null / undefined
        if (aVal == null) return 1;
        if (bVal == null) return -1;

        // cek numerik
        const aNum = Number(aVal);
        const bNum = Number(bVal);

        if (!isNaN(aNum) && !isNaN(bNum)) {
          return (aNum - bNum) * v;
        }

        // fallback ke string
        return String(aVal).localeCompare(String(bVal)) * v;
      });
  }, [data, search, sortKey, sortDir]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  return {
    search,
    setSearch: (v) => {
      setSearch(v);
      setPage(1);
    },
    sortKey,
    sortDir,
    toggleSort,
    page,
    setPage,
    totalPages,
    filtered,
    paginated,
  };
}

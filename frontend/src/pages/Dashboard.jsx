import { useEffect, useState } from "react";
import { useProducts }          from "../hooks/useProducts";
import { useTable }             from "../hooks/useTable";
import { fmt, avgRating }       from "../utils/formatters";
import { getTopByPrice, getRatingDist } from "../utils/chartHelpers";

import Sidebar              from "../components/layout/Sidebar";
import PageHeader           from "../components/layout/PageHeader";
import StatCard             from "../components/cards/StatCard";
import ChartCard            from "../components/cards/ChartCard";
import PriceBarChart        from "../components/charts/PriceBarChart";
import RatingBarChart       from "../components/charts/RatingBarChart";
import PriceRatingLineChart from "../components/charts/PriceRatingLineChart";
import ProductTable         from "../components/table/ProductTable";
import EditModal            from "../components/ui/EditModal";
import ErrorBanner          from "../components/ui/ErrorBanner";
import SyncButton           from "../components/ui/SyncButton";

export default function Dashboard() {
  const { products, stats, loading, syncing, error, load, sync, update } = useProducts();
  const table   = useTable(products);
  const [editing, setEditing] = useState(null);

  useEffect(() => { load(); }, [load]);

  const chartData  = getTopByPrice(products);
  const ratingDist = getRatingDist(products);

  const handleSave = async (id, body) => {
    await update(id, body);
    setEditing(null);
  };
  return (
    <div className="min-h-screen bg-[#07070f] text-white font-sans">
      {/* noise texture */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          backgroundSize: "200px",
        }}
      />

      <Sidebar />

      <main className="ml-16 p-6 max-w-screen-l">
        <PageHeader
          title="Dashboard"
          subtitle="Technical Test Erin E-commerce"
          action={<SyncButton syncing={syncing} onClick={sync} />}
        />

        <ErrorBanner message={error} />

        {/* stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <StatCard label="Total Produk" value={products.length}      accent="#6366f1" />
          <StatCard label="Avg Price"    value={fmt(stats.avgPrice)}  accent="#8b5cf6" sub="dari semua produk" />
          <StatCard label="Max Price"    value={fmt(stats.maxPrice)}  accent="#a78bfa" sub="harga tertinggi" />
          <StatCard
            label="Avg Rating"
            value={`${avgRating(products)}★`}
            accent="#818cf8"
            sub={`${products.filter((p) => p.rating >= 4).length} produk rating tinggi`}
          />
        </div>

        {/* charts row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <ChartCard title="Top 10 Harga Tertinggi">
            <PriceBarChart data={chartData} />
          </ChartCard>
          <ChartCard title="Distribusi Rating">
            <RatingBarChart data={ratingDist} />
          </ChartCard>
        </div>

        {/* line chart */}
        <ChartCard title="Harga & Rating — Top 10 Produk" className="mb-6">
          <PriceRatingLineChart data={chartData} />
        </ChartCard>

        {/* table */}
        <ProductTable
          paginated={table.paginated}
          filtered={table.filtered}
          loading={loading}
          search={table.search}
          onSearch={table.setSearch}
          sortKey={table.sortKey}
          sortDir={table.sortDir}
          onSort={table.toggleSort}
          page={table.page}
          totalPages={table.totalPages}
          onPageChange={table.setPage}
          onEdit={setEditing}
        />
      </main>

      {editing && (
        <EditModal
          product={editing}
          onClose={() => setEditing(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

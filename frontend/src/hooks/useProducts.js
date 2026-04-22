import { useState, useCallback } from "react";
import { getProducts, getStats, syncApi, updateProduct } from "../api/api";

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [stats, setStats] = useState({ avgPrice: 0, maxPrice: 0 });
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const [prods, st] = await Promise.all([getProducts(), getStats()]);
      setProducts(Array.isArray(prods) ? prods : []);
      setStats(st);
    } catch {
      setError("Gagal memuat data dari server.");
    } finally {
      setLoading(false);
    }
  }, []);

  const sync = useCallback(async () => {
    try {
      setSyncing(true);
      setError(null);
      await syncApi();
      await load();
    } catch {
      setError("Gagal fetch dari API eksternal.");
    } finally {
      setSyncing(false);
    }
  }, [load]);

  // auto load
  const update = useCallback(
    async (id, body) => {
      await updateProduct(id, body);
      await load();
    },
    [load],
  );

  return { products, stats, loading, syncing, error, load, sync, update };
}

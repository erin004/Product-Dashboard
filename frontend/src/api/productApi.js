const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const request = async (path, options = {}) => {
  const res = await fetch(`${BASE_URL}${path}`, options);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
};

export const getProducts = () => request("/products");
export const getStats = () => request("/stats");
export const syncApi = () => request("/fetch");
export const updateProduct = (id, body) =>
  request(`/product/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

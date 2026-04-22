import { useState } from "react";

const FIELDS = [
  { label: "Judul",       key: "title",  type: "text" },
  { label: "Harga",       key: "price",  type: "number" },
  { label: "Rating (0–5)", key: "rating", type: "number" },
];

export default function EditModal({ product, onClose, onSave }) {
  const [form, setForm] = useState({
    title:  product.title,
    price:  product.price,
    rating: product.rating,
  });

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-[#0f0f17] border border-zinc-800 rounded-2xl p-6 w-full max-w-md shadow-2xl">
        <h2 className="text-white font-bold text-lg mb-4 font-mono">Edit Produk</h2>

        <div className="flex flex-col gap-3">
          {FIELDS.map(({ label, key, type }) => (
            <div key={key}>
              <label className="text-xs text-zinc-500 font-mono uppercase tracking-wider">
                {label}
              </label>
              <input
                type={type}
                value={form[key]}
                onChange={set(key)}
                className="mt-1 w-full bg-zinc-900 border border-zinc-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>
          ))}
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 py-2 rounded-lg border border-zinc-700 text-zinc-400 text-sm hover:border-zinc-500"
          >
            Batal
          </button>
          <button
            onClick={() => onSave(product.id, form)}
            className="flex-1 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
}

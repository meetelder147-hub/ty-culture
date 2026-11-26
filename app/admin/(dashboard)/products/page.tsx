"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { formatNGN } from "@/lib/settings";
import { Plus, Trash2, Edit } from "lucide-react";

export default function AdminProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadProducts() {
    const res = await fetch("/api/admin/products");
    const data = await res.json();
    setProducts(data);
    setLoading(false);
  }

  useEffect(() => { loadProducts(); }, []);

  async function deleteProduct(id: string) {
    if (!confirm("Are you sure you want to delete this product?")) return;
    await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
    loadProducts();
  }

  if (loading) return <div className="p-10 text-center text-[#8A7F76]">Loading products...</div>;

  return (
    <div className="max-w-6xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-3xl text-[#3E2A20]">Products</h1>
        <Link href="/admin/products/new" className="flex items-center gap-2 bg-[#3E2A20] text-white px-5 py-2.5 rounded-xl text-sm hover:bg-[#A67B5B] transition">
          <Plus size={18} /> Add Product
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="rounded-2xl bg-white border border-[#EFE6DD] p-10 text-center text-[#8A7F76]">
          No products yet. Click "Add Product" to create one.
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-[#EFE6DD] overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="bg-[#FAF7F2] text-[11px] uppercase tracking-widest text-[#A67B5B]">
              <tr>
                <th className="px-6 py-4 font-medium">Product</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium">Price</th>
                <th className="px-6 py-4 font-medium">Stock</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EFE6DD]">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-[#FAF7F2] transition">
                  <td className="px-6 py-4 flex items-center gap-4">
                    <img src={p.images.split(',')[0]} alt={p.name} className="w-10 h-10 rounded object-cover bg-[#EFE6DD]" />
                    <span className="font-medium text-[#3E2A20]">{p.name}</span>
                  </td>
                  <td className="px-6 py-4 capitalize text-[#8A7F76]">{p.category.replace('-', ' ')}</td>
                  <td className="px-6 py-4 text-[#3E2A20]">{formatNGN(p.price)}</td>
                  <td className="px-6 py-4 text-[#8A7F76]">{p.stock} in stock</td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <Link href={`/admin/products/${p.id}`} className="inline-flex p-2 text-[#A67B5B] hover:text-[#3E2A20] transition">
                      <Edit size={18} />
                    </Link>
                    <button onClick={() => deleteProduct(p.id)} className="inline-flex p-2 text-red-400 hover:text-red-600 transition">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
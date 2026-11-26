"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

export default function NewProduct() {
  const router = useRouter();
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [newCat, setNewCat] = useState("");
  
  const [form, setForm] = useState({
    name: "", slug: "", description: "", details: "", 
    price: "", originalPrice: "", category: "", 
    images: "", stock: "10", featured: false
  });

  async function loadCategories() {
    const res = await fetch("/api/admin/categories");
    const data = await res.json();
    setCategories(data);
    if (data.length > 0 && !form.category) {
      setForm(f => ({ ...f, category: data[0].slug }));
    }
  }

  useEffect(() => { loadCategories(); }, []);

  useEffect(() => {
    if (form.name && !form.slug) {
      setForm(f => ({ ...f, slug: f.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') }));
    }
  }, [form.name]);

  async function addCategory() {
    if (!newCat) return;
    await fetch("/api/admin/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newCat }),
    });
    setNewCat("");
    loadCategories(); 
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    
    const payload = {
      ...form,
      price: parseFloat(form.price) * 100,
      originalPrice: form.originalPrice ? parseFloat(form.originalPrice) * 100 : null,
      stock: parseInt(form.stock),
    };

    const res = await fetch("/api/admin/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      router.push("/admin/products");
    } else {
      alert("Failed to create product");
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl">
      <h1 className="font-serif text-3xl mb-8 text-[#3E2A20]">Add New Product</h1>
      
      <form onSubmit={handleSubmit} className="space-y-5 bg-white p-8 rounded-2xl border border-[#EFE6DD]">
        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm mb-2">Product Name</label>
            <input required type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full rounded-xl border px-4 py-2" />
          </div>
          <div>
            <label className="block text-sm mb-2">Slug (URL)</label>
            <input required type="text" value={form.slug} onChange={e => setForm({...form, slug: e.target.value})} className="w-full rounded-xl border px-4 py-2" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm mb-2">Price (₦)</label>
            <input required type="number" value={form.price} onChange={e => setForm({...form, price: e.target.value})} className="w-full rounded-xl border px-4 py-2" />
          </div>
          <div>
            <label className="block text-sm mb-2">Original Price (Optional Slash)</label>
            <input type="number" value={form.originalPrice} onChange={e => setForm({...form, originalPrice: e.target.value})} className="w-full rounded-xl border px-4 py-2" />
          </div>
        </div>

        <div>
          <label className="block text-sm mb-2">Category</label>
          <div className="flex gap-2">
            <select required value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="flex-1 rounded-xl border px-4 py-2 bg-white">
              <option value="" disabled>Select a category</option>
              {categories.map(c => <option key={c.slug} value={c.slug}>{c.name}</option>)}
            </select>
          </div>
          <div className="flex gap-2 mt-2">
            <input type="text" placeholder="Or type new category..." value={newCat} onChange={e => setNewCat(e.target.value)} className="flex-1 rounded-xl border px-4 py-2 text-sm" />
            <button type="button" onClick={addCategory} className="bg-[#FAF7F2] border px-4 rounded-xl hover:bg-[#EFE6DD]"><Plus size={18} /></button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm mb-2">Stock Quantity</label>
            <input required type="number" value={form.stock} onChange={e => setForm({...form, stock: e.target.value})} className="w-full rounded-xl border px-4 py-2" />
          </div>
          <div className="flex items-center mt-8">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.featured} onChange={e => setForm({...form, featured: e.target.checked})} className="w-5 h-5 rounded border-gray-300 text-[#3E2A20] focus:ring-[#3E2A20]" />
              <span className="text-sm">Feature on Homepage</span>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm mb-2">Image URL</label>
          <input required type="text" value={form.images} onChange={e => setForm({...form, images: e.target.value})} className="w-full rounded-xl border px-4 py-2" placeholder="/products/tote.svg" />
        </div>

        <div>
          <label className="block text-sm mb-2">Description</label>
          <textarea required rows={4} value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="w-full rounded-xl border px-4 py-2" />
        </div>

        <div>
          <label className="block text-sm mb-2">Details (Comma separated)</label>
          <textarea rows={2} value={form.details} onChange={e => setForm({...form, details: e.target.value})} className="w-full rounded-xl border px-4 py-2" placeholder="e.g. Vegan leather, Gold hardware" />
        </div>

        <button disabled={loading} className="w-full bg-[#3E2A20] text-white py-3 rounded-xl uppercase tracking-widest text-sm disabled:opacity-50">
          {loading ? "Saving..." : "Create Product"}
        </button>
      </form>
    </div>
  );
}
"use client";
import { useState, useEffect } from "react";
import { formatNGN } from "@/lib/settings";
import { ChevronDown, ChevronUp } from "lucide-react";

const STATUSES = ["PENDING", "PAID", "SHIPPED", "DELIVERED", "CANCELLED"];

export default function AdminOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);

  async function loadOrders() {
    const res = await fetch("/api/admin/orders");
    const data = await res.json();
    setOrders(data);
    setLoading(false);
  }

  useEffect(() => { loadOrders(); }, []);

  async function updateStatus(id: string, status: string) {
    await fetch(`/api/admin/orders/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    loadOrders();
  }

  if (loading) return <div className="p-10 text-center text-[#8A7F76]">Loading orders...</div>;

  return (
    <div className="max-w-5xl">
      <h1 className="font-serif text-3xl mb-8 text-[#3E2A20]">Orders</h1>
      
      {orders.length === 0 ? (
        <div className="rounded-2xl bg-white border border-[#EFE6DD] p-10 text-center text-[#8A7F76]">
          No orders yet.
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((o) => (
            <div key={o.id} className="rounded-2xl bg-white border border-[#EFE6DD] overflow-hidden">
              <div 
                className="p-5 flex flex-wrap md:flex-nowrap items-center justify-between gap-4 cursor-pointer hover:bg-[#FAF7F2] transition"
                onClick={() => setExpanded(expanded === o.id ? null : o.id)}
              >
                <div>
                  <p className="font-medium text-[#3E2A20]">{o.customerName}</p>
                  <p className="text-sm text-[#8A7F76]">{o.customerEmail} · {o.customerPhone}</p>
                </div>
                
                <div className="text-right">
                  <p className="font-serif text-lg text-[#3E2A20]">{formatNGN(o.totalAmount)}</p>
                  <p className="text-xs text-[#8A7F76]">{new Date(o.createdAt).toLocaleDateString()}</p>
                </div>

                <div className="flex items-center gap-4">
                  <select
                    value={o.status}
                    onChange={(e) => {
                      e.stopPropagation();
                      updateStatus(o.id, e.target.value);
                    }}
                    onClick={(e) => e.stopPropagation()}
                    className={`text-xs font-medium rounded-full px-3 py-1 border-none outline-none cursor-pointer ${
                      o.status === "PENDING" ? "bg-yellow-100 text-yellow-800" :
                      o.status === "PAID" ? "bg-green-100 text-green-800" :
                      o.status === "CANCELLED" ? "bg-red-100 text-red-800" :
                      "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  {expanded === o.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
              </div>

              {expanded === o.id && (
                <div className="border-t border-[#EFE6DD] p-5 bg-[#FAF7F2]">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-[11px] uppercase tracking-widest text-[#A67B5B] mb-2">Shipping Details</h3>
                      <p className="text-sm text-[#3E2A20] font-medium">{o.customerName}</p>
                      <p className="text-sm text-[#3E2A20] mt-1">{o.shippingAddress}</p>
                      <p className="text-sm text-[#3E2A20] mt-1">{o.customerPhone}</p>
                      <p className="text-sm text-[#3E2A20] mt-1">{o.customerEmail}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-[11px] uppercase tracking-widest text-[#A67B5B] mb-2">Items Ordered</h3>
                      <ul className="space-y-2">
                        {o.items.map((item: any) => (
                          <li key={item.id} className="flex justify-between text-sm">
                            <span className="text-[#3E2A20]">{item.quantity}x {item.product.name}</span>
                            <span className="text-[#8A7F76]">{formatNGN(item.price * item.quantity)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
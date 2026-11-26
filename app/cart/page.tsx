"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart";
import { formatNGN } from "@/lib/settings";
import { Trash2 } from "lucide-react";

export default function CartPage() {
  const { items, setQty, remove, count, clear } = useCart();
  const [products, setProducts] = useState<any[]>([]);
  const [settings, setSettings] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [checkingOut, setCheckingOut] = useState(false);
  const [bankSuccess, setBankSuccess] = useState(false);
  const [customer, setCustomer] = useState({ name: "", email: "", phone: "", address: "" });

  useEffect(() => {
    fetch("/api/admin/settings").then(r => r.json()).then(d => setSettings(d));
  }, []);

  useEffect(() => {
    async function fetchProducts() {
      if (items.length === 0) { setLoading(false); return; }
      const res = await fetch("/api/products");
      const allProducts = await res.json();
      const cartProducts = items.map(item => {
        const p = allProducts.find((prod: any) => prod.slug === item.slug);
        return p ? { ...p, qty: item.qty } : null;
      }).filter(Boolean);
      setProducts(cartProducts);
      setLoading(false);
    }
    fetchProducts();
  }, [items]);

  const total = products.reduce((sum, p) => sum + (p.price * p.qty), 0);

  async function handleCheckout(method: "paystack" | "bank") {
    if (!customer.name || !customer.email || !customer.phone || !customer.address) {
      alert("Please fill in all shipping details.");
      return;
    }
    setCheckingOut(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map(i => ({ slug: i.slug, qty: i.qty })),
          customer,
          paymentMethod: method,
        }),
      });
      const data = await res.json();
      
      if (data.url) {
        window.location.href = data.url; // Paystack Redirect
      } else if (data.success && method === "bank") {
        clear(); // Empty the cart
        setBankSuccess(true); // Show success message
      } else {
        alert(data.error || "Checkout failed");
        setCheckingOut(false);
      }
    } catch {
      alert("Network error. Please try again.");
      setCheckingOut(false);
    }
  }

  if (bankSuccess) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-24 text-center">
        <div className="bg-white border border-[#E8DED5] rounded-2xl p-10 shadow-sm">
          <h1 className="font-serif text-4xl mb-4 text-[#3E2A20]">Order Placed!</h1>
          <p className="text-[#8A7F76] mb-8">
            Please transfer <strong>{formatNGN(total)}</strong> to the account below, and send your receipt to us on WhatsApp so we can confirm and ship your order.
          </p>
          <div className="bg-[#FAF7F2] p-6 rounded-xl mb-8 border border-[#E8DED5]">
            <p className="text-sm font-medium text-[#3E2A20]">{settings.bankName}</p>
            <p className="text-sm text-[#3E2A20]">{settings.accountName}</p>
            <p className="text-xl font-serif text-[#3E2A20] mt-2">{settings.accountNumber}</p>
          </div>
          <a
            href={`https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(`Hi ${settings.brandName}, I just placed an order for ${formatNGN(total)}. Here is my receipt:`)}`}
            target="_blank"
            rel="noreferrer"
            className="inline-block bg-[#25D366] text-white px-8 py-4 rounded-xl font-medium hover:bg-[#1EBE5A] transition"
          >
            Send Receipt on WhatsApp
          </a>
        </div>
      </div>
    );
  }

  if (loading) return <div className="text-center py-24 text-[#8A7F76]">Loading cart...</div>;
  
  if (count === 0) return (
    <div className="text-center py-24">
      <h1 className="font-serif text-3xl mb-4 text-[#3E2A20]">Your cart is empty</h1>
      <Link href="/shop" className="text-[#A67B5B] underline">Continue shopping</Link>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-3 gap-12">
      <div className="lg:col-span-2 space-y-6">
        <h1 className="font-serif text-3xl mb-8 text-[#3E2A20]">Shopping Cart</h1>
        {products.map((p) => (
          <div key={p.id} className="flex gap-6 border-b border-[#E8DED5] pb-6">
            <img src={p.images.split(',')[0]} alt={p.name} className="w-24 h-24 object-cover rounded-lg bg-[#EFE6DD]" />
            <div className="flex-1">
              <h2 className="font-serif text-lg text-[#3E2A20]">{p.name}</h2>
              <p className="text-sm text-[#8A7F76]">{formatNGN(p.price)}</p>
              <div className="flex items-center gap-4 mt-4">
                <input type="number" min="1" value={p.qty} onChange={(e) => setQty(p.slug, parseInt(e.target.value) || 1)} className="w-16 border border-[#E8DED5] rounded px-2 py-1 text-center bg-white" />
                <button onClick={() => remove(p.slug)} className="text-[#A67B5B] hover:text-red-500 transition"><Trash2 size={18} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#FAF7F2] border border-[#E8DED5] rounded-2xl p-6 h-fit">
        <h2 className="font-serif text-xl mb-4 text-[#3E2A20]">Order Summary</h2>
        <div className="flex justify-between text-sm mb-2 text-[#8A7F76]"><span>Subtotal</span><span>{formatNGN(total)}</span></div>
        <div className="flex justify-between font-medium border-t border-[#E8DED5] pt-4 mt-4 text-[#3E2A20]">
          <span>Total</span><span className="text-xl font-serif">{formatNGN(total)}</span>
        </div>

        <div className="mt-6 space-y-3">
          <input type="text" placeholder="Full Name" value={customer.name} onChange={e => setCustomer({...customer, name: e.target.value})} className="w-full border border-[#E8DED5] rounded px-3 py-2 text-sm bg-white focus:outline-none focus:border-[#A67B5B]" />
          <input type="email" placeholder="Email" value={customer.email} onChange={e => setCustomer({...customer, email: e.target.value})} className="w-full border border-[#E8DED5] rounded px-3 py-2 text-sm bg-white focus:outline-none focus:border-[#A67B5B]" />
          <input type="tel" placeholder="Phone Number" value={customer.phone} onChange={e => setCustomer({...customer, phone: e.target.value})} className="w-full border border-[#E8DED5] rounded px-3 py-2 text-sm bg-white focus:outline-none focus:border-[#A67B5B]" />
          <input type="text" placeholder="Delivery Address" value={customer.address} onChange={e => setCustomer({...customer, address: e.target.value})} className="w-full border border-[#E8DED5] rounded px-3 py-2 text-sm bg-white focus:outline-none focus:border-[#A67B5B]" />
        </div>

        <div className="mt-6 space-y-3">
          <button onClick={() => handleCheckout("paystack")} disabled={checkingOut} className="w-full bg-[#3E2A20] text-white py-3 rounded-xl uppercase tracking-widest text-sm hover:bg-[#A67B5B] transition disabled:opacity-50">
            {checkingOut ? "Processing..." : "Pay with Paystack"}
          </button>
          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-[#E8DED5]"></div>
            <span className="flex-shrink-0 mx-4 text-[#8A7F76] text-xs uppercase">OR</span>
            <div className="flex-grow border-t border-[#E8DED5]"></div>
          </div>
          <button onClick={() => handleCheckout("bank")} disabled={checkingOut} className="w-full bg-white border border-[#3E2A20] text-[#3E2A20] py-3 rounded-xl uppercase tracking-widest text-sm hover:bg-[#FAF7F2] transition disabled:opacity-50">
            {checkingOut ? "Processing..." : "Pay via Bank Transfer"}
          </button>
        </div>

        {settings.bankName && (
          <div className="mt-6 p-4 bg-white border border-[#E8DED5] rounded-xl text-center shadow-sm">
            <p className="text-[11px] uppercase tracking-widest text-[#A67B5B] mb-2">Manual Bank Transfer</p>
            <p className="text-sm text-[#3E2A20] font-medium">{settings.bankName}</p>
            <p className="text-sm text-[#3E2A20]">{settings.accountName}</p>
            <p className="text-lg font-serif text-[#3E2A20]">{settings.accountNumber}</p>
          </div>
        )}
      </div>
    </div>
  );
}
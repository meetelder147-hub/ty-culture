import Link from "next/link";
import { prisma } from "@/lib/db";
import { formatNGN } from "@/lib/settings";

export default async function AdminDashboard() {
  const [productCount, orderCount, msgCount, visitCount] = await Promise.all([
    prisma.product.count(),
    prisma.order.count(),
    prisma.contactMessage.count(),
    prisma.visit.count(),
  ]);

  const topCountries = await prisma.visit.groupBy({
    by: ["country"],
    _count: { country: true },
    orderBy: { _count: { country: "desc" } },
    take: 3,
  });

  const recentOrders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" }, take: 5,
  });

  return (
    <div className="max-w-5xl">
      <h1 className="font-serif text-3xl mb-8 text-[#3E2A20]">Dashboard</h1>
      
      <div className="grid gap-4 md:grid-cols-4 mb-10">
        <div className="block rounded-2xl bg-white border border-[#EFE6DD] p-6 shadow-sm">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#A67B5B]">Visitors</p>
          <p className="text-3xl font-serif text-[#3E2A20] mt-2">{visitCount}</p>
        </div>
        <Link href="/admin/products" className="block rounded-2xl bg-white border border-[#EFE6DD] p-6 shadow-sm hover:shadow-md transition">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#A67B5B]">Products</p>
          <p className="text-3xl font-serif text-[#3E2A20] mt-2">{productCount}</p>
        </Link>
        <Link href="/admin/orders" className="block rounded-2xl bg-white border border-[#EFE6DD] p-6 shadow-sm hover:shadow-md transition">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#A67B5B]">Orders</p>
          <p className="text-3xl font-serif text-[#3E2A20] mt-2">{orderCount}</p>
        </Link>
        <Link href="/admin/messages" className="block rounded-2xl bg-white border border-[#EFE6DD] p-6 shadow-sm hover:shadow-md transition">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#A67B5B]">Messages</p>
          <p className="text-3xl font-serif text-[#3E2A20] mt-2">{msgCount}</p>
        </Link>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-10">
        <div className="rounded-2xl bg-white border border-[#EFE6DD] p-6">
          <h2 className="font-serif text-xl mb-4 text-[#3E2A20]">Recent Orders</h2>
          {recentOrders.length === 0 ? (
            <p className="text-sm text-[#8A7F76]">No orders yet.</p>
          ) : (
            <ul className="divide-y divide-[#EFE6DD]">
              {recentOrders.map((o) => (
                <li key={o.id} className="py-3 flex justify-between text-sm">
                  <span className="text-[#3E2A20]">{o.customerName}</span>
                  <span className="text-[#8A7F76]">{formatNGN(o.totalAmount)}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="rounded-2xl bg-white border border-[#EFE6DD] p-6">
          <h2 className="font-serif text-xl mb-4 text-[#3E2A20]">Top Visitor Countries</h2>
          {topCountries.length === 0 ? (
            <p className="text-sm text-[#8A7F76]">No visits yet.</p>
          ) : (
            <ul className="divide-y divide-[#EFE6DD]">
              {topCountries.map((c) => (
                <li key={c.country} className="py-3 flex justify-between text-sm">
                  <span className="text-[#3E2A20]">{c.country || "Unknown"}</span>
                  <span className="text-[#8A7F76]">{c._count.country} visits</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
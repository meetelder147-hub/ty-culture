import Link from "next/link";
import { prisma } from "@/lib/db";
import { formatNGN } from "@/lib/settings";

export default async function AdminDashboard() {
  const [productCount, orderCount, msgCount] = await Promise.all([
    prisma.product.count(),
    prisma.order.count(),
    prisma.contactMessage.count(),
  ]);
  const recentOrders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" }, take: 5,
  });

  const cards = [
    { label: "Products", value: productCount, href: "/admin/products" },
    { label: "Orders",   value: orderCount,   href: "/admin/orders" },
    { label: "Messages", value: msgCount,     href: "/admin/messages" },
  ];

  return (
    <div>
      <h1 className="font-serif text-3xl mb-8 text-[#3E2A20]">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-3 mb-10">
        {cards.map((c) => (
          <Link key={c.label} href={c.href} className="block rounded-2xl bg-white border border-[#EFE6DD] p-6 hover:shadow-md transition">
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#A67B5B]">{c.label}</p>
            <p className="text-3xl font-serif text-[#3E2A20] mt-2">{c.value}</p>
          </Link>
        ))}
      </div>

      <div className="rounded-2xl bg-white border border-[#EFE6DD] p-6">
        <h2 className="font-serif text-xl mb-4 text-[#3E2A20]">Recent orders</h2>
        {recentOrders.length === 0 ? (
          <p className="text-sm text-[#8A7F76]">No orders yet.</p>
        ) : (
          <ul className="divide-y divide-[#EFE6DD]">
            {recentOrders.map((o) => (
              <li key={o.id} className="py-3 flex justify-between text-sm">
                <span className="text-[#3E2A20]">{o.customerName}</span>
                <span className="text-[#8A7F76]">{formatNGN(o.totalAmount)} · {o.status}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
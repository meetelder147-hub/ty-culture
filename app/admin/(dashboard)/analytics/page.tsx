import { prisma } from "@/lib/db";

export default async function AdminAnalytics() {
  const now = new Date();
  const dayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  const [visits24h, visits7d, visits30d] = await Promise.all([
    prisma.visit.count({ where: { createdAt: { gte: dayAgo } } }),
    prisma.visit.count({ where: { createdAt: { gte: weekAgo } } }),
    prisma.visit.count({ where: { createdAt: { gte: monthAgo } } }),
  ]);

  const topCountries = await prisma.visit.groupBy({
    by: ["country"],
    _count: { country: true },
    orderBy: { _count: { country: "desc" } },
    take: 5,
  });

  const recentVisits = await prisma.visit.findMany({
    orderBy: { createdAt: "desc" },
    take: 20,
  });

  return (
    <div className="max-w-5xl">
      <h1 className="font-serif text-3xl mb-8 text-[#3E2A20]">Traffic Analytics</h1>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="rounded-2xl bg-white border border-[#EFE6DD] p-6 shadow-sm">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#A67B5B]">Last 24 Hours</p>
          <p className="text-4xl font-serif text-[#3E2A20] mt-2">{visits24h}</p>
        </div>
        <div className="rounded-2xl bg-white border border-[#EFE6DD] p-6 shadow-sm">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#A67B5B]">Last 7 Days</p>
          <p className="text-4xl font-serif text-[#3E2A20] mt-2">{visits7d}</p>
        </div>
        <div className="rounded-2xl bg-white border border-[#EFE6DD] p-6 shadow-sm">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#A67B5B]">Last 30 Days</p>
          <p className="text-4xl font-serif text-[#3E2A20] mt-2">{visits30d}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="md:col-span-1 rounded-2xl bg-white border border-[#EFE6DD] p-6 shadow-sm">
          <h2 className="font-serif text-xl mb-4 text-[#3E2A20]">Top Locations</h2>
          <ul className="space-y-3">
            {topCountries.map((c) => (
              <li key={c.country} className="flex justify-between text-sm">
                <span className="text-[#3E2A20]">{c.country || "Unknown"}</span>
                <span className="text-[#8A7F76]">{c._count.country} views</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2 rounded-2xl bg-white border border-[#EFE6DD] p-6 shadow-sm">
          <h2 className="font-serif text-xl mb-4 text-[#3E2A20]">Live Activity</h2>
          <div className="overflow-x-auto max-h-64 overflow-y-auto pr-2">
            <table className="w-full text-sm text-left">
              <thead className="text-[11px] uppercase tracking-widest text-[#A67B5B] border-b border-[#EFE6DD] sticky top-0 bg-white">
                <tr>
                  <th className="pb-2 font-medium">Time</th>
                  <th className="pb-2 font-medium">Path</th>
                  <th className="pb-2 font-medium">Country</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EFE6DD]">
                {recentVisits.map((v) => (
                  <tr key={v.id}>
                    <td className="py-2 text-[#8A7F76]">{new Date(v.createdAt).toLocaleTimeString()}</td>
                    <td className="py-2 text-[#3E2A20]">{v.path}</td>
                    <td className="py-2 text-[#3E2A20]">{v.country || "Unknown"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
import { prisma } from "@/lib/db";

export default async function AdminMessages() {
  const msgs = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="font-serif text-3xl mb-8 text-[#3E2A20]">Messages</h1>
      {msgs.length === 0 ? (
        <div className="rounded-2xl bg-white border border-[#EFE6DD] p-10 text-center text-[#8A7F76]">
          No messages yet.
        </div>
      ) : (
        <ul className="space-y-3">
          {msgs.map((m) => (
            <li key={m.id} className="rounded-2xl bg-white border border-[#EFE6DD] p-5">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-[#3E2A20] font-medium">{m.name} · {m.email}</span>
                <span className="text-[#8A7F76] text-xs">{new Date(m.createdAt).toLocaleDateString()}</span>
              </div>
              <p className="text-sm text-[#3E2A20] whitespace-pre-wrap">{m.message}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
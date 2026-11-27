"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard, Package, ShoppingBag, Settings, MessageSquare, LogOut, Menu, X, TrendingUp, Lock
} from "lucide-react";

const nav = [
  { href: "/admin",              label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/analytics",    label: "Analytics", icon: TrendingUp },
  { href: "/admin/products",     label: "Products",  icon: Package },
  { href: "/admin/orders",       label: "Orders",    icon: ShoppingBag },
  { href: "/admin/messages",     label: "Messages",  icon: MessageSquare },
  { href: "/admin/settings",     label: "Settings",  icon: Settings },
  { href: "/admin/password",     label: "Security",  icon: Lock }, // ADDED THIS
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-[#F5EDE5]">
      <div className="lg:hidden sticky top-0 z-40 flex items-center justify-between bg-[#3E2A20] text-[#FAF7F2] px-4 py-3">
        <span className="font-serif text-lg">T.Y Culture · Admin</span>
        <button onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <aside className={`fixed top-0 left-0 h-screen w-64 bg-[#3E2A20] text-[#FAF7F2] z-40 transform transition-transform duration-300 lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="p-6 border-b border-white/10">
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#C9A875]">Admin</p>
          <h2 className="font-serif text-2xl mt-1">T.Y Culture</h2>
        </div>

        <nav className="p-4 space-y-1">
          {nav.map((item) => {
            const Icon = item.icon;
            const active = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
            return (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition ${active ? "bg-[#C9A875] text-[#3E2A20]" : "hover:bg-white/10"}`}
              >
                <Icon size={18} /> {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
          <button onClick={logout} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm w-full hover:bg-white/10 transition">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {open && <div className="lg:hidden fixed inset-0 bg-black/40 z-30" onClick={() => setOpen(false)} />}
      <main className="lg:pl-64 p-6 lg:p-10">{children}</main>
    </div>
  );
}
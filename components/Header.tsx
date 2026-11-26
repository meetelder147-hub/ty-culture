"use client";
import Link from "next/link";
import { useCart } from "@/lib/cart";
import { ShoppingBag, Menu, X, Search } from "lucide-react";
import { useState } from "react";
import { SiteSettings } from "@/lib/settings";

export default function Header({ settings }: { settings: SiteSettings }) {
  const { count } = useCart();
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/shop", label: "Shop All" },
    { href: "/contact", label: "Contact" },
    { href: "/about", label: "About" },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-[#E8DED5] bg-[#FAF7F2]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>

        <Link href="/" className="flex items-center gap-3">
          {settings.logoUrl ? (
            <img src={settings.logoUrl} alt={settings.brandName} className="h-10 object-contain" />
          ) : (
            <span className="font-serif text-2xl tracking-wide text-[#3E2A20]">{settings.brandName}</span>
          )}
        </Link>

        <nav className="hidden md:flex gap-8 text-[11px] font-medium uppercase tracking-[0.2em] text-[#6B5C50]">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-[#3E2A20] transition">{l.label}</Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/search" className="p-2 text-[#3E2A20] hover:text-[#A67B5B] transition">
            <Search size={20} strokeWidth={1.5} />
          </Link>
          <Link href="/cart" className="relative p-2 text-[#3E2A20] hover:text-[#A67B5B] transition">
            <ShoppingBag size={22} strokeWidth={1.5} />
            {count > 0 && (
              <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-[#A67B5B] text-[9px] font-bold text-white">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-[#E8DED5] bg-[#FAF7F2] px-6 py-4 flex flex-col gap-4 text-sm uppercase tracking-widest text-[#3E2A20]">
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</Link>
          ))}
        </div>
      )}
    </header>
  );
}
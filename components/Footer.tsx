import Link from "next/link";
import { SiteSettings } from "@/lib/settings";
import { Instagram, Facebook } from "lucide-react";

export default function Footer({ settings }: { settings: SiteSettings }) {
  const waLink = `https://wa.me/${settings.whatsapp}`;

  return (
    <footer className="mt-24 border-t border-[#E8DED5] bg-[#FAF7F2]">
      <div className="mx-auto max-w-6xl px-6 py-16 grid gap-12 md:grid-cols-4">
        <div className="col-span-1 md:col-span-1">
          {settings.logoUrl ? (
            <img src={settings.logoUrl} alt={settings.brandName} className="h-12 object-contain mb-4" />
          ) : (
            <h3 className="font-serif text-2xl text-[#3E2A20] mb-4">{settings.brandName}</h3>
          )}
          <p className="text-sm text-[#8A7F76] leading-relaxed mb-6">{settings.tagline}</p>
          <div className="flex gap-3">
            {settings.instagram && (
              <a href={settings.instagram} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-[#E8DED5] flex items-center justify-center text-[#A67B5B] hover:bg-[#3E2A20] hover:text-white hover:border-[#3E2A20] transition">
                <Instagram size={18} />
              </a>
            )}
            {settings.tiktok && (
              <a href={settings.tiktok} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-[#E8DED5] flex items-center justify-center text-[#A67B5B] hover:bg-[#3E2A20] hover:text-white hover:border-[#3E2A20] transition">
                {/* TikTok SVG */}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 15.68a6.34 6.34 0 0 0 6.33 6.33 6.33 6.33 0 0 0 6.33-6.33v-6.9a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-2.84-1.21z"/>
                </svg>
              </a>
            )}
            {settings.facebook && (
              <a href={settings.facebook} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-[#E8DED5] flex items-center justify-center text-[#A67B5B] hover:bg-[#3E2A20] hover:text-white hover:border-[#3E2A20] transition">
                <Facebook size={18} />
              </a>
            )}
          </div>
        </div>

        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#3E2A20] font-medium mb-4">Shop</p>
          <ul className="space-y-3 text-sm text-[#8A7F76]">
            <li><Link href="/shop" className="hover:text-[#A67B5B] transition">All Products</Link></li>
            <li><Link href="/shop?c=bags" className="hover:text-[#A67B5B] transition">Bags</Link></li>
            <li><Link href="/shop?c=hand-fans" className="hover:text-[#A67B5B] transition">Hand Fans</Link></li>
            <li><Link href="/shop?c=face-masks" className="hover:text-[#A67B5B] transition">Face Masks</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#3E2A20] font-medium mb-4">Information</p>
          <ul className="space-y-3 text-sm text-[#8A7F76]">
            <li><Link href="/about" className="hover:text-[#A67B5B] transition">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-[#A67B5B] transition">Contact</Link></li>
            <li><Link href="/faq" className="hover:text-[#A67B5B] transition">FAQ</Link></li>
            <li><Link href="/shipping" className="hover:text-[#A67B5B] transition">Shipping</Link></li>
            <li><Link href="/returns" className="hover:text-[#A67B5B] transition">Returns</Link></li>
            <li><Link href="/privacy" className="hover:text-[#A67B5B] transition">Privacy</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#3E2A20] font-medium mb-4">Get in touch</p>
          <ul className="space-y-3 text-sm text-[#8A7F76]">
            <li><a href={`mailto:${settings.email}`} className="hover:text-[#A67B5B] transition">{settings.email}</a></li>
            <li><a href={`tel:${settings.phone}`} className="hover:text-[#A67B5B] transition">{settings.phone}</a></li>
            <li><a href={waLink} target="_blank" rel="noreferrer" className="hover:text-[#A67B5B] transition">WhatsApp Chat</a></li>
          </ul>
          <div className="mt-6">
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#3E2A20] font-medium mb-2">Location</p>
            <p className="text-sm text-[#8A7F76]">{settings.address}</p>
          </div>
        </div>
      </div>

      <div className="border-t border-[#E8DED5] py-6 text-center flex flex-col md:flex-row justify-between items-center px-6 max-w-6xl mx-auto text-xs text-[#8A7F76]">
        <p>© {new Date().getFullYear()} {settings.brandName}. All rights reserved.</p>
        <p className="mt-2 md:mt-0">Designed with elegance.</p>
      </div>
    </footer>
  );
}
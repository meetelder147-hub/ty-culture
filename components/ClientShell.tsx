"use client";
import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";
import WhatsAppButton from "./WhatsAppButton";
import { SiteSettings } from "@/lib/settings";

export default function ClientShell({ children, settings }: { children: React.ReactNode; settings: SiteSettings; }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <>
      {!isAdmin && (
        <div className="bg-[#3E2A20] text-[#FAF7F2] text-center py-2 text-[10px] uppercase tracking-[0.2em]">
          {settings.announcement}
        </div>
      )}
      {!isAdmin && <Header settings={settings} />}
      <main className="flex-1">{children}</main>
      {!isAdmin && <Footer settings={settings} />}
      {!isAdmin && <WhatsAppButton whatsapp={settings.whatsapp} brandName={settings.brandName} />}
    </>
  );
}
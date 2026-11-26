import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart";
import ClientShell from "@/components/ClientShell";
import VisitorTracker from "@/components/VisitorTracker";
import { getSettings } from "@/lib/settings";

const serif = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" });
const sans = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "TY Couture — Everyday Elegance",
  description: "Handpicked bags, hand fans, face masks and beauty essentials.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSettings();

  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body className="bg-[#FAF7F2] text-[#1A1410] antialiased min-h-screen flex flex-col">
        <CartProvider>
          <VisitorTracker />
          <ClientShell settings={settings}>
            {children}
          </ClientShell>
        </CartProvider>
      </body>
    </html>
  );
}
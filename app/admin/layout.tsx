import Link from "next/link";
import { LayoutDashboard, Package, ShoppingBag, Settings, MessageSquare } from "lucide-react";
import { siteConfig } from "@/lib/config";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-sand-soft">
      {/* Sidebar */}
      <aside className="w-64 bg-cacao text-cream flex flex-col hidden md:flex">
        <div className="h-20 flex items-center px-6 border-b border-espresso">
          <Link href="/" className="font-serif text-xl tracking-widest text-gold">
            {siteConfig.name}
          </Link>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-espresso transition-colors text-sm font-medium">
            <LayoutDashboard size={18} /> Dashboard
          </Link>
          <Link href="/admin/products" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-espresso transition-colors text-sm font-medium">
            <Package size={18} /> Products
          </Link>
          <Link href="/admin/orders" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-espresso transition-colors text-sm font-medium">
            <ShoppingBag size={18} /> Orders
          </Link>
          <Link href="/admin/messages" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-espresso transition-colors text-sm font-medium">
            <MessageSquare size={18} /> Messages
          </Link>
          <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-espresso transition-colors text-sm font-medium">
            <Settings size={18} /> Settings
          </Link>
        </nav>

        <div className="p-4 border-t border-espresso">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 w-full rounded-lg hover:bg-espresso transition-colors text-sm font-medium text-gold">
            View Live Store
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
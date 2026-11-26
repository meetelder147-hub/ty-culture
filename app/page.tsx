import Link from "next/link";
import { prisma } from "@/lib/db";
import { getSettings } from "@/lib/settings";
import ProductCard from "@/components/ProductCard";

export default async function Home() {
  const settings = await getSettings();
  const featured = await prisma.product.findMany({ where: { featured: true }, take: 4 });
  const newArrivals = await prisma.product.findMany({ orderBy: { createdAt: "desc" }, take: 4 });

  return (
    <div className="flex flex-col gap-24 pb-24">
      <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center bg-[#EFE6DD] overflow-hidden">
        <div className="absolute inset-0 bg-[url('/products/fan.svg')] bg-cover bg-center opacity-10 blur-sm scale-110" />
        <div className="relative z-10 text-center px-6 max-w-3xl">
          <p className="text-[12px] font-medium uppercase tracking-[0.4em] text-[#A67B5B] mb-6">The New Collection</p>
          <h1 className="font-serif text-6xl md:text-8xl text-[#3E2A20] leading-[1.05] mb-8 whitespace-pre-line">
            {settings.heroTitle}
          </h1>
          <p className="text-lg text-[#6B5C50] mb-10 max-w-lg mx-auto">
            {settings.heroSubtitle}
          </p>
          <Link href="/shop" className="inline-block bg-[#3E2A20] text-[#FAF7F2] px-10 py-4 text-[12px] uppercase tracking-[0.2em] hover:bg-[#A67B5B] transition-colors">
            Shop the Collection
          </Link>
        </div>
      </section>

      {featured.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 w-full">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-[#A67B5B] mb-2">Curated for you</p>
              <h2 className="font-serif text-4xl text-[#3E2A20]">Featured Pieces</h2>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {featured.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        </section>
      )}

      <section className="bg-[#3E2A20] text-[#FAF7F2] py-24 px-6 text-center">
        <h2 className="font-serif text-4xl md:text-5xl max-w-2xl mx-auto leading-tight mb-6">
          "Elegance is not standing out, but being remembered."
        </h2>
        <p className="text-[#C9A875] text-[11px] uppercase tracking-[0.3em]">— Our Philosophy</p>
      </section>

      {newArrivals.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 w-full">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-[#A67B5B] mb-2">Just dropped</p>
              <h2 className="font-serif text-4xl text-[#3E2A20]">New Arrivals</h2>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {newArrivals.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        </section>
      )}
    </div>
  );
}
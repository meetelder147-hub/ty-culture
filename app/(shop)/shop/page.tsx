import { prisma } from "@/lib/db";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";

export default async function ShopPage({ searchParams }: { searchParams: { c?: string } }) {
  const categorySlug = searchParams.c;
  
  const categories = await prisma.category.findMany();
  
  const products = await prisma.product.findMany({
    where: categorySlug ? { category: categorySlug } : undefined,
    orderBy: { createdAt: "desc" },
  });

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <h1 className="font-serif text-4xl text-[#3E2A20] mb-8">
        {categorySlug ? categories.find(c => c.slug === categorySlug)?.name || "Shop" : "Shop All"}
      </h1>

      {/* Dynamic Categories Filter */}
      <div className="flex flex-wrap gap-3 mb-12">
        <Link href="/shop" className={`rounded-full px-5 py-2 text-sm border transition ${!categorySlug ? 'bg-[#3E2A20] text-white border-[#3E2A20]' : 'border-[#D8C9BD] text-[#3E2A20] hover:border-[#3E2A20]'}`}>
          All
        </Link>
        {categories.map((c) => (
          <Link key={c.id} href={`/shop?c=${c.slug}`} className={`rounded-full px-5 py-2 text-sm border transition ${categorySlug === c.slug ? 'bg-[#3E2A20] text-white border-[#3E2A20]' : 'border-[#D8C9BD] text-[#3E2A20] hover:border-[#3E2A20]'}`}>
            {c.name}
          </Link>
        ))}
      </div>

      {products.length === 0 ? (
        <p className="text-[#8A7F76]">No products found.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
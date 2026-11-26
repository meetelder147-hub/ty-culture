import { prisma } from "@/lib/db";
import ProductCard from "@/components/ProductCard";

export default async function SearchPage({ searchParams }: { searchParams: { q?: string } }) {
  const query = searchParams.q || "";
  
  const products = query
    ? await prisma.product.findMany({
        where: {
          OR: [
            { name: { contains: query } },
            { description: { contains: query } },
            { category: { contains: query } },
          ],
        },
      })
    : [];

  return (
    <section className="max-w-7xl mx-auto px-6 py-16 min-h-[60vh]">
      <h1 className="font-serif text-4xl mb-8">Search</h1>
      <form className="flex gap-4 max-w-xl mb-12" action="/search" method="GET">
        <input
          type="text"
          name="q"
          defaultValue={query}
          placeholder="Search products..."
          className="flex-1 rounded-xl border border-[#D8C9BD] bg-white px-4 py-3 text-sm focus:border-[#A67B5B] focus:outline-none"
        />
        <button className="bg-[#3E2A20] text-white px-6 py-3 rounded-xl uppercase tracking-widest text-sm hover:bg-[#A67B5B] transition">
          Search
        </button>
      </form>

      {query && (
        <>
          <p className="text-sm text-[#8A7F76] mb-8">Found {products.length} results for "{query}"</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {products.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </>
      )}
    </section>
  );
}
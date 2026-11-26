import { PrismaClient } from "@prisma/client";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";

const prisma = new PrismaClient();

export default async function Home() {
  // Fetch only products marked as "featured"
  const featuredProducts = await prisma.product.findMany({
    where: { featured: true },
    take: 4, // Show up to 4 featured items
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <Hero />

      {/* Featured Products Section */}
      <section className="container-x section-y">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="label-gold mb-2">Curated for you</p>
            <h2 className="font-serif text-3xl md:text-4xl text-cacao">Featured Collection</h2>
          </div>
          <Link href="/shop" className="text-sm uppercase tracking-widest text-cacao border-b border-cacao pb-1 hover:text-gold hover:border-gold transition-colors hidden md:block">
            View All
          </Link>
        </div>

        {featuredProducts.length === 0 ? (
          <p className="text-muted text-center py-10">No featured products yet. Go to Admin to add some!</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
        
        <div className="mt-10 text-center md:hidden">
          <Link href="/shop" className="btn-outline inline-block">View All Products</Link>
        </div>
      </section>

      {/* Brand Story Section */}
      <section className="bg-sand-soft py-24">
        <div className="container-x max-w-3xl text-center">
          <p className="label-gold mb-6">The T.Y Culture Promise</p>
          <h2 className="font-serif text-3xl md:text-4xl text-cacao mb-6 leading-tight">
            "We believe that elegance shouldn't be reserved for special occasions. It belongs in your everyday."
          </h2>
          <p className="text-muted leading-relaxed mb-8">
            Every piece in our collection is carefully selected to bring a touch of luxury to your daily routine. From hand-crafted fans to premium leather bags, we curate items that make you feel beautiful, confident, and ready for the world.
          </p>
          <Link href="/about" className="btn-primary">
            Read Our Story
          </Link>
        </div>
      </section>
    </div>
  );
}
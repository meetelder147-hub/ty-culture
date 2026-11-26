import Link from "next/link";
import { Product } from "@prisma/client";
import { formatNGN } from "@/lib/settings";

export default function ProductCard({ product }: { product: Product }) {
  const img = product.images.split(",")[0]?.trim() || "/products/tote.svg";

  return (
    <Link href={`/product/${product.slug}`} className="group block">
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-[#EFE6DD]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={img}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {product.stock <= 0 && (
          <span className="absolute top-3 left-3 rounded-full bg-[#3E2A20] text-[#FAF7F2] text-[10px] uppercase tracking-[0.2em] px-3 py-1">
            Sold out
          </span>
        )}
        {product.featured && product.stock > 0 && (
          <span className="absolute top-3 left-3 rounded-full bg-[#C9A875] text-[#3E2A20] text-[10px] uppercase tracking-[0.2em] px-3 py-1">
            Featured
          </span>
        )}
      </div>
      <div className="mt-4">
        <h3 className="font-serif text-lg text-[#3E2A20] group-hover:text-[#A67B5B] transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-[#8A7F76] mt-1">{formatNGN(product.price)}</p>
      </div>
    </Link>
  );
}
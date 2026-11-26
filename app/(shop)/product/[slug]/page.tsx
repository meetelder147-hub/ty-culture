import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";
import { formatPrice } from "@/lib/config";
import AddToCart from "@/components/AddToCart";

const prisma = new PrismaClient();

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
  });

  if (!product) notFound();

  const images = product.images ? product.images.split(",") : ["/placeholder-product.jpg"];
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;

  return (
    <div className="container-x section-y">
      <div className="grid gap-12 md:grid-cols-2">
        
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-[4/5] overflow-hidden rounded-xl bg-sand-soft">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={images[0]} alt={product.name} className="h-full w-full object-cover" />
          </div>
          
          {/* Thumbnails (if multiple images exist) */}
          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-4">
              {images.map((img, idx) => (
                <div key={idx} className="aspect-square overflow-hidden rounded-lg bg-sand-soft cursor-pointer hover:opacity-80 transition-opacity">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img} alt={`${product.name} ${idx + 1}`} className="h-full w-full object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="flex flex-col justify-center">
          <p className="label-gold mb-2">{product.category.replace("-", " ")}</p>
          <h1 className="font-serif text-4xl text-cacao mb-4">{product.name}</h1>
          
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl font-medium text-cacao">{formatPrice(product.price / 100)}</span>
            {hasDiscount && (
              <span className="text-lg text-muted line-through">
                {formatPrice(product.originalPrice! / 100)}
              </span>
            )}
            {hasDiscount && (
              <span className="bg-red-100 text-red-600 text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-sm">
                Sale
              </span>
            )}
          </div>

          <p className="text-muted leading-relaxed mb-8">{product.description}</p>

          <div className="mb-8">
            <h3 className="font-medium text-cacao mb-3">Details</h3>
            <ul className="space-y-2 text-sm text-muted">
              {product.details.split(",").map((detail, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-gold"></span>
                  {detail.trim()}
                </li>
              ))}
            </ul>
          </div>

          {/* Add to Cart & WhatsApp Component */}
          <AddToCart product={product} />
          
        </div>
      </div>
    </div>
  );
}
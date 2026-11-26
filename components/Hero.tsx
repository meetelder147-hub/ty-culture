import Link from "next/link";
import { siteConfig } from "@/lib/config";

export default function Hero() {
  return (
    <section className="relative flex h-[85vh] items-center justify-center overflow-hidden bg-sand-soft px-6 text-center">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-noise opacity-50"></div>
      
      <div className="relative z-10 max-w-3xl animate-fade-up">
        <p className="label-gold mb-6">The New Collection</p>
        <h1 className="h-display-lg mb-6 text-cacao">
          {siteConfig.tagline}
        </h1>
        <p className="mx-auto max-w-lg text-sm leading-relaxed text-muted md:text-base mb-10">
          {siteConfig.description}
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/shop" className="btn-primary">
            Shop the Collection
          </Link>
          <Link href="/about" className="btn-outline">
            Our Story
          </Link>
        </div>
      </div>
    </section>
  );
}
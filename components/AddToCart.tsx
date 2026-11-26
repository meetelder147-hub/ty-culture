"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart";
import { siteConfig } from "@/lib/config";
import { MessageCircle, ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AddToCart({ product }: { product: any }) {
  const { add } = useCart();
  const router = useRouter();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    add(product.slug, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    add(product.slug, qty);
    router.push("/cart");
  };

  const handleWhatsApp = () => {
    const price = product.price / 100;
    const text = `Hello T.Y Culture! I would like to order:\n\n*${product.name}*\nQuantity: ${qty}\nPrice: ₦${(price * qty).toLocaleString()}\n\nIs this available?`;
    window.open(`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="space-y-6 border-t border-sand pt-8">
      
      {/* Quantity Selector */}
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-cacao">Quantity</span>
        <div className="flex items-center border border-sand rounded-full bg-white">
          <button 
            onClick={() => setQty(Math.max(1, qty - 1))}
            className="px-4 py-2 text-muted hover:text-cacao transition-colors"
          >-</button>
          <span className="w-8 text-center text-sm font-medium">{qty}</span>
          <button 
            onClick={() => setQty(qty + 1)}
            className="px-4 py-2 text-muted hover:text-cacao transition-colors"
          >+</button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-3">
        <button 
          onClick={handleBuyNow} 
          className="btn-primary w-full"
        >
          Buy It Now
        </button>
        
        <button 
          onClick={handleAddToCart} 
          className="btn-outline w-full flex items-center justify-center gap-2"
        >
          <ShoppingBag size={18} />
          {added ? "Added to Cart ✓" : "Add to Cart"}
        </button>

        <button 
          onClick={handleWhatsApp} 
          className="btn-wa w-full flex items-center justify-center gap-2 mt-2"
        >
          <MessageCircle size={18} />
          Order via WhatsApp
        </button>
      </div>
    </div>
  );
}
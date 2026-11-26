export default function ShippingPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-24">
      <div className="text-center mb-16">
        <p className="text-[11px] uppercase tracking-[0.3em] text-[#A67B5B] mb-4">Policies</p>
        <h1 className="font-serif text-5xl text-[#3E2A20]">Shipping & Delivery</h1>
      </div>

      <div className="space-y-8 text-[#6B5C50] leading-relaxed">
        <div>
          <h2 className="font-serif text-2xl text-[#3E2A20] mb-2">Nationwide Delivery Across Nigeria 🇳🇬</h2>
          <p>
            Shop with confidence and enjoy convenient, reliable delivery wherever you are in Nigeria. We are committed to ensuring that every order is carefully processed, securely packaged, and delivered to your doorstep with efficiency and care.
          </p>
        </div>

        <div className="bg-[#FAF7F2] p-6 rounded-2xl border border-[#E8DED5]">
          <h2 className="font-serif text-xl text-[#3E2A20] mb-2">Free Shipping</h2>
          <p>
            Enjoy complimentary shipping on orders above <strong>₦1,000,000</strong>. Customers who place orders valued at ₦1 million and above automatically qualify for free shipping, with no additional delivery charges.
          </p>
        </div>

        <div>
          <h2 className="font-serif text-2xl text-[#3E2A20] mb-2">Delivery Fees</h2>
          <p>
            For orders below ₦1 million, applicable delivery fees will be calculated based on your delivery location and communicated during checkout.
          </p>
        </div>

        <div className="text-center pt-8 border-t border-[#E8DED5]">
          <p className="text-sm uppercase tracking-widest text-[#A67B5B] font-medium">
            Nationwide Reach. Premium Service. Delivered with Care.
          </p>
        </div>
      </div>
    </div>
  );
}
export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-24">
      <div className="text-center mb-16">
        <p className="text-[11px] uppercase tracking-[0.3em] text-[#A67B5B] mb-4">About Us</p>
        <h1 className="font-serif text-5xl text-[#3E2A20] mb-6">Redefining the Way You Shop.</h1>
        <p className="text-[#6B5C50] max-w-2xl mx-auto leading-relaxed">
          Welcome to T.Y Culture, where quality, style, and exceptional shopping experiences come together.
          We are an e-commerce brand committed to making shopping more convenient, accessible, and enjoyable.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 mb-16">
        <div className="bg-white p-8 rounded-2xl border border-[#E8DED5]">
          <h2 className="font-serif text-2xl text-[#3E2A20] mb-4">Our Mission</h2>
          <p className="text-sm text-[#8A7F76] leading-relaxed">
            To provide customers with a seamless online shopping experience through quality products, competitive value, reliable service, and convenient nationwide delivery.
          </p>
        </div>
        <div className="bg-white p-8 rounded-2xl border border-[#E8DED5]">
          <h2 className="font-serif text-2xl text-[#3E2A20] mb-4">Our Vision</h2>
          <p className="text-sm text-[#8A7F76] leading-relaxed">
            To build a trusted and recognised e-commerce brand that transforms how people discover, shop for, and receive products across Nigeria and beyond.
          </p>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="font-serif text-3xl text-[#3E2A20] text-center mb-8">Why Choose T.Y Culture?</h2>
        <div className="space-y-4">
          {[
            { title: "Quality & Value", desc: "We are committed to offering products that deliver value and meet customer expectations." },
            { title: "Convenient Shopping", desc: "Discover and purchase products from the comfort of your home." },
            { title: "Nationwide Delivery", desc: "We offer delivery services across Nigeria, bringing your orders closer to you." },
            { title: "Customer Commitment", desc: "Your shopping experience and satisfaction remain important to us." },
            { title: "Secure Shopping", desc: "We aim to provide a reliable and secure shopping environment." }
          ].map((item, i) => (
            <div key={i} className="flex gap-4 p-4 bg-[#FAF7F2] rounded-xl border border-[#E8DED5]">
              <div className="w-8 h-8 rounded-full bg-[#A67B5B] text-white flex items-center justify-center flex-shrink-0 font-serif">
                {i + 1}
              </div>
              <div>
                <h3 className="font-medium text-[#3E2A20]">{item.title}</h3>
                <p className="text-sm text-[#8A7F76] mt-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center bg-[#3E2A20] text-[#FAF7F2] p-12 rounded-2xl">
        <h2 className="font-serif text-3xl mb-4">Quality. Convenience. Confidence.</h2>
        <p className="text-sm text-[#C9A875]">
          At T.Y Culture, our customers are at the heart of everything we do. We continuously strive to improve our services and strengthen customer relationships.
        </p>
      </div>
    </div>
  );
}
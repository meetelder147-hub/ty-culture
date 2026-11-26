const faqs = [
  { q: "What is T.Y Culture?", a: "T.Y Culture is an e-commerce brand offering customers a convenient platform to discover and purchase products online." },
  { q: "Where do you deliver?", a: "We offer nationwide delivery across Nigeria. Wherever you are, you can shop with T.Y Culture and have your order delivered to your preferred address." },
  { q: "Do you offer free shipping?", a: "Yes! We offer complimentary shipping on all orders above ₦1,000,000. Orders below ₦1,000,000 attract applicable delivery charges based on the customer's location." },
  { q: "How do I place an order?", a: "Simply browse our website, select your preferred products, add them to your shopping cart, proceed to checkout, provide your delivery information, and complete your payment." },
  { q: "What payment methods do you accept?", a: "Available payment methods are displayed during checkout. Customers can select from the supported payment options to complete their purchases securely." },
  { q: "How long does delivery take?", a: "Delivery timelines depend on your location, product availability, and order processing time. Estimated delivery information will be communicated during the ordering process or by our customer service team." },
  { q: "How can I track my order?", a: "Where order tracking is available, tracking information will be provided to help you monitor your shipment. You may also contact our customer support team for delivery updates." },
  { q: "Can I change or cancel my order?", a: "If you need to modify or cancel an order, contact our customer support team as soon as possible. Requests are subject to the order's processing and dispatch status." },
  { q: "What happens if I receive a damaged or incorrect item?", a: "Please contact our customer support team with your order details and clear photographs of the issue. Our team will review your complaint and guide you through the appropriate resolution under our returns policy." },
  { q: "Do you accept returns and exchanges?", a: "Returns and exchanges are subject to our Returns and Refunds Policy. Please review the policy before making a purchase or contact our support team for assistance." },
  { q: "How can I contact T.Y Culture?", a: "You can reach us through the contact information and customer support channels provided on our website. We are committed to assisting you with your enquiries and shopping needs." },
  { q: "Is shopping on T.Y Culture secure?", a: "We aim to provide a secure shopping experience and use supported payment processing solutions to help protect customer transactions." }
];

export default function FAQPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-24">
      <div className="text-center mb-16">
        <p className="text-[11px] uppercase tracking-[0.3em] text-[#A67B5B] mb-4">Support</p>
        <h1 className="font-serif text-5xl text-[#3E2A20]">Frequently Asked Questions</h1>
        <p className="text-[#8A7F76] mt-4">Find answers to common questions about shopping with T.Y Culture.</p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <div key={i} className="bg-white border border-[#E8DED5] p-6 rounded-2xl shadow-sm">
            <h3 className="font-medium text-[#3E2A20] mb-2">{i + 1}. {faq.q}</h3>
            <p className="text-sm text-[#8A7F76] leading-relaxed">{faq.a}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center bg-[#FAF7F2] p-8 rounded-2xl border border-[#E8DED5]">
        <h3 className="font-serif text-2xl text-[#3E2A20] mb-2">Still have questions?</h3>
        <p className="text-[#8A7F76] text-sm mb-6">We are happy to help. Contact our customer support team for assistance.</p>
        <a href="/contact" className="inline-block bg-[#3E2A20] text-white px-8 py-3 rounded-xl text-sm uppercase tracking-widest hover:bg-[#A67B5B] transition">
          Contact Support
        </a>
      </div>
    </div>
  );
}
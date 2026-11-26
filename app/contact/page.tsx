"use client";
import { useState, useEffect } from "react";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";

export default function ContactPage() {
  const [settings, setSettings] = useState<any>({});
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  useEffect(() => {
    fetch("/api/admin/settings").then(r => r.json()).then(d => setSettings(d));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setStatus("sent");
    setForm({ name: "", email: "", message: "" });
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-16">
      <div>
        <h1 className="font-serif text-4xl text-[#3E2A20] mb-6">Get in Touch</h1>
        <p className="text-[#8A7F76] mb-10">We would love to hear from you. Our team is available to answer any questions you have.</p>

        <div className="space-y-8">
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-full bg-[#FAF7F2] flex items-center justify-center flex-shrink-0 text-[#A67B5B]">
              <Mail size={20} />
            </div>
            <div>
              <h3 className="font-medium text-[#3E2A20]">Email Us</h3>
              <p className="text-sm text-[#8A7F76] mb-1">We aim to reply within 24 hours.</p>
              <a href={`mailto:${settings.email}`} className="text-[#3E2A20] font-medium hover:text-[#A67B5B]">{settings.email}</a>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-full bg-[#FAF7F2] flex items-center justify-center flex-shrink-0 text-[#A67B5B]">
              <Phone size={20} />
            </div>
            <div>
              <h3 className="font-medium text-[#3E2A20]">Call Us</h3>
              <p className="text-sm text-[#8A7F76] mb-1">Mon-Fri from 9am to 5pm.</p>
              <a href={`tel:${settings.phone}`} className="text-[#3E2A20] font-medium hover:text-[#A67B5B]">{settings.phone}</a>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-full bg-[#25D366]/10 flex items-center justify-center flex-shrink-0 text-[#25D366]">
              <MessageCircle size={20} />
            </div>
            <div>
              <h3 className="font-medium text-[#3E2A20]">WhatsApp</h3>
              <p className="text-sm text-[#8A7F76] mb-1">Fastest way to reach us.</p>
              <a href={`https://wa.me/${settings.whatsapp}`} target="_blank" rel="noreferrer" className="text-[#25D366] font-medium hover:underline">Chat with us now</a>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-full bg-[#FAF7F2] flex items-center justify-center flex-shrink-0 text-[#A67B5B]">
              <MapPin size={20} />
            </div>
            <div>
              <h3 className="font-medium text-[#3E2A20]">Visit Us</h3>
              <p className="text-sm text-[#8A7F76]">{settings.address}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl border border-[#E8DED5] shadow-sm">
        <h2 className="font-serif text-2xl text-[#3E2A20] mb-6">Send a Message</h2>
        {status === "sent" ? (
          <div className="bg-green-50 text-green-700 p-4 rounded-xl text-center">
            Message sent successfully! We will get back to you soon.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm mb-2">Name</label>
              <input required type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full border border-[#E8DED5] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#A67B5B]" />
            </div>
            <div>
              <label className="block text-sm mb-2">Email</label>
              <input required type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full border border-[#E8DED5] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#A67B5B]" />
            </div>
            <div>
              <label className="block text-sm mb-2">Message</label>
              <textarea required rows={5} value={form.message} onChange={e => setForm({...form, message: e.target.value})} className="w-full border border-[#E8DED5] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#A67B5B]" />
            </div>
            <button disabled={status === "sending"} className="w-full bg-[#3E2A20] text-white py-3 rounded-xl uppercase tracking-widest text-sm hover:bg-[#A67B5B] transition disabled:opacity-50">
              {status === "sending" ? "Sending..." : "Send Message"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
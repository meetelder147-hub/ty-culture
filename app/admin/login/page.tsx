"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

function getNext(): string {
  if (typeof window === "undefined") return "/admin";
  const p = new URLSearchParams(window.location.search);
  return p.get("next") || "/admin";
}

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Login failed");
        setLoading(false);
        return;
      }
      router.push(getNext());
      router.refresh();
    } catch (err: any) {
      setError(err?.message ?? "Network error");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF7F2] px-6">
      <form
        onSubmit={submit}
        className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-[0_8px_40px_rgba(58,42,32,0.08)]"
      >
        <div className="text-center mb-8">
          <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-[#A67B5B]">Admin</p>
          <h1 className="font-serif text-3xl mt-2 text-[#3E2A20]">TY Couture</h1>
        </div>

        {error && (
          <div className="mb-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-2">
            {error}
          </div>
        )}

        <label className="block text-sm text-[#3E2A20] mb-2">Email</label>
        <input
          type="email" required autoFocus value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-xl border border-[#EFE6DD] bg-white px-4 py-3 text-sm mb-4 focus:border-[#C9A875] focus:outline-none focus:ring-2 focus:ring-[#C9A875]/20"
        />

        <label className="block text-sm text-[#3E2A20] mb-2">Password</label>
        <input
          type="password" required value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-xl border border-[#EFE6DD] bg-white px-4 py-3 text-sm mb-6 focus:border-[#C9A875] focus:outline-none focus:ring-2 focus:ring-[#C9A875]/20"
        />

        <button
          disabled={loading}
          className="w-full rounded-full bg-[#3E2A20] text-[#FAF7F2] py-3 text-sm uppercase tracking-[0.3em] disabled:opacity-50"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>

        <p className="text-[11px] text-center text-[#8A7F76] mt-6">
          Default: admin@tycouture.com / admin123
        </p>
      </form>
    </div>
  );
}
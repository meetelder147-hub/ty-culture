"use client";
import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";

export type CartItem = { slug: string; qty: number };

type CartCtx = {
  items: CartItem[];
  add: (slug: string, qty?: number) => void;
  remove: (slug: string) => void;
  setQty: (slug: string, qty: number) => void;
  clear: () => void;
  count: number;
};

const Ctx = createContext<CartCtx | null>(null);
const KEY = "ty_cart_v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) localStorage.setItem(KEY, JSON.stringify(items));
  }, [items, ready]);

  const api = useMemo<CartCtx>(() => ({
    items,
    add: (slug, qty = 1) =>
      setItems((prev) => {
        const found = prev.find((i) => i.slug === slug);
        if (found) return prev.map((i) => (i.slug === slug ? { ...i, qty: i.qty + qty } : i));
        return [...prev, { slug, qty }];
      }),
    remove: (slug) => setItems((p) => p.filter((i) => i.slug !== slug)),
    setQty: (slug, qty) =>
      setItems((p) =>
        qty <= 0 ? p.filter((i) => i.slug !== slug)
                 : p.map((i) => (i.slug === slug ? { ...i, qty } : i))
      ),
    clear: () => setItems([]),
    count: items.reduce((n, i) => n + i.qty, 0),
  }), [items]);

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used within <CartProvider>");
  return c;
}
import { prisma } from "./db";

export type SiteSettings = {
  brandName: string;
  tagline: string;
  logoUrl: string;
  email: string;
  phone: string;
  whatsapp: string;
  address: string;
  instagram: string;
  tiktok: string;
  facebook: string;
  announcement: string;
  heroTitle: string;
  heroSubtitle: string;
  bankName: string;
  accountName: string;
  accountNumber: string;
  shippingFee: string;
  freeShippingOver: string;
  currency: string;
};

export const DEFAULT_SETTINGS: SiteSettings = {
  brandName: "T.Y Culture",
  tagline: "Quality. Convenience. Confidence.",
  logoUrl: "",
  email: "hello@tyculture.com",
  phone: "+2348012345678",
  whatsapp: "2348012345678",
  address: "Lagos, Nigeria",
  instagram: "https://instagram.com/tyculture",
  tiktok: "https://tiktok.com/@tyculture",
  facebook: "https://facebook.com/tyculture",
  announcement: "✦ FREE NATIONWIDE DELIVERY ON ORDERS OVER ₦1,000,000 ✦",
  heroTitle: "Redefining the\nWay You Shop.",
  heroSubtitle: "Discover carefully selected products that reflect quality, value, and modern lifestyle preferences.",
  bankName: "GTBank",
  accountName: "T.Y Culture Ltd",
  accountNumber: "0123456789",
  shippingFee: "2500",
  freeShippingOver: "1000000",
  currency: "NGN",
};

export async function getSettings(): Promise<SiteSettings> {
  try {
    const rows = await prisma.setting.findMany();
    const map = Object.fromEntries(rows.map((r) => [r.key, r.value]));
    const rawSettings = { ...DEFAULT_SETTINGS, ...map } as SiteSettings;
    rawSettings.whatsapp = rawSettings.whatsapp.replace(/\D/g, '');
    return rawSettings;
  } catch { return DEFAULT_SETTINGS; }
}

export async function updateSettings(patch: Partial<SiteSettings>) {
  const entries = Object.entries(patch).filter(([, v]) => v !== undefined);
  await Promise.all(entries.map(([key, value]) =>
    prisma.setting.upsert({ where: { key }, update: { value: String(value) }, create: { key, value: String(value) } })
  ));
}

export const formatNGN = (kobo: number) =>
  new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", minimumFractionDigits: 0 }).format(kobo / 100);
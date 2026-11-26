import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { DEFAULT_SETTINGS } from "../lib/settings";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding…");

  const passwordHash = await bcrypt.hash("admin123", 10);
  await prisma.admin.upsert({
    where: { email: "admin@tycouture.com" },
    update: {},
    create: { email: "admin@tycouture.com", passwordHash, name: "TY Admin" },
  });

  for (const [key, value] of Object.entries(DEFAULT_SETTINGS)) {
    await prisma.setting.upsert({
      where: { key },
      update: {},
      create: { key, value: String(value) },
    });
  }

  const products = [
    { name: "Signature Leather Tote",     slug: "signature-leather-tote", description: "A structured everyday tote in soft vegan leather — roomy enough for work, elegant enough for dinner.", details: "Vegan leather,Magnetic clasp,Interior zip pocket,38×30×12cm", price: 4500000, category: "bags",        images: "/products/tote.svg",     stock: 12, featured: true  },
    { name: "Silk Fold Hand Fan",         slug: "silk-fold-hand-fan",     description: "A delicate folding fan with silk leaf and bamboo ribs — a graceful way to keep cool.",               details: "Silk leaf,Bamboo ribs,Includes pouch",                     price: 1200000, category: "hand-fans",  images: "/products/fan.svg",      stock: 30, featured: true  },
    { name: "Satin Face Mask (Set of 3)", slug: "satin-face-mask-set",    description: "Soft satin face masks with adjustable ear loops — gentle on skin, kind to hair.",                     details: "3 masks per set,Adjustable loops,Washable",                 price: 500000,  category: "face-masks", images: "/products/mask.svg",     stock: 50, featured: true  },
    { name: "Mini Crossbody Bag",         slug: "mini-crossbody-bag",     description: "A compact crossbody for essentials — phone, cardholder, lipstick, done.",                              details: "Adjustable strap,Gold-tone hardware",                       price: 2200000, category: "bags",        images: "/products/mini-bag.svg", stock: 20, featured: false },
  ];

  for (const p of products) {
    await prisma.product.upsert({ where: { slug: p.slug }, update: p, create: p });
  }

  console.log("✅ Seeded. Admin: admin@tycouture.com / admin123");
}

main().catch((e) => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
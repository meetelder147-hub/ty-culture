import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { path } = await req.json();
    // In a real production app, use a GeoIP API or Vercel headers here.
    // For localhost, we just generate a random country to simulate it.
    const countries = ["Nigeria", "United Kingdom", "United States", "Ghana", "Canada"];
    const country = countries[Math.floor(Math.random() * countries.length)];
    
    await prisma.visit.create({
      data: { path, country },
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false });
  }
}
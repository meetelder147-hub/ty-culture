import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getSession } from "@/lib/auth";

const prisma = new PrismaClient();

// GET ALL PRODUCTS
export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

// CREATE A NEW PRODUCT
export async function POST(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    
    // Auto-generate a slug from the name
    const slug = body.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

    // Convert prices to Kobo
    const priceKobo = parseInt(body.price) * 100;
    // If originalPrice is provided, convert it. Otherwise, null.
    const originalPriceKobo = body.originalPrice ? parseInt(body.originalPrice) * 100 : null;

    const product = await prisma.product.create({
      data: {
        name: body.name,
        slug: slug,
        description: body.description,
        details: body.details,
        price: priceKobo,
        originalPrice: originalPriceKobo,
        category: body.category,
        images: body.images || "/placeholder-product.jpg",
        stock: parseInt(body.stock),
        featured: body.featured || false,
      },
    });
    
    return NextResponse.json(product);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}

// DELETE A PRODUCT
export async function DELETE(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    await prisma.product.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}
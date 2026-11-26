import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { items, customer, paymentMethod } = await req.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    let totalAmount = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await prisma.product.findUnique({ where: { slug: item.slug } });
      if (!product) throw new Error(`Product not found: ${item.slug}`);
      totalAmount += product.price * item.qty;
      orderItems.push({ productId: product.id, quantity: item.qty, price: product.price });
    }

    // Create order in DB (PENDING for both, admin verifies later)
    const order = await prisma.order.create({
      data: {
        customerName: customer.name,
        customerEmail: customer.email,
        customerPhone: customer.phone,
        shippingAddress: customer.address,
        totalAmount,
        status: "PENDING",
        items: { create: orderItems },
      },
    });

    // If Bank Transfer, we just return success. The user will send receipt on WhatsApp.
    if (paymentMethod === "bank") {
      return NextResponse.json({ success: true, orderId: order.id });
    }

    // If Paystack, we initialize the transaction
    try {
      const res = await fetch("https://api.paystack.co/transaction/initialize", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: customer.email,
          amount: totalAmount,
          reference: order.id,
          callback_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success?order_id=${order.id}`,
        }),
        signal: AbortSignal.timeout(10000),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Paystack error");

      return NextResponse.json({ url: data.data.authorization_url });
    } catch (fetchError: any) {
      console.error("Checkout Error:", fetchError);
      return NextResponse.json({ error: "Payment gateway timeout. Please try again." }, { status: 500 });
    }
  } catch (error: any) {
    console.error("Order Error:", error);
    return NextResponse.json({ error: error.message ?? "Server error" }, { status: 500 });
  }
}
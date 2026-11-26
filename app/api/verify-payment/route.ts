import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const reference = searchParams.get("reference");

  if (!reference) {
    return NextResponse.json({ error: "No reference provided" }, { status: 400 });
  }

  try {
    // 1. Verify with Paystack
    const res = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      },
    });

    const data = await res.json();

    if (data.status && data.data.status === "success") {
      // 2. Payment is successful! Update the order in the database
      const orderId = data.data.metadata.orderId;

      await prisma.order.update({
        where: { id: orderId },
        data: { 
          status: "PAID",
          paymentRef: reference 
        },
      });

      return NextResponse.json({ success: true, orderId });
    }

    return NextResponse.json({ error: "Payment not successful" }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}
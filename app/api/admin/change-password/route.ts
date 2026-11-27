import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { currentPassword, newPassword } = await req.json();
    
    const admin = await prisma.admin.findUnique({ where: { email: session.email } });
    if (!admin) return NextResponse.json({ error: "Admin not found" }, { status: 404 });

    const isValid = await bcrypt.compare(currentPassword, admin.passwordHash);
    if (!isValid) return NextResponse.json({ error: "Incorrect current password" }, { status: 400 });

    const hash = await bcrypt.hash(newPassword, 10);
    await prisma.admin.update({
      where: { id: admin.id },
      data: { passwordHash: hash },
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to update password" }, { status: 500 });
  }
}
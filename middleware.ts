import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(
  process.env.AUTH_SECRET || "dev-only-fallback-change-me-in-production"
);

async function isValid(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  try {
    await jwtVerify(token, secret);
    return true;
  } catch {
    return false;
  }
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Always allow login page + auth APIs
  if (pathname === "/admin/login") return NextResponse.next();
  if (pathname === "/api/auth/login" || pathname === "/api/auth/logout") return NextResponse.next();

  // Everything else under /admin or /api/admin needs a session
  const protectedArea =
    pathname.startsWith("/admin") || pathname.startsWith("/api/admin");
  if (!protectedArea) return NextResponse.next();

  const token = req.cookies.get("ty_admin")?.value;
  if (await isValid(token)) return NextResponse.next();

  // APIs get JSON 401, pages get a redirect
  if (pathname.startsWith("/api/")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const url = req.nextUrl.clone();
  url.pathname = "/admin/login";
  url.searchParams.set("next", pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
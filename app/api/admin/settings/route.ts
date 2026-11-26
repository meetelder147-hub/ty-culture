import { NextResponse } from "next/server";
import { getSettings, updateSettings, SiteSettings } from "@/lib/settings";

export async function GET() {
  const settings = await getSettings();
  return NextResponse.json(settings);
}

export async function PUT(req: Request) {
  try {
    const body = (await req.json()) as Partial<SiteSettings>;
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }
    await updateSettings(body);
    const fresh = await getSettings();
    return NextResponse.json({ ok: true, settings: fresh });
  } catch (e: any) {
    console.error("settings PUT failed:", e);
    return NextResponse.json({ error: e.message ?? "Server error" }, { status: 500 });
  }
}
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email || typeof email !== "string" || !email.includes("@")) {
    return NextResponse.json({ error: "Enter a valid email" }, { status: 400 });
  }

  await prisma.waitlistEntry.upsert({
    where: { email },
    update: {},
    create: { email, source: "hosting_coming_soon" },
  });

  return NextResponse.json({ ok: true });
}

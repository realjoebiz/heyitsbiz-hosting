import { NextRequest, NextResponse } from "next/server";
import { domainRegistry, RegistryNotConfiguredError } from "@/lib/providers/domainRegistry";

export async function GET(req: NextRequest) {
  const domain = req.nextUrl.searchParams.get("domain")?.trim().toLowerCase();

  if (!domain) {
    return NextResponse.json(
      { error: "Pass a domain to check, e.g. ?domain=example.co.uk" },
      { status: 400 }
    );
  }

  try {
    const result = await domainRegistry.checkAvailability(domain);
    return NextResponse.json(result);
  } catch (err) {
    if (err instanceof RegistryNotConfiguredError) {
      return NextResponse.json({ error: err.message }, { status: 501 });
    }
    return NextResponse.json({ error: "Availability check failed" }, { status: 502 });
  }
}

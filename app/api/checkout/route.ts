import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json(
      { error: "STRIPE_SECRET_KEY is not set — see SETUP.md #2" },
      { status: 501 }
    );
  }

  const { domain, email } = await req.json();
  if (!domain || !email) {
    return NextResponse.json({ error: "domain and email are required" }, { status: 400 });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const priceGbp = Number(process.env.DOMAIN_RETAIL_PRICE_GBP ?? "12.99");
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: email,
    line_items: [
      {
        price_data: {
          currency: "gbp",
          unit_amount: Math.round(priceGbp * 100),
          product_data: { name: `Domain registration — ${domain}` },
        },
        quantity: 1,
      },
    ],
    metadata: { domain },
    success_url: `${appUrl}/dashboard?purchased=${encodeURIComponent(domain)}`,
    cancel_url: `${appUrl}/?cancelled=1`,
  });

  return NextResponse.json({ url: session.url });
}

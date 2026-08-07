import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const signature = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!signature || !webhookSecret || !secretKey) {
    return NextResponse.json(
      { error: "Stripe webhook is not fully configured — see SETUP.md #2" },
      { status: 501 }
    );
  }

  const stripe = new Stripe(secretKey);
  const rawBody = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const domainName = session.metadata?.domain;
    const email = session.customer_email ?? session.customer_details?.email ?? undefined;

    if (domainName && email) {
      const customer = await prisma.customer.upsert({
        where: { email },
        update: {},
        create: { email },
      });

      const domain = await prisma.domain.create({
        data: {
          name: domainName,
          customerId: customer.id,
          status: "PENDING",
        },
      });

      await prisma.provisioningJob.create({
        data: {
          type: "DOMAIN_REGISTER",
          domainId: domain.id,
          payload: { domain: domainName },
        },
      });
    }
  }

  return NextResponse.json({ received: true });
}

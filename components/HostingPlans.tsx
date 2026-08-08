"use client";

import { useState } from "react";
import { CheckIcon } from "./Icons";
import { HostingWaitlist } from "./HostingWaitlist";

const YEARLY_DISCOUNT = 0.2;

const TIERS = [
  {
    name: "Starter",
    monthlyPrice: 4.99,
    blurb: "One site, done properly.",
    features: ["1 site", "Free SSL", "Cloudflare DNS included", "Coolify-managed deploys"],
  },
  {
    name: "Business",
    monthlyPrice: 9.99,
    blurb: "For sites that get real traffic.",
    features: ["Up to 5 sites", "Daily backups", "Priority support", "Staging environment"],
    recommended: true,
  },
  {
    name: "Pro",
    monthlyPrice: 19.99,
    blurb: "Dedicated resources, room to grow.",
    features: ["Unlimited sites", "Dedicated resources", "Priority support", "Custom deploy hooks"],
  },
];

export function HostingPlans() {
  const [yearly, setYearly] = useState(false);

  return (
    <section id="pricing" className="border-t border-line bg-surface py-20">
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold tracking-tight">Hosting plans</h2>
          <p className="mx-auto mt-2 max-w-xl text-inkMuted">
            Deployed on the same account as your domain, on Cloudflare DNS.
          </p>

          <div className="mx-auto mt-6 inline-flex items-center gap-1 rounded-full border border-line bg-bg p-1">
            <button
              onClick={() => setYearly(false)}
              className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
                !yearly ? "bg-primary text-white" : "text-inkMuted"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setYearly(true)}
              className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-semibold transition ${
                yearly ? "bg-primary text-white" : "text-inkMuted"
              }`}
            >
              Yearly
              <span className="rounded-full bg-accent2 px-1.5 py-0.5 text-[10px] font-bold text-slate-900">
                SAVE {YEARLY_DISCOUNT * 100}%
              </span>
            </button>
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {TIERS.map((tier) => {
            const displayPrice = yearly
              ? tier.monthlyPrice * (1 - YEARLY_DISCOUNT)
              : tier.monthlyPrice;

            return (
              <div
                key={tier.name}
                className={`relative flex flex-col rounded-2xl p-8 transition hover:-translate-y-1.5 hover:shadow-2xl ${
                  tier.recommended
                    ? "bg-ink text-white shadow-xl md:scale-105"
                    : "border border-line bg-bg text-ink hover:shadow-xl"
                }`}
              >
                {tier.recommended && (
                  <span className="absolute -top-3 left-8 rounded-full bg-accent2 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-900">
                    Recommended
                  </span>
                )}
                <h3 className="text-lg font-semibold">{tier.name}</h3>
                <p className={`mt-1 text-sm ${tier.recommended ? "text-white/70" : "text-inkMuted"}`}>
                  {tier.blurb}
                </p>
                <p className="mt-5 font-mono text-3xl font-bold">
                  £{displayPrice.toFixed(2)}
                  <span className={`text-base font-normal ${tier.recommended ? "text-white/70" : "text-inkMuted"}`}>
                    /mo
                  </span>
                </p>
                {yearly && (
                  <p className={`mt-1 text-xs ${tier.recommended ? "text-white/60" : "text-inkMuted"}`}>
                    billed £{(displayPrice * 12).toFixed(2)} yearly
                  </p>
                )}
                <ul className="mt-6 flex flex-col gap-3 text-sm">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2.5">
                      <CheckIcon
                        className={`h-4 w-4 shrink-0 ${tier.recommended ? "text-accent2" : "text-green"}`}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
                <a
                  href="#get-hosting"
                  className={`mt-8 rounded-xl py-3 text-center text-sm font-semibold transition ${
                    tier.recommended
                      ? "bg-accent2 text-slate-900 hover:bg-accent2/90"
                      : "bg-primary text-white hover:bg-primaryDark"
                  }`}
                >
                  Get started
                </a>
              </div>
            );
          })}
        </div>

        <div id="get-hosting" className="mx-auto mt-16 max-w-md scroll-mt-24 text-center">
          <h3 className="text-lg font-semibold">Get early access</h3>
          <p className="mt-1 text-sm text-inkMuted">
            Leave your email and you'll be first in line when hosting opens.
          </p>
          <div className="mt-5">
            <HostingWaitlist />
          </div>
        </div>
      </div>
    </section>
  );
}

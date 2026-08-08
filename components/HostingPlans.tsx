import { CheckIcon } from "./Icons";
import { HostingWaitlist } from "./HostingWaitlist";

const TIERS = [
  {
    name: "Starter",
    price: "£4.99",
    blurb: "One site, done properly.",
    features: ["1 site", "Free SSL", "Cloudflare DNS included", "Coolify-managed deploys"],
  },
  {
    name: "Business",
    price: "£9.99",
    blurb: "For sites that get real traffic.",
    features: ["Up to 5 sites", "Daily backups", "Priority support", "Staging environment"],
    recommended: true,
  },
  {
    name: "Pro",
    price: "£19.99",
    blurb: "Dedicated resources, room to grow.",
    features: ["Unlimited sites", "Dedicated resources", "Priority support", "Custom deploy hooks"],
  },
];

export function HostingPlans() {
  return (
    <section id="pricing" className="border-t border-line bg-surface py-20">
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold tracking-tight">Hosting plans</h2>
          <p className="mx-auto mt-2 max-w-xl text-inkMuted">
            Deployed on the same account as your domain, on Cloudflare DNS.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {TIERS.map((tier) => (
            <div
              key={tier.name}
              className={`relative flex flex-col rounded-2xl bg-bg p-8 transition hover:-translate-y-1.5 hover:shadow-xl ${
                tier.recommended ? "border-2 border-accent2 shadow-lg" : "border border-line"
              }`}
            >
              {tier.recommended && (
                <span className="absolute -top-3 left-8 rounded-full bg-accent2 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-900">
                  Recommended
                </span>
              )}
              <h3 className="text-lg font-semibold">{tier.name}</h3>
              <p className="mt-1 text-sm text-inkMuted">{tier.blurb}</p>
              <p className="mt-5 font-mono text-3xl font-bold text-ink">
                {tier.price}
                <span className="text-base font-normal text-inkMuted">/mo</span>
              </p>
              <ul className="mt-6 flex flex-col gap-3 text-sm text-ink">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2.5">
                    <CheckIcon className="h-4 w-4 shrink-0 text-green" />
                    {feature}
                  </li>
                ))}
              </ul>
              <a
                href="#get-hosting"
                className={`mt-8 rounded-xl py-3 text-center text-sm font-semibold transition ${
                  tier.recommended
                    ? "bg-accent2 text-slate-900 hover:bg-accent2/90"
                    : "bg-ink text-white hover:bg-primary"
                }`}
              >
                Get started
              </a>
            </div>
          ))}
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

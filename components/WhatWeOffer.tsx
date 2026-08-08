import { GlobeIcon, LayersIcon, ServerIcon, UsersIcon, CheckIcon } from "./Icons";

const CATEGORIES = [
  {
    icon: GlobeIcon,
    name: "Domains",
    blurb: "Search, register, and manage a domain in one place.",
    features: ["WHOIS privacy included", "Cloudflare DNS", "Renewal price shown up front"],
  },
  {
    icon: LayersIcon,
    name: "Web Hosting",
    blurb: "Deploy any site on infrastructure you can actually check.",
    features: ["Deployed with Coolify", "Free SSL on every site", "Daily backups"],
  },
  {
    icon: LayersIcon,
    name: "WordPress Hosting",
    blurb: "Managed WordPress without the bloat.",
    features: ["One-click install", "Automatic updates", "Staging environment"],
  },
  {
    icon: ServerIcon,
    name: "Managed Servers",
    blurb: "Your own resources on Hetzner infrastructure.",
    features: ["Full root access", "Scale CPU and RAM on demand", "Priority support"],
  },
  {
    icon: UsersIcon,
    name: "Reseller Hosting",
    blurb: "White-label hosting for agencies and freelancers.",
    features: ["Your branding, not ours", "Manage every client from one account", "Bulk pricing"],
  },
];

export function WhatWeOffer() {
  return (
    <section id="hosting" className="dot-grid py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold tracking-tight">Everything to get online</h2>
          <p className="mx-auto mt-3 max-w-xl text-lg text-inkMuted">
            One account for the domain and everything you build on it.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map(({ icon: Icon, name, blurb, features }) => (
            <div
              key={name}
              className="rounded-2xl border border-line bg-bg p-7 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{name}</h3>
              <p className="mt-1 text-sm text-inkMuted">{blurb}</p>
              <ul className="mt-4 flex flex-col gap-2 text-sm">
                {features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-ink">
                    <CheckIcon className="h-3.5 w-3.5 shrink-0 text-green" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

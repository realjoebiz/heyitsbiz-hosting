import { GlobeIcon, LayersIcon, ServerIcon, UsersIcon, CheckIcon } from "./Icons";

const CATEGORIES = [
  {
    icon: GlobeIcon,
    name: "Domains",
    blurb: "Search, register, and manage a domain in one place.",
    features: ["WHOIS privacy included", "Cloudflare DNS", "Renewal price shown up front"],
    span: "lg:col-span-2 lg:row-span-2",
    featured: true,
  },
  {
    icon: LayersIcon,
    name: "Web Hosting",
    blurb: "Deploy any site on infrastructure you can actually check.",
    features: ["Deployed with Coolify", "Free SSL on every site", "Daily backups"],
    span: "lg:col-span-2",
  },
  {
    icon: LayersIcon,
    name: "WordPress Hosting",
    blurb: "Managed WordPress without the bloat.",
    features: ["One-click install", "Automatic updates"],
    span: "lg:col-span-1",
  },
  {
    icon: ServerIcon,
    name: "Managed Servers",
    blurb: "Your own resources on Hetzner infrastructure.",
    features: ["Full root access", "Scale on demand"],
    span: "lg:col-span-1",
  },
  {
    icon: UsersIcon,
    name: "Reseller Hosting",
    blurb: "White-label hosting for agencies and freelancers.",
    features: ["Your branding, not ours", "Manage every client from one account"],
    span: "lg:col-span-2",
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

        <div className="mt-14 grid gap-5 lg:grid-flow-dense lg:grid-cols-4">
          {CATEGORIES.map(({ icon: Icon, name, blurb, features, span, featured }) => (
            <div
              key={name}
              className={`flex flex-col rounded-2xl p-7 transition hover:-translate-y-1 hover:shadow-xl ${span} ${
                featured
                  ? "bg-surfaceInverse text-white ring-1 ring-primary/40"
                  : "border border-line bg-bg text-ink hover:shadow-lg"
              }`}
            >
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                  featured ? "bg-white/10 text-accent2" : "bg-primary/10 text-primary"
                }`}
              >
                <Icon className="h-5 w-5" />
              </div>
              <h3 className={`mt-4 text-lg font-semibold ${featured ? "text-white" : ""}`}>
                {name}
              </h3>
              <p className={`mt-1 text-sm ${featured ? "text-white/70" : "text-inkMuted"}`}>
                {blurb}
              </p>
              <ul className="mt-4 flex flex-col gap-2 text-sm">
                {features.map((feature) => (
                  <li
                    key={feature}
                    className={`flex items-center gap-2 ${featured ? "text-white/90" : "text-ink"}`}
                  >
                    <CheckIcon
                      className={`h-3.5 w-3.5 shrink-0 ${featured ? "text-accent2" : "text-green"}`}
                    />
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

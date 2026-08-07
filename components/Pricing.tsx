import { CheckIcon } from "./Icons";

const DOMAIN_INCLUDES = ["WHOIS privacy included", "Cloudflare DNS", "Renewal price shown up front"];
const HOSTING_PREVIEW = ["Deploys with Coolify", "Same account as your domain", "No date fixed yet"];

// Server component — reads the same env var the checkout route actually
// charges, so this copy can't drift from what customers are billed.
export function Pricing() {
  const priceGbp = Number(process.env.DOMAIN_RETAIL_PRICE_GBP ?? "12.99");

  return (
    <section id="plans" className="border-t border-line py-20">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Plans</h2>
          <p className="mt-2 text-inkMuted">What's live today, and what's coming next.</p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <div className="relative rounded-2xl border-2 border-primary bg-bg p-8 shadow-lg">
            <span className="absolute -top-3 left-8 rounded-full bg-primary px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
              Live now
            </span>
            <h3 className="text-lg font-semibold">Domain registration</h3>
            <p className="mt-3 font-mono text-4xl font-bold text-ink">
              £{priceGbp.toFixed(2)}
              <span className="text-base font-normal text-inkMuted">/yr</span>
            </p>
            <ul className="mt-6 flex flex-col gap-3 text-sm text-ink">
              {DOMAIN_INCLUDES.map((item) => (
                <li key={item} className="flex items-center gap-2.5">
                  <CheckIcon className="h-4 w-4 shrink-0 text-green" />
                  {item}
                </li>
              ))}
            </ul>
            <a
              href="#domains"
              className="mt-8 block rounded-xl bg-primary py-3 text-center text-sm font-semibold text-white transition hover:bg-primaryDark"
            >
              Search a domain
            </a>
          </div>

          <div className="relative rounded-2xl border border-line bg-surface p-8">
            <span className="absolute -top-3 left-8 rounded-full bg-ink px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
              Coming soon
            </span>
            <h3 className="text-lg font-semibold">Hosting</h3>
            <p className="mt-3 text-4xl font-bold text-inkMuted">—</p>
            <ul className="mt-6 flex flex-col gap-3 text-sm text-inkMuted">
              {HOSTING_PREVIEW.map((item) => (
                <li key={item} className="flex items-center gap-2.5">
                  <CheckIcon className="h-4 w-4 shrink-0 text-inkMuted" />
                  {item}
                </li>
              ))}
            </ul>
            <a
              href="#hosting"
              className="mt-8 block rounded-xl border border-line py-3 text-center text-sm font-semibold text-ink transition hover:border-primary hover:text-primary"
            >
              Join the waitlist
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

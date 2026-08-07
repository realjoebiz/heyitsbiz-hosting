import { ShieldIcon, BoltIcon, HeadsetIcon } from "./Icons";
import { HeroGraphic } from "./HeroGraphic";

const CHIPS = [
  { icon: ShieldIcon, label: "Cloudflare DNS" },
  { icon: BoltIcon, label: "Transparent pricing" },
  { icon: HeadsetIcon, label: "Direct support" },
];

export function Hero() {
  return (
    <section className="hero-gradient relative overflow-hidden pb-28 pt-20 text-white sm:pt-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-2">
        <div>
          <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl">
            Your domain, sorted in minutes.
          </h1>
          <p className="mt-5 max-w-lg text-lg text-white/85">
            Search, register, and manage your domain from one place. Hosting for what
            you build is on the way, in the same account.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#find-a-domain"
              className="rounded-xl bg-white px-7 py-3.5 text-sm font-semibold text-primary transition hover:bg-white/90"
            >
              Find your domain
            </a>
            <a
              href="#hosting"
              className="rounded-xl border border-white/40 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              See hosting plans
            </a>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            {CHIPS.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="flex items-center gap-1.5 rounded-full bg-white/15 px-3.5 py-1.5 text-sm"
              >
                <Icon className="h-4 w-4" />
                {label}
              </span>
            ))}
          </div>
        </div>

        <HeroGraphic />
      </div>

      <svg
        className="absolute inset-x-0 bottom-0 text-bg"
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d="M0 60L1440 60L1440 0C1160 40 800 40 720 20C640 0 280 0 0 30Z" fill="currentColor" />
      </svg>
    </section>
  );
}

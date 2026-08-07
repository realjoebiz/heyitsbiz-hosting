import { ShieldIcon, BoltIcon, HeadsetIcon, TagIcon } from "./Icons";

const FEATURES = [
  {
    icon: ShieldIcon,
    title: "Cloudflare DNS",
    body: "Your nameservers run on Cloudflare's network, not a budget DNS box we run ourselves.",
  },
  {
    icon: TagIcon,
    title: "One flat price",
    body: "£ shown before you pay, every time — the checkout total is the total.",
  },
  {
    icon: HeadsetIcon,
    title: "Direct support",
    body: "A small, independent operation. If something's wrong, you reach the person who can fix it.",
  },
  {
    icon: BoltIcon,
    title: "New, and upfront about it",
    body: "Hosting isn't live yet. You'll find honest status on this page, not marketing gloss.",
  },
];

const PROVIDERS = ["Cloudflare", "Stripe", "Coolify"];

export function TrustSignals() {
  return (
    <section className="border-t border-line bg-surface py-20">
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Built plainly</h2>
          <p className="mt-2 text-inkMuted">No feature you can't check for yourself.</p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map(({ icon: Icon, title, body }) => (
            <div key={title} className="rounded-2xl bg-bg p-6 shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-inkMuted">{body}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center gap-3">
          <p className="text-xs font-medium uppercase tracking-wide text-inkMuted">
            Built on infrastructure you can verify
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {PROVIDERS.map((name) => (
              <span
                key={name}
                className="rounded-full border border-line px-4 py-1.5 text-sm font-medium text-ink"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

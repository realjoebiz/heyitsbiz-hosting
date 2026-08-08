import { FeatureIllustration } from "./FeatureIllustration";

const BLOCKS = [
  {
    variant: "search" as const,
    title: "Search and register in minutes",
    body: "Type a name, see if it's free, register it — no account maze before you can even check.",
  },
  {
    variant: "price" as const,
    title: "One flat price",
    body: "The price on the page is the price at checkout. Stripe shows the total before you pay, always.",
  },
  {
    variant: "support" as const,
    title: "Direct support",
    body: "You reach the person who can actually fix your problem — not a ticket queue.",
  },
];

const PROVIDERS = ["Cloudflare", "Stripe", "Coolify"];

export function TrustSignals() {
  return (
    <section className="border-t border-line py-20">
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold tracking-tight">Built plainly</h2>
          <p className="mt-2 text-inkMuted">No feature you can't check for yourself.</p>
        </div>

        <div className="mt-14 flex flex-col gap-16">
          {BLOCKS.map((block, i) => (
            <div
              key={block.title}
              className={`flex flex-col items-center gap-8 sm:flex-row ${
                i % 2 === 1 ? "sm:flex-row-reverse" : ""
              }`}
            >
              <FeatureIllustration
                variant={block.variant}
                className="w-40 shrink-0 transition duration-300 hover:-translate-y-1 hover:rotate-1 sm:w-48"
              />
              <div className="text-center sm:text-left">
                <h3 className="text-xl font-semibold">{block.title}</h3>
                <p className="mt-2 max-w-md text-inkMuted">{block.body}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center gap-3 border-t border-line pt-10">
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

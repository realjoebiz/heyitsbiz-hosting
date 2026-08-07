const STAGES = [
  {
    label: "Just starting out",
    title: "Get a name",
    body: "Search and register your domain. Point it wherever you're already hosting.",
    href: "#find-a-domain",
    cta: "Search a domain",
  },
  {
    label: "Building something",
    title: "Add hosting",
    body: "Deploy on the same account once web hosting lands — no second signup, no second bill.",
    href: "#hosting",
    cta: "See what's coming",
  },
  {
    label: "Outgrowing shared hosting",
    title: "Move to your own server",
    body: "Managed servers on Hetzner infrastructure, for when a shared plan isn't enough.",
    href: "#hosting",
    cta: "Join the waitlist",
  },
];

export function GrowthPath() {
  return (
    <section className="border-t border-line bg-surface py-20">
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Start small. Scale when you need to.</h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {STAGES.map((stage, i) => (
            <div key={stage.title} className="relative rounded-2xl bg-bg p-8">
              <span className="font-mono text-sm text-primary">0{i + 1}</span>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-inkMuted">
                {stage.label}
              </p>
              <h3 className="mt-3 text-lg font-semibold">{stage.title}</h3>
              <p className="mt-2 text-sm text-inkMuted">{stage.body}</p>
              <a href={stage.href} className="mt-5 inline-block text-sm font-semibold text-primary hover:underline">
                {stage.cta} →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

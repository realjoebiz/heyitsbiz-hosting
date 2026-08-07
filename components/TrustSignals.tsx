const POINTS = [
  {
    title: "DNS on Cloudflare",
    body: "Your domain's nameservers run on Cloudflare's network, not a budget DNS box we run ourselves.",
  },
  {
    title: "Run directly, not a call centre",
    body: "Hosting by Biz is a small, independent operation. If something's wrong, you're not filed into a queue.",
  },
  {
    title: "New, and upfront about it",
    body: "This is a new service. Hosting isn't live yet — you'll find honest status on this page, not marketing gloss.",
  },
];

export function TrustSignals() {
  return (
    <section className="border-t border-line">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <ul className="grid gap-8 sm:grid-cols-3">
          {POINTS.map((point) => (
            <li key={point.title}>
              <h3 className="font-display text-lg">{point.title}</h3>
              <p className="mt-2 text-sm text-inkMuted">{point.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

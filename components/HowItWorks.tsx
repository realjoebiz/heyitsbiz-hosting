const STEPS = [
  {
    n: "1",
    title: "Search your name",
    body: "Type what you want above. You'll see instantly whether it's free.",
  },
  {
    n: "2",
    title: "Register it",
    body: "Pay once, at the price shown. We handle the paperwork with the registry.",
  },
  {
    n: "3",
    title: "Point it anywhere",
    body: "Use it with hosting you already have, or wait for ours — same account, either way.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="border-t border-line">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <h2 className="font-display text-2xl font-medium">How it works</h2>
        <ol className="mt-8 grid gap-8 sm:grid-cols-3">
          {STEPS.map((step) => (
            <li key={step.n} className="flex flex-col gap-2">
              <span className="font-mono text-sm text-accentDeep">{step.n}</span>
              <h3 className="font-display text-lg">{step.title}</h3>
              <p className="text-sm text-inkMuted">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

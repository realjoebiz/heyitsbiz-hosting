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
    <section className="py-20">
      <div className="mx-auto max-w-4xl px-6">
        <h2 className="text-center text-4xl font-extrabold tracking-tight">How it works</h2>
        <ol className="mt-12 grid gap-10 sm:grid-cols-3">
          {STEPS.map((step) => (
            <li key={step.n} className="text-center transition hover:-translate-y-1">
              <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-primary font-mono text-sm font-bold text-white">
                {step.n}
              </span>
              <h3 className="mt-4 font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm text-inkMuted">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

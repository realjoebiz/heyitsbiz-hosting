const ITEMS = [
  {
    q: "Is this a big company?",
    a: "No. Hosting by Biz is a small, independent operation — that's a deliberate choice, not a limitation.",
  },
  {
    q: "What happens to my domain if something happens to Hosting by Biz?",
    a: "Your domain is registered through our wholesale registry partner, an established provider — Hosting by Biz manages the account on top, the same as any reseller. The registration itself doesn't depend on us staying online.",
  },
  {
    q: "Which domain endings can I register?",
    a: "Most common UK and international endings — .co.uk, .com, .org, .uk and more — with the list growing as we add them.",
  },
  {
    q: "When does hosting launch?",
    a: "No fixed date yet. Leave your email below and you'll be told the day it opens, not before.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="border-t border-line">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <h2 className="font-display text-2xl font-medium">Questions</h2>
        <dl className="mt-8 flex flex-col divide-y divide-line">
          {ITEMS.map((item) => (
            <div key={item.q} className="py-5 first:pt-0">
              <dt className="font-display text-lg">{item.q}</dt>
              <dd className="mt-2 text-sm text-inkMuted">{item.a}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

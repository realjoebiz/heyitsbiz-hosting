const ITEMS = [
  {
    q: "What happens to my domain if I ever need to move it?",
    a: "Domains are registered through our wholesale registry partner and follow standard transfer rules — you're never locked in, and the registration doesn't depend on any single company staying online.",
  },
  {
    q: "Which domain endings can I register?",
    a: "Most common UK and international endings — .co.uk, .com, .org, .uk and more, with the list growing.",
  },
  {
    q: "How do I get access to hosting?",
    a: "Join the list on the pricing section above — you'll get early access as plans open up.",
  },
  {
    q: "Do you charge anything I haven't agreed to?",
    a: "No. Checkout shows the total before you pay, and that's the total. No renewal surprises, no upsells buried at the last step.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="py-20">
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="text-center text-4xl font-extrabold tracking-tight">Questions</h2>
        <dl className="mx-auto mt-10 flex max-w-2xl flex-col divide-y divide-line">
          {ITEMS.map((item) => (
            <div key={item.q} className="py-6 first:pt-0">
              <dt className="text-lg font-semibold">{item.q}</dt>
              <dd className="mt-2 text-inkMuted">{item.a}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

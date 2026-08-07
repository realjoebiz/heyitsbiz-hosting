const CASES = [
  {
    name: "Solo & side projects",
    body: "Register a name for the thing you're building before someone else does. No commitment beyond the domain itself.",
  },
  {
    name: "Small businesses",
    body: "A proper domain and, soon, hosting — without a call centre or a maze of upsells at checkout.",
  },
  {
    name: "Agencies & freelancers",
    body: "Managing a client's domain shouldn't need a sales call. Search, register, done — reseller options under consideration.",
  },
];

export function UseCases() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Who this is for</h2>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {CASES.map((item) => (
            <div key={item.name} className="rounded-2xl border border-line p-6">
              <h3 className="font-semibold">{item.name}</h3>
              <p className="mt-2 text-sm text-inkMuted">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

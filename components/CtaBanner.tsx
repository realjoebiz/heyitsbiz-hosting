export function CtaBanner() {
  return (
    <section className="border-t border-line bg-ink py-16 text-center text-white">
      <div className="mx-auto max-w-2xl px-6">
        <h2 className="text-3xl font-bold">Ready to register your domain?</h2>
        <p className="mt-3 text-white/70">Search above, register in minutes, one flat price.</p>
        <a
          href="#domains"
          className="mt-8 inline-block rounded-xl bg-primary px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-primaryDark"
        >
          Search a domain
        </a>
      </div>
    </section>
  );
}

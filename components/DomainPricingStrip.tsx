const TLDS = [".co.uk", ".com", ".org", ".uk"];

// Server component — same env var the checkout route charges.
export function DomainPricingStrip() {
  const priceGbp = Number(process.env.DOMAIN_RETAIL_PRICE_GBP ?? "12.99");

  return (
    <section className="pt-32">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <p className="text-sm font-medium text-inkMuted">
          One flat price, same for every extension we support right now
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          {TLDS.map((tld) => (
            <div
              key={tld}
              className="flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-sm"
            >
              <span className="font-mono font-semibold text-ink">{tld}</span>
              <span className="text-inkMuted">£{priceGbp.toFixed(2)}/yr</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

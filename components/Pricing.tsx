// Server component — reads the same env var the checkout route actually
// charges, so this copy can't drift from what customers are billed.
export function Pricing() {
  const priceGbp = Number(process.env.DOMAIN_RETAIL_PRICE_GBP ?? "12.99");

  return (
    <section id="pricing" className="border-t border-line bg-surface2">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <h2 className="font-display text-2xl font-medium">Pricing</h2>
        <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-4xl text-ink">£{priceGbp.toFixed(2)}</p>
            <p className="mt-1 text-sm text-inkMuted">per year, flat, while we're getting started</p>
          </div>
          <p className="max-w-xs text-sm text-inkMuted">
            One price, shown before you pay — Stripe Checkout shows the total up front,
            no surprise line items added after.
          </p>
        </div>
      </div>
    </section>
  );
}

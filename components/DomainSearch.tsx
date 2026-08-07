"use client";

import { useState } from "react";
import { CheckIcon } from "./Icons";

interface AvailabilityResult {
  domain: string;
  available: boolean;
  priceGbp: number;
}

type Status = "idle" | "loading" | "result" | "unconfigured" | "error";

const TLDS = [".co.uk", ".com", ".org", ".uk"];

// priceGbp is passed from the server-rendered parent, read from the same
// DOMAIN_RETAIL_PRICE_GBP env var the checkout route charges — a client
// component can't read a non-NEXT_PUBLIC_ env var itself, and duplicating
// it into a second env var would let the display price drift from billing.
export function DomainSearch({ priceGbp }: { priceGbp: number }) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [result, setResult] = useState<AvailabilityResult | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [showEmailField, setShowEmailField] = useState(false);
  const [email, setEmail] = useState("");
  const [buying, setBuying] = useState(false);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const domain = query.trim().toLowerCase();
    if (!domain) return;

    setStatus("loading");
    setResult(null);
    setMessage(null);
    setShowEmailField(false);

    try {
      const res = await fetch(`/api/domains/search?domain=${encodeURIComponent(domain)}`);
      const body = await res.json();

      if (res.status === 501) {
        setStatus("unconfigured");
        setMessage("Registration is being finished on the back end right now — check back soon.");
        return;
      }
      if (!res.ok) {
        setStatus("error");
        setMessage(body.error ?? "Search failed — try again.");
        return;
      }

      setResult(body);
      setStatus("result");
    } catch {
      setStatus("error");
      setMessage("Search failed — check your connection and try again.");
    }
  }

  async function handleCheckout(e: React.FormEvent) {
    e.preventDefault();
    if (!result || !email.trim()) return;

    setBuying(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domain: result.domain, email: email.trim() }),
      });
      const body = await res.json();
      if (!res.ok) {
        setMessage(body.error ?? "Checkout failed — try again.");
        return;
      }
      window.location.href = body.url;
    } finally {
      setBuying(false);
    }
  }

  return (
    <section id="find-a-domain" className="relative -mt-16 px-6 pb-20">
      <div className="mx-auto max-w-2xl">
        <div className="rounded-2xl bg-white p-6 shadow-xl ring-1 ring-line sm:p-8">
          <h2 className="text-2xl font-bold text-ink">Find your domain name</h2>
          <p className="mt-1 text-sm text-inkMuted">
            Every great website needs a great name — search below.
          </p>

          <form onSubmit={handleSearch} className="mt-6 flex flex-col gap-3 sm:flex-row">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="example.co.uk"
              autoComplete="off"
              spellCheck={false}
              className="flex-1 rounded-xl border border-line px-4 py-3.5 font-mono text-base text-ink outline-none focus:border-primary"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-primaryDark disabled:opacity-50"
            >
              {status === "loading" ? "Checking…" : "Search domain"}
            </button>
          </form>

          {status === "result" && result && (
            <div className="mt-5 flex flex-wrap items-center gap-4 border-t border-line pt-5">
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                  result.available ? "bg-green/10 text-green" : "bg-red/10 text-red"
                }`}
              >
                <CheckIcon className="h-5 w-5" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-mono text-base text-ink">{result.domain}</p>
                <p className={`text-sm ${result.available ? "text-green" : "text-red"}`}>
                  {result.available ? `Available — £${result.priceGbp.toFixed(2)}/yr` : "Already registered"}
                </p>
              </div>
              {result.available && !showEmailField && (
                <button
                  onClick={() => setShowEmailField(true)}
                  className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primaryDark"
                >
                  Register
                </button>
              )}
            </div>
          )}

          {(status === "unconfigured" || status === "error") && message && (
            <p className="mt-5 border-t border-line pt-5 text-left text-sm text-inkMuted">{message}</p>
          )}

          {status === "result" && result?.available && showEmailField && (
            <form
              onSubmit={handleCheckout}
              className="mt-5 flex flex-col gap-3 border-t border-line pt-5 sm:flex-row sm:items-end"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="flex-1 rounded-xl border border-line px-4 py-3 text-base text-ink outline-none focus:border-primary"
              />
              <button
                type="submit"
                disabled={buying}
                className="rounded-xl bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary disabled:opacity-50"
              >
                {buying ? "Redirecting…" : "Continue to payment"}
              </button>
            </form>
          )}
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {TLDS.map((tld) => (
            <div
              key={tld}
              className="flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-sm"
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

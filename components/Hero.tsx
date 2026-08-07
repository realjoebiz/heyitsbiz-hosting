"use client";

import { useState } from "react";
import { SealMark } from "./SealMark";

interface AvailabilityResult {
  domain: string;
  available: boolean;
  priceGbp: number;
}

type Status = "idle" | "loading" | "result" | "unconfigured" | "error";

export function Hero() {
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
        setMessage(
          "Registration is being finished on the back end right now — check back soon."
        );
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
    <section className="mx-auto max-w-3xl px-6 pb-20 pt-16 sm:pt-24">
      <h1 className="font-display text-4xl font-medium leading-[1.1] sm:text-5xl">
        Search a domain.
        <br />
        Register it in minutes.
      </h1>
      <p className="mt-5 max-w-xl text-lg text-inkMuted">
        Straightforward domain registration today. Hosting for what you build lands
        soon, in the same place — see below.
      </p>

      <form onSubmit={handleSearch} className="mt-10 flex items-end gap-4 sm:max-w-md">
        <div className="flex-1">
          <label htmlFor="domain" className="block text-xs uppercase tracking-wide text-inkMuted">
            Domain name
          </label>
          <input
            id="domain"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="example.co.uk"
            className="ledger-input mt-2 w-full py-2 font-mono text-lg text-ink placeholder:text-inkMuted/60"
            autoComplete="off"
            spellCheck={false}
          />
        </div>
        <button
          type="submit"
          disabled={status === "loading"}
          className="shrink-0 bg-ink px-5 py-2.5 font-body text-sm font-medium text-paper transition hover:bg-accentDeep disabled:opacity-50"
        >
          {status === "loading" ? "Checking…" : "Search"}
        </button>
      </form>

      <div className="mt-6 min-h-[3.5rem]">
        {status === "result" && result && (
          <div className="flex flex-wrap items-center gap-4 border-t border-line pt-5">
            <SealMark
              className={`stamp h-9 w-9 shrink-0 ${
                result.available ? "text-approve" : "text-reject"
              }`}
            />
            <div className="flex-1">
              <p className="font-mono text-base">{result.domain}</p>
              <p className={`text-sm ${result.available ? "text-accentDeep" : "text-reject"}`}>
                {result.available
                  ? `Available — £${result.priceGbp.toFixed(2)}/yr`
                  : "Already registered"}
              </p>
            </div>
            {result.available && !showEmailField && (
              <button
                onClick={() => setShowEmailField(true)}
                className="bg-accent px-5 py-2.5 text-sm font-medium text-paper transition hover:bg-accentDeep"
              >
                Register this domain
              </button>
            )}
          </div>
        )}

        {(status === "unconfigured" || status === "error") && message && (
          <p className="border-t border-line pt-5 text-sm text-inkMuted">{message}</p>
        )}
      </div>

      {status === "result" && result?.available && showEmailField && (
        <form
          onSubmit={handleCheckout}
          className="mt-2 flex flex-wrap items-end gap-4 border-t border-line pt-5"
        >
          <div className="flex-1 sm:max-w-xs">
            <label htmlFor="email" className="block text-xs uppercase tracking-wide text-inkMuted">
              Email, for the receipt and account
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="ledger-input mt-2 w-full py-2 font-body text-base text-ink"
            />
          </div>
          <button
            type="submit"
            disabled={buying}
            className="shrink-0 bg-ink px-5 py-2.5 text-sm font-medium text-paper transition hover:bg-accentDeep disabled:opacity-50"
          >
            {buying ? "Redirecting…" : "Continue to payment"}
          </button>
        </form>
      )}
    </section>
  );
}

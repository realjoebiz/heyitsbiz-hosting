"use client";

import { useState } from "react";
import { ShieldIcon, BoltIcon, HeadsetIcon, CheckIcon } from "./Icons";

interface AvailabilityResult {
  domain: string;
  available: boolean;
  priceGbp: number;
}

type Status = "idle" | "loading" | "result" | "unconfigured" | "error";

const TLDS = [".co.uk", ".com", ".org", ".uk"];

const CHIPS = [
  { icon: ShieldIcon, label: "Cloudflare DNS" },
  { icon: BoltIcon, label: "Transparent pricing" },
  { icon: HeadsetIcon, label: "Direct support" },
];

// priceGbp comes from the server-rendered parent — read from the same
// DOMAIN_RETAIL_PRICE_GBP env var the checkout route actually charges.
export function Hero({ priceGbp }: { priceGbp: number }) {
  const [name, setName] = useState("");
  const [tld, setTld] = useState(TLDS[0]);
  const [status, setStatus] = useState<Status>("idle");
  const [result, setResult] = useState<AvailabilityResult | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [showEmailField, setShowEmailField] = useState(false);
  const [email, setEmail] = useState("");
  const [buying, setBuying] = useState(false);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = name.trim().toLowerCase();
    if (!trimmed) return;
    const domain = `${trimmed}${tld}`;

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
    <section id="find-a-domain" className="relative pb-16 pt-24 sm:pt-32">
      <div className="hero-glow" aria-hidden="true" />

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <span className="inline-block rounded-full border border-line bg-surface px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-primary">
          Domains &amp; hosting, one account
        </span>

        <h1 className="mt-6 font-display text-6xl font-extrabold leading-[1.02] tracking-tight sm:text-7xl">
          Claim your name.
          <br />
          <span className="text-primary">Build on it.</span>
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-lg text-inkMuted">
          Search a domain, register it in minutes, and add hosting to the same account
          when you're ready.
        </p>

        <form
          onSubmit={handleSearch}
          className="mx-auto mt-10 flex max-w-xl flex-col gap-3 rounded-2xl border border-line bg-bg p-3 shadow-xl sm:flex-row"
        >
          <div className="flex flex-1 items-center overflow-hidden rounded-xl border border-line focus-within:border-primary">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="yourbrand"
              autoComplete="off"
              spellCheck={false}
              className="min-w-0 flex-1 bg-bg px-4 py-3.5 text-left font-mono text-base text-ink outline-none"
            />
            <select
              value={tld}
              onChange={(e) => setTld(e.target.value)}
              aria-label="Domain ending"
              className="shrink-0 border-l border-line bg-surface px-3 font-mono text-base text-ink outline-none"
            >
              {TLDS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            disabled={status === "loading"}
            className="shrink-0 rounded-xl bg-primary px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-primaryDark disabled:opacity-50"
          >
            {status === "loading" ? "Checking…" : "Search domain"}
          </button>
        </form>

        {status === "result" && result && (
          <div className="mx-auto mt-5 flex max-w-xl flex-wrap items-center gap-4 rounded-2xl border border-line bg-bg p-5 text-left shadow-sm">
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                result.available ? "bg-green/10 text-green" : "bg-red/10 text-red"
              }`}
            >
              <CheckIcon className="h-5 w-5" />
            </div>
            <div className="flex-1">
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
          <p className="mx-auto mt-5 max-w-xl text-sm text-inkMuted">{message}</p>
        )}

        {status === "result" && result?.available && showEmailField && (
          <form
            onSubmit={handleCheckout}
            className="mx-auto mt-5 flex max-w-xl flex-col gap-3 rounded-2xl border border-line bg-bg p-5 text-left shadow-sm sm:flex-row sm:items-end"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="flex-1 rounded-xl border border-line bg-bg px-4 py-3 text-base text-ink outline-none focus:border-primary"
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

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {TLDS.map((option) => (
            <span
              key={option}
              className="rounded-full border border-line bg-bg px-3.5 py-1.5 font-mono text-xs text-inkMuted"
            >
              {option} £{priceGbp.toFixed(2)}/yr
            </span>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {CHIPS.map(({ icon: Icon, label }) => (
            <span
              key={label}
              className="flex items-center gap-1.5 rounded-full bg-surface px-3.5 py-1.5 text-sm text-inkMuted"
            >
              <Icon className="h-4 w-4 text-primary" />
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

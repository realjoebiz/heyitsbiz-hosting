"use client";

import { useState } from "react";
import { CheckIcon, ShieldIcon, BoltIcon, HeadsetIcon } from "./Icons";

interface AvailabilityResult {
  domain: string;
  available: boolean;
  priceGbp: number;
}

type Status = "idle" | "loading" | "result" | "unconfigured" | "error";

const CHIPS = [
  { icon: ShieldIcon, label: "Cloudflare DNS" },
  { icon: BoltIcon, label: "Transparent pricing" },
  { icon: HeadsetIcon, label: "Direct support" },
];

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
    <section id="domains" className="hero-gradient pb-32 pt-20 text-white sm:pt-28">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl">
          Your domain, sorted in minutes.
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-white/85">
          Search, register, and manage your domain from one place. Hosting for what you
          build lands soon, in the same account.
        </p>

        <div className="mx-auto mt-6 flex max-w-lg flex-wrap justify-center gap-3">
          {CHIPS.map(({ icon: Icon, label }) => (
            <span
              key={label}
              className="flex items-center gap-1.5 rounded-full bg-white/15 px-3.5 py-1.5 text-sm text-white"
            >
              <Icon className="h-4 w-4" />
              {label}
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto -mb-24 mt-10 max-w-2xl px-6">
        <div className="rounded-2xl bg-white p-3 shadow-xl sm:p-4">
          <form onSubmit={handleSearch} className="flex flex-col gap-3 sm:flex-row">
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
            <div className="mt-4 flex flex-wrap items-center gap-4 border-t border-line pt-4">
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
            <p className="mt-4 border-t border-line pt-4 text-left text-sm text-inkMuted">
              {message}
            </p>
          )}

          {status === "result" && result?.available && showEmailField && (
            <form
              onSubmit={handleCheckout}
              className="mt-4 flex flex-col gap-3 border-t border-line pt-4 sm:flex-row sm:items-end"
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
      </div>
    </section>
  );
}

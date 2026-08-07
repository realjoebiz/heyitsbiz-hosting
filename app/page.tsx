"use client";

import { useState } from "react";

interface AvailabilityResult {
  domain: string;
  available: boolean;
  priceGbp: number;
}

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<AvailabilityResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [buying, setBuying] = useState(false);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch(`/api/domains/search?domain=${encodeURIComponent(query.trim())}`);
      const body = await res.json();
      if (!res.ok) {
        setError(body.error ?? "Search failed");
      } else {
        setResult(body);
      }
    } catch {
      setError("Search failed — check the network tab");
    } finally {
      setLoading(false);
    }
  }

  async function handleBuy() {
    if (!result) return;
    const email = window.prompt("Email for this order:");
    if (!email) return;

    setBuying(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domain: result.domain, email }),
      });
      const body = await res.json();
      if (!res.ok) {
        setError(body.error ?? "Checkout failed");
        return;
      }
      window.location.href = body.url;
    } finally {
      setBuying(false);
    }
  }

  return (
    <main className="mx-auto flex max-w-xl flex-col gap-8 px-6 py-20">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Find a domain</h1>
        <p className="mt-2 text-slate-600">
          Domains today, hosting soon — one place for both. Phase 1 scaffold: search and
          checkout are wired, domain registration itself waits on a wholesale reseller
          account. See <code>SETUP.md</code>.
        </p>
      </div>

      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="example.co.uk"
          className="flex-1 rounded border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400"
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded bg-slate-900 px-4 py-2 text-white disabled:opacity-50"
        >
          {loading ? "Checking…" : "Search"}
        </button>
      </form>

      {error && (
        <p className="rounded border border-amber-300 bg-amber-50 px-3 py-2 text-sm text-amber-900">
          {error}
        </p>
      )}

      {result && (
        <div className="flex items-center justify-between rounded border border-slate-200 px-4 py-3">
          <div>
            <p className="font-medium">{result.domain}</p>
            <p className="text-sm text-slate-600">
              {result.available ? `Available — £${result.priceGbp.toFixed(2)}/yr` : "Taken"}
            </p>
          </div>
          {result.available && (
            <button
              onClick={handleBuy}
              disabled={buying}
              className="rounded bg-emerald-600 px-4 py-2 text-white disabled:opacity-50"
            >
              {buying ? "Redirecting…" : "Buy"}
            </button>
          )}
        </div>
      )}
    </main>
  );
}

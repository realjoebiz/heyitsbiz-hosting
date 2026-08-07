"use client";

import { useState } from "react";

export function HostingWaitlist() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError(null);

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const body = await res.json();
      if (!res.ok) {
        setStatus("error");
        setError(body.error ?? "Something went wrong — try again.");
        return;
      }
      setStatus("done");
    } catch {
      setStatus("error");
      setError("Something went wrong — try again.");
    }
  }

  return (
    <section id="hosting" className="border-t border-line bg-surface2">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <h2 className="font-display text-2xl font-medium">Hosting is next</h2>
        <p className="mt-3 max-w-xl text-inkMuted">
          Domains are live. Hosting is being built on the same Cloudflare and Coolify
          infrastructure you're already trusting for DNS. Leave your email and you'll
          hear about it the day it opens — nothing before that.
        </p>

        {status === "done" ? (
          <p className="mt-6 font-mono text-sm text-accentDeep">
            You're on the list. Nothing else to do.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 flex flex-wrap items-end gap-4 sm:max-w-md">
            <div className="flex-1">
              <label htmlFor="waitlist-email" className="block text-xs uppercase tracking-wide text-inkMuted">
                Email
              </label>
              <input
                id="waitlist-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="ledger-input mt-2 w-full bg-surface2 py-2 font-body text-base text-ink"
              />
            </div>
            <button
              type="submit"
              disabled={status === "loading"}
              className="shrink-0 bg-ink px-5 py-2.5 text-sm font-medium text-paper transition hover:bg-accentDeep disabled:opacity-50"
            >
              {status === "loading" ? "Adding…" : "Notify me"}
            </button>
          </form>
        )}
        {error && <p className="mt-3 text-sm text-reject">{error}</p>}
      </div>
    </section>
  );
}

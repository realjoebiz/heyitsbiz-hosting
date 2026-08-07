"use client";

import { useState } from "react";
import { CheckIcon } from "./Icons";

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
    <section id="hosting" className="hero-gradient py-20 text-white">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <h2 className="text-3xl font-bold">Hosting is next</h2>
        <p className="mx-auto mt-3 max-w-xl text-white/85">
          Domains are live. Hosting is being built on the same Cloudflare and Coolify
          infrastructure you're already trusting for DNS. Leave your email and you'll
          hear about it the day it opens — nothing before that.
        </p>

        {status === "done" ? (
          <p className="mt-8 flex items-center justify-center gap-2 font-semibold">
            <CheckIcon className="h-5 w-5" /> You're on the list. Nothing else to do.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="flex-1 rounded-xl border-0 px-4 py-3.5 text-base text-ink outline-none"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="shrink-0 rounded-xl bg-ink px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-black disabled:opacity-50"
            >
              {status === "loading" ? "Adding…" : "Notify me"}
            </button>
          </form>
        )}
        {error && <p className="mt-3 text-sm text-white">{error}</p>}
      </div>
    </section>
  );
}

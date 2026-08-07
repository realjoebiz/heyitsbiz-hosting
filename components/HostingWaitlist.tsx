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

  if (status === "done") {
    return (
      <p className="flex items-center justify-center gap-2 font-semibold text-ink">
        <CheckIcon className="h-5 w-5 text-green" /> You're on the list. Nothing else to do.
      </p>
    );
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="flex-1 rounded-xl border border-line bg-bg px-4 py-3.5 text-base text-ink outline-none focus:border-primary"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="shrink-0 rounded-xl bg-ink px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-primary disabled:opacity-50"
        >
          {status === "loading" ? "Adding…" : "Notify me"}
        </button>
      </form>
      {error && <p className="mt-3 text-center text-sm text-red">{error}</p>}
    </div>
  );
}

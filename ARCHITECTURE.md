# Architecture

Full diagram and rationale: see the published scaffold doc from the planning session. Condensed here for anyone working in this repo without that link.

## Decision

A thin orchestration layer over providers already run across the portfolio — **Hetzner + Coolify** for compute (Phase 2), **Cloudflare** for DNS, a **wholesale domain reseller API** for registration — instead of bare-metal infrastructure or ICANN registrar accreditation. Both alternatives carry real ops/compliance weight (uptime, abuse/reputation exposure, registrar bonding and audits) not justified before there's a paying customer.

Runs at a single URL for both domains and hosting — not split subdomains — so Phase 2 lands in the same app rather than a second product. Brand is **Hosting by Biz** (`hostingbybiz.com`); live for now at `hosting.heyitsbiz.com`. See `SETUP.md` #1 for why that's provisional.

## Mechanism (Phase 1: domains only)

1. Customer searches a domain and checks out in the **Portal** (Next.js).
2. Portal creates a **Stripe** Checkout Session.
3. On `checkout.session.completed`, Stripe webhooks the app, which creates `Customer` + `Domain` rows and a `ProvisioningJob` (`DOMAIN_REGISTER`).
4. The **worker** (`web/lib/worker/processJobs.ts`, run on a Coolify cron) picks up pending jobs:
   - `DOMAIN_REGISTER` → calls the domain registry adapter, then queues `DNS_ZONE_CREATE`.
   - `DNS_ZONE_CREATE` → calls Cloudflare, creates the zone, records nameservers, marks the domain `ACTIVE`.
5. Failures are recorded on the job (`lastError`) and the domain is marked `FAILED` rather than silently retried forever.

This is deliberately async and job-queue-driven, not a blocking request chain — domain registration and DNS propagation aren't instant, and Coolify cron is a pattern already proven elsewhere in the portfolio (Local Gazette's blog pipeline).

## Build order

1. **Phase 1 — domains only.** Proves checkout → provisioning → status with zero server ops. This is what's scaffolded.
2. **Phase 2 — hosting reseller.** Same orchestrator, one more provider integration (`web/lib/providers/hosting.ts`, currently stubbed): Hetzner Cloud API to create a VPS, Coolify API to deploy onto it.
3. **Phase 3 — self-serve control panel.** DNS record editing, plan upgrades, usage metering.

Don't start Phase 2 before Phase 1 has real signups — see `CLAUDE.md`.

## Risks worth deciding early

- **WHOIS privacy** — mandatory by default under UK/EU rules; confirm the registrar supports it out of the box.
- **Abuse handling** — spam/phishing domains and hosting land on your IP reputation. A suspension process needs to exist before launch.
- **Thin domain margin** — wholesale reseller pricing typically runs £1–3/domain/year at low volume; check tier pricing before setting retail rates.

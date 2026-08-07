# Hosting by Biz

Brand: **Hosting by Biz** (`hostingbybiz.com`, reserved not bought). Live for now at `hosting.heyitsbiz.com`. Domain (Phase 1) + hosting (Phase 2) reseller product, one unified URL for both — not split subdomains. Control plane over providers already run elsewhere in the portfolio — not bare-metal, not an accredited registrar.

Rides on the existing `heyitsbiz.com` as a subdomain, provisionally — see `SETUP.md` #1 before assuming this is the permanent home.

## Where the real docs are

- `ARCHITECTURE.md` — mechanism, component map, phased build order. Read before changing the orchestrator/worker flow.
- `SETUP.md` — the human-only setup steps (accounts, API keys) that gate Phase 1 going live. Check this before assuming something is "broken" — it may just be unconfigured.
- `README.md` — repo map, quick start.

Stack: Next.js 15 + Prisma 6 + TypeScript + Tailwind, Postgres via Prisma, Stripe for billing — matches portfolio standard (see `local-gazette/web/package.json` for the version baseline this was copied from).

## Status (scaffolded — not yet deployed)

Phase 1 scope only: domain search → Stripe checkout → webhook → `ProvisioningJob` row → worker calls the domain registry adapter, then Cloudflare to create the DNS zone. Domain registry adapter (`web/lib/providers/domainRegistry.ts`) is intentionally stubbed — no wholesale reseller account exists yet, so it throws a clear `RegistryNotConfiguredError` instead of pretending to work. Hosting (`web/lib/providers/hosting.ts`) is Phase 2 and out of scope until Phase 1 has real signups.

No auth on the dashboard yet — it's a placeholder. Don't treat it as multi-tenant-safe.

## Standing rules

- Don't build Phase 2 (hosting provisioning) before Phase 1 (domains) has a real paying customer — this was an explicit build-order decision, not an oversight.
- Provider adapters that aren't configured should fail loudly with a clear message, never silently no-op or fake success.
- One next action only — see the unchecked items in `SETUP.md`.

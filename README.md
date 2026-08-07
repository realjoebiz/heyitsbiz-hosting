# Hosting by Biz

Brand name: **Hosting by Biz** (`hostingbybiz.com` — reserved, not bought yet). Live for now at `hosting.heyitsbiz.com`.

A control plane for reselling domains (and later hosting) on top of providers already run across the portfolio: Cloudflare (DNS), a wholesale domain registrar (TBD), and Hetzner + Coolify (hosting, Phase 2).

Runs as a subdomain of the existing `heyitsbiz.com` for now — one URL for both domains and hosting, not two separate subdomains. Provisional: move to `hostingbybiz.com` once Phase 1 has real signups (see `SETUP.md` #1).

Not a new hosting company built from bare metal — see `ARCHITECTURE.md`.

**Handoff note:** scaffolded by Claude (search, checkout, webhook, job worker, Cloudflare DNS client all real and tested — `npm install && npx prisma generate && npx tsc --noEmit && npm run build` all pass from this folder). Domain registry + hosting provider integrations are intentionally stubbed (see `lib/providers/`) for whoever wires up the real accounts next.

## Where the real docs are

- `ARCHITECTURE.md` — the mechanism: order flow, component map, phased build order.
- `SETUP.md` — **read before deploying.** The manual, human-only steps (Stripe, registrar reseller application, Cloudflare token) that block Phase 1 going live.
- `CLAUDE.md` — session pointer, matches the rest of the portfolio's convention.

## Repo map

| Path | What |
|------|------|
| `web/` | Next.js app — search/checkout portal, API routes, Prisma schema, job worker |
| `web/prisma/schema.prisma` | Customer, Domain, HostingInstance, Invoice, ProvisioningJob |
| `web/lib/providers/` | Provider adapters — Cloudflare is real, domain registry + hosting are stubbed pending accounts |
| `web/lib/worker/` | Polls `ProvisioningJob`, dispatches to provider adapters — run on a Coolify cron, same pattern as Local Gazette's blog pipeline |

## Quick start

```bash
cd web
npm install
cp .env.example .env      # fill in what you have; stubs fail loudly for what you don't
npx prisma db push
npm run dev
```

Domain availability search and checkout will 501 with a clear message until the registrar/Stripe env vars are set — see `SETUP.md`.

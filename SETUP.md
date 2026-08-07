# Setup — the human-only steps

Everything below needs an account, a business decision, or a credential I can't obtain on your behalf. The code is written to fail loudly and specifically when one of these isn't done yet — check the error message before assuming something's broken.

## 1. Naming — decided

Brand: **Hosting by Biz**. Domain `hostingbybiz.com` is the target brand home but not purchased yet — running on `hosting.heyitsbiz.com` (a subdomain of the existing personal domain) for Phase 1. One URL for both domains and hosting — not split into separate `hosting.` / `domains.` subdomains.

The subdomain is a deliberate shortcut, not the final home: `heyitsbiz.com`'s root content is a personal internet-experiments hub (Win98 desktop shell, IRC chat, radio) — fine as scaffolding to prove signups exist, not something to lean on once real customers are paying. Don't link the subdomain into the toy site's nav. Buy `hostingbybiz.com` and migrate once Phase 1 has real signups to justify it — update `NEXT_PUBLIC_APP_URL`, this file, and the docs when that happens.

DNS + deploy, matching the pattern already used for `heyitsbiz`'s other subdomain apps (`hub`, `pc`, `radio`, `chat`):

- Add a `hosting` record via `heyitsbiz/dns/apply-dns.ps1` (same Cloudflare-token flow already documented in `heyitsbiz/README.md`), pointed at wherever this app deploys.
- Deploy `web/` as a new app inside the existing **Heyitsbiz** Coolify project, rather than standing up a separate Coolify project for it.

## 2. Stripe

- Create a Stripe account for this business (not reused from another portfolio project — separate entity, separate payouts).
- Enable Checkout, grab `STRIPE_SECRET_KEY`.
- Add a webhook endpoint pointing at `/api/webhooks/stripe` once deployed, subscribe to `checkout.session.completed`, grab `STRIPE_WEBHOOK_SECRET`.
- Stripe Tax: worth enabling given UK VAT on digital services — see the `stripe-skills:stripe-best-practices` guidance before wiring this deeper.

## 3. Domain registry (the slow one — start this first)

You need a **wholesale domain reseller account**, not ICANN accreditation. Options: OpenSRS, ResellerClub, Enom/Tucows. All three typically require:

- Business verification (company registration, sometimes a UK/EU entity)
- A security deposit or minimum prepay balance
- Days, not minutes, for approval

Once approved, implement the `DomainRegistryClient` interface in `web/lib/providers/domainRegistry.ts` against their real API — the interface (`checkAvailability`, `register`, `renew`) is already shaped for it. Until then, domain search and purchase will return a 501 with a message pointing back here.

## 4. Cloudflare

- Create an API token scoped to `Zone:Edit` (not the global key).
- Grab your Cloudflare account ID (Dashboard → right sidebar).
- Set `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`.

This one's real code, not a stub — DNS zone creation will work as soon as the token is set.

## 5. Database + deploy

- Provision Postgres (Coolify, same as the rest of the portfolio) → `DATABASE_URL`.
- Deploy `web/` to Coolify the same way as any other Next.js app in the portfolio.
- Set up a Coolify cron job to run `npm run worker` on an interval (5–10 min is fine to start) — this is what actually processes `ProvisioningJob` rows. Same pattern as Local Gazette's blog-generation cron.

## 6. Before real customers (not blocking local dev)

- Dashboard has no auth yet — anyone with the URL sees the placeholder page, not other customers' data (it doesn't query per-session yet at all), but this needs real auth before launch.
- Registrant contact details are hardcoded placeholders in the worker (`web/lib/worker/processJobs.ts`) — needs a real checkout form field before any real domain registration call.
- WHOIS privacy — confirm the registrar you pick supports it by default (see the risk callout in `ARCHITECTURE.md`).

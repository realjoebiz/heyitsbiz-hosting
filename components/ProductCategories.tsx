import { GlobeIcon, LayersIcon, ServerIcon, UsersIcon } from "./Icons";

const CATEGORIES = [
  {
    icon: GlobeIcon,
    name: "Domains",
    status: "Live now",
    live: true,
    body: "Search, register, and manage a domain — the part of this that's real today.",
  },
  {
    icon: LayersIcon,
    name: "Web Hosting",
    status: "In progress",
    live: false,
    body: "Deploy a site with Coolify on the same account as your domain. Next thing being built.",
  },
  {
    icon: LayersIcon,
    name: "WordPress Hosting",
    status: "On the roadmap",
    live: false,
    body: "A managed WordPress option once general hosting is solid.",
  },
  {
    icon: ServerIcon,
    name: "Managed Servers",
    status: "On the roadmap",
    live: false,
    body: "Your own resources on Hetzner infrastructure, for sites that outgrow shared hosting.",
  },
  {
    icon: UsersIcon,
    name: "Reseller Hosting",
    status: "Under consideration",
    live: false,
    body: "White-label hosting for agencies managing client sites — not yet committed to.",
  },
];

export function ProductCategories() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Hosting, however you build</h2>
          <p className="mx-auto mt-2 max-w-xl text-inkMuted">
            Domains are live today. Everything else here is a real, honest roadmap — not
            a live product yet, and labeled as such.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {CATEGORIES.map(({ icon: Icon, name, status, live, body }) => (
            <div
              key={name}
              className={`rounded-2xl border p-6 ${
                live ? "border-primary bg-primary/5" : "border-line bg-bg"
              }`}
            >
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                  live ? "bg-primary text-white" : "bg-surface text-primary"
                }`}
              >
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-semibold">{name}</h3>
              <span
                className={`mt-1 inline-block text-xs font-semibold uppercase tracking-wide ${
                  live ? "text-primary" : "text-inkMuted"
                }`}
              >
                {status}
              </span>
              <p className="mt-2 text-sm text-inkMuted">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

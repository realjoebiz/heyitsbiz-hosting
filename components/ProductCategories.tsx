import { GlobeIcon, LayersIcon, ServerIcon, UsersIcon } from "./Icons";

const CATEGORIES = [
  { icon: GlobeIcon, name: "Domains", status: "Live now", live: true },
  { icon: LayersIcon, name: "Web Hosting", status: "In progress", live: false },
  { icon: LayersIcon, name: "WordPress Hosting", status: "Roadmap", live: false },
  { icon: ServerIcon, name: "Managed Servers", status: "Roadmap", live: false },
  { icon: UsersIcon, name: "Reseller Hosting", status: "Under consideration", live: false },
];

export function ProductCategories() {
  return (
    <section className="dot-grid py-24">
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold tracking-tight">One account, the whole build</h2>
          <p className="mx-auto mt-3 max-w-xl text-lg text-inkMuted">
            Domains are real and working today. Everything to the right of it is an
            honest roadmap, one account away from being live — not a live order yet.
          </p>
        </div>

        <div className="relative mt-16">
          <div className="absolute left-0 right-0 top-6 hidden h-0.5 bg-line sm:block" />
          <ol className="relative grid gap-10 sm:grid-cols-5 sm:gap-4">
            {CATEGORIES.map(({ icon: Icon, name, status, live }) => (
              <li key={name} className="flex flex-col items-center text-center">
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-full border-2 transition hover:-translate-y-1 ${
                    live
                      ? "border-primary bg-primary text-white shadow-lg shadow-primary/30"
                      : "border-line bg-bg text-inkMuted"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-sm font-semibold">{name}</h3>
                <span
                  className={`mt-1 text-xs font-semibold uppercase tracking-wide ${
                    live ? "text-primary" : "text-accent2Deep"
                  }`}
                >
                  {status}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

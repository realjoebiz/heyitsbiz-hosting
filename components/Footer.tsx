import { Logo } from "./Logo";

const COLUMNS = [
  {
    heading: "Product",
    links: [
      { label: "Domains", href: "#find-a-domain" },
      { label: "Web Hosting", href: "#hosting" },
      { label: "WordPress Hosting", href: "#hosting" },
      { label: "Managed Servers", href: "#hosting" },
      { label: "Reseller Hosting", href: "#hosting" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "Why a new registrar", href: "#" },
      { label: "FAQ", href: "#faq" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 sm:grid-cols-[2fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-3 max-w-xs text-sm text-inkMuted">
              Domain registration handled by our registry partner. DNS runs on Cloudflare.
            </p>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.heading}>
              <p className="text-sm font-semibold text-ink">{col.heading}</p>
              <ul className="mt-3 flex flex-col gap-2 text-sm text-inkMuted">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="hover:text-ink">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-10 border-t border-line pt-6 text-xs text-inkMuted">
          Hosting by Biz — a small, independent operation. Only Domains is live today;
          everything else in Product is roadmap, not a live order.
        </p>
        {/* TODO before real launch: replace with real company name, number, and
            registered address once incorporated — see SETUP.md. */}
      </div>
    </footer>
  );
}

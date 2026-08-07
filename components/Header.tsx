import { Logo } from "./Logo";

const NAV = [
  { href: "#domains", label: "Domains" },
  { href: "#plans", label: "Plans" },
  { href: "#hosting", label: "Hosting" },
  { href: "#faq", label: "FAQ" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-line bg-bg/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#"><Logo /></a>
        <nav className="hidden items-center gap-8 text-sm font-medium text-inkMuted md:flex">
          {NAV.map((item) => (
            <a key={item.href} href={item.href} className="hover:text-ink">
              {item.label}
            </a>
          ))}
        </nav>
        <a
          href="#domains"
          className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primaryDark"
        >
          Search a domain
        </a>
      </div>
    </header>
  );
}

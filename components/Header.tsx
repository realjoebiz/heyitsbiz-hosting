import { SealMark } from "./SealMark";

const NAV = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#pricing", label: "Pricing" },
  { href: "#hosting", label: "Hosting" },
  { href: "#faq", label: "FAQ" },
];

export function Header() {
  return (
    <header className="border-b border-line">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-5">
        <a href="#" className="flex items-center gap-2.5">
          <SealMark className="h-6 w-6 text-accent" />
          <span className="font-display text-lg font-medium tracking-tight">
            Hosting by Biz
          </span>
        </a>
        <nav className="hidden items-center gap-6 text-sm text-inkMuted sm:flex">
          {NAV.map((item) => (
            <a key={item.href} href={item.href} className="hover:text-ink">
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

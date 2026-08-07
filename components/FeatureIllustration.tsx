type Variant = "search" | "price" | "support";

const DOTS = Array.from({ length: 5 }).flatMap((_, row) =>
  Array.from({ length: 5 }).map((_, col) => ({ row, col }))
);

export function FeatureIllustration({ variant, className }: { variant: Variant; className?: string }) {
  return (
    <svg viewBox="0 0 240 240" className={className} role="presentation" aria-hidden="true">
      <defs>
        <linearGradient id={`panel-${variant}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#0ea5e9" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="240" height="240" rx="28" fill={`url(#panel-${variant})`} />
      {DOTS.map(({ row, col }) => (
        <circle key={`${row}-${col}`} cx={30 + col * 20} cy={30 + row * 20} r="1.6" fill="white" opacity="0.25" />
      ))}

      <g transform="translate(60 60)">
        <rect x="0" y="0" width="120" height="120" rx="20" fill="white" opacity="0.95" />
        {variant === "search" && (
          <g transform="translate(28 34)" stroke="#2563eb" strokeWidth="4" fill="none" strokeLinecap="round">
            <circle cx="26" cy="26" r="20" />
            <line x1="41" y1="41" x2="58" y2="58" />
          </g>
        )}
        {variant === "price" && (
          <g transform="translate(24 24)" stroke="#2563eb" strokeWidth="4" fill="none" strokeLinejoin="round" strokeLinecap="round">
            <path d="M60 36L36 60L12 36V12h24z" />
            <circle cx="24" cy="24" r="4.2" fill="#2563eb" stroke="none" />
          </g>
        )}
        {variant === "support" && (
          <g transform="translate(24 30)" stroke="#2563eb" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 30a26 26 0 0152 0" />
            <rect x="0" y="30" width="14" height="20" rx="5" />
            <rect x="58" y="30" width="14" height="20" rx="5" />
          </g>
        )}
      </g>
    </svg>
  );
}

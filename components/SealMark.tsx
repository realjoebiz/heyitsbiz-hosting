const TICKS = Array.from({ length: 12 });

export function SealMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      fill="none"
      stroke="currentColor"
      role="img"
      aria-label="Hosting by Biz seal"
    >
      <circle cx="20" cy="20" r="17" strokeWidth="1.4" />
      <circle cx="20" cy="20" r="11" strokeWidth="1.1" />
      {TICKS.map((_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        const x1 = 20 + Math.cos(angle) * 14.5;
        const y1 = 20 + Math.sin(angle) * 14.5;
        const x2 = 20 + Math.cos(angle) * 17.5;
        const y2 = 20 + Math.sin(angle) * 17.5;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth="1.1" />;
      })}
    </svg>
  );
}

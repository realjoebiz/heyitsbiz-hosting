export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className={`text-lg font-bold tracking-tight ${light ? "text-white" : "text-ink"}`}>
      Hosting by <span className={light ? "text-white/80" : "text-primary"}>Biz</span>
    </span>
  );
}

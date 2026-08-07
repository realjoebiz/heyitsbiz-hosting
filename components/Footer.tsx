import { SealMark } from "./SealMark";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-3xl flex-col gap-3 px-6 py-10 text-sm text-inkMuted sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <SealMark className="h-4 w-4 text-inkMuted" />
          <span>Hosting by Biz</span>
        </div>
        <p>
          Domain registration handled by our registry partner. DNS runs on Cloudflare.
        </p>
      </div>
      {/* TODO before real launch: replace with real company name, number, and
          registered address once incorporated — see SETUP.md. */}
    </footer>
  );
}

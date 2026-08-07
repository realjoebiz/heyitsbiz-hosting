// Placeholder — no auth yet. Shows the post-checkout confirmation and nothing
// per-customer. Needs real auth (see SETUP.md #6) before this is safe to treat
// as a multi-tenant dashboard.
import { SealMark } from "@/components/SealMark";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ purchased?: string }>;
}) {
  const { purchased } = await searchParams;

  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col gap-6 px-6 py-20">
      <div className="flex items-center gap-2.5">
        <SealMark className="h-6 w-6 text-accent" />
        <span className="font-display text-lg font-medium tracking-tight">Hosting by Biz</span>
      </div>

      {purchased ? (
        <div className="flex items-start gap-4 border-t border-line pt-5">
          <SealMark className="stamp h-9 w-9 shrink-0 text-approve" />
          <div>
            <p className="font-mono text-base">{purchased}</p>
            <p className="mt-1 text-sm text-inkMuted">
              Order received. It&apos;s queued for provisioning — check back shortly.
            </p>
          </div>
        </div>
      ) : (
        <p className="border-t border-line pt-5 text-sm text-inkMuted">No orders to show yet.</p>
      )}
    </main>
  );
}

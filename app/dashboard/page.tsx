// Placeholder — no auth yet. Shows the post-checkout confirmation and nothing
// per-customer. Needs real auth (see SETUP.md #6) before this is safe to treat
// as a multi-tenant dashboard.
import { Logo } from "@/components/Logo";
import { CheckIcon } from "@/components/Icons";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ purchased?: string }>;
}) {
  const { purchased } = await searchParams;

  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col gap-6 px-6 py-20">
      <Logo />

      {purchased ? (
        <div className="flex items-start gap-4 rounded-2xl border border-line bg-surface p-6">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green/10 text-green">
            <CheckIcon className="h-5 w-5" />
          </div>
          <div>
            <p className="font-mono text-base">{purchased}</p>
            <p className="mt-1 text-sm text-inkMuted">
              Order received. It&apos;s queued for provisioning — check back shortly.
            </p>
          </div>
        </div>
      ) : (
        <p className="text-sm text-inkMuted">No orders to show yet.</p>
      )}
    </main>
  );
}

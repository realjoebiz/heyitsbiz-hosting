// Placeholder — no auth yet. Shows the post-checkout confirmation and nothing
// per-customer. Needs real auth (see SETUP.md #6) before this is safe to treat
// as a multi-tenant dashboard.

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ purchased?: string }>;
}) {
  const { purchased } = await searchParams;

  return (
    <main className="mx-auto flex max-w-xl flex-col gap-4 px-6 py-20">
      <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
      {purchased ? (
        <p className="rounded border border-emerald-300 bg-emerald-50 px-4 py-3 text-emerald-900">
          Order received for <strong>{purchased}</strong>. It&apos;s queued for provisioning —
          check back shortly.
        </p>
      ) : (
        <p className="text-slate-600">No orders to show yet.</p>
      )}
    </main>
  );
}

import { prisma } from "@/lib/prisma";
import { domainRegistry, type RegistrantContact } from "@/lib/providers/domainRegistry";
import { createZone } from "@/lib/providers/cloudflare";

export async function processJobs(): Promise<{ processed: number }> {
  const jobs = await prisma.provisioningJob.findMany({
    where: { status: "PENDING" },
    take: 10,
    include: { domain: { include: { customer: true } } },
  });

  for (const job of jobs) {
    await prisma.provisioningJob.update({
      where: { id: job.id },
      data: { status: "PROCESSING", attempts: { increment: 1 } },
    });

    try {
      if (job.type === "DOMAIN_REGISTER" && job.domain) {
        // TODO: collect real registrant details at checkout instead of this placeholder —
        // see SETUP.md #6. Registration will fail loudly via RegistryNotConfiguredError
        // until a wholesale reseller account is wired up.
        const contact: RegistrantContact = {
          name: job.domain.customer.name ?? job.domain.customer.email,
          email: job.domain.customer.email,
          addressLine1: "TBD",
          city: "TBD",
          postalCode: "TBD",
          countryCode: "GB",
        };

        await domainRegistry.register(job.domain.name, 1, contact);
        await prisma.domain.update({
          where: { id: job.domain.id },
          data: { status: "REGISTERING" },
        });
        await prisma.provisioningJob.create({
          data: {
            type: "DNS_ZONE_CREATE",
            domainId: job.domain.id,
            payload: { domain: job.domain.name },
          },
        });
      }

      if (job.type === "DNS_ZONE_CREATE" && job.domain) {
        const zone = await createZone(job.domain.name);
        await prisma.domain.update({
          where: { id: job.domain.id },
          data: { status: "ACTIVE", nameservers: zone.nameservers },
        });
      }

      await prisma.provisioningJob.update({
        where: { id: job.id },
        data: { status: "COMPLETE" },
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      await prisma.provisioningJob.update({
        where: { id: job.id },
        data: { status: "FAILED", lastError: message },
      });
      if (job.domain) {
        await prisma.domain.update({
          where: { id: job.domain.id },
          data: { status: "FAILED" },
        });
      }
      console.error(`[worker] job ${job.id} (${job.type}) failed:`, message);
    }
  }

  return { processed: jobs.length };
}

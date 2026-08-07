// Phase 2. Do not build this out before Phase 1 (domains) has real signups — see CLAUDE.md.

export interface HostingProvisionResult {
  serverId: string;
  ipv4: string;
}

export interface HostingClient {
  provision(domain: string, plan: string): Promise<HostingProvisionResult>;
}

class NotConfiguredHostingClient implements HostingClient {
  async provision(): Promise<HostingProvisionResult> {
    throw new Error(
      "Hosting provisioning isn't built yet — this is Phase 2 (see ARCHITECTURE.md). " +
        "Implement against the Hetzner Cloud API (server create) and the Coolify API (app deploy) here."
    );
  }
}

export const hosting: HostingClient = new NotConfiguredHostingClient();
